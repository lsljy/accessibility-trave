// 全局变量
let map;
let poiMarkers = [];
let obstacleMarkers = [];
let currentRouteLayer = null;
let highlightedObstacleMarkers = [];
let startMarker = null;   // 起点标记
let endMarker = null;     // 终点标记

// 初始化地图
function initMap() {
    map = L.map('map').setView([26.5310, 112.3028], 16);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);
    locateAndSetView();
}

function locateAndSetView() {
    document.getElementById('status').innerText = '📍 正在定位...';
    if (!navigator.geolocation) {
        console.warn("浏览器不支持地理定位，使用默认地图中心");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            map.setView([lat, lng], 16);
            L.marker([lat, lng], {
                icon: L.divIcon({ className: 'current-location', html: '📍', iconSize: [24, 24] })
            }).addTo(map).bindPopup('您当前的位置').openPopup();
        },
        (error) => {
            console.warn("自动定位失败，使用默认地图中心:", error.message);
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
}

function speak(text) {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

function vibrate(pattern) {
    if (!navigator.vibrate) return;
    const patterns = { 1: [200, 100], 2: [200, 100, 200], 3: [500], 4: [500, 200, 500] };
    navigator.vibrate(patterns[pattern] || 200);
}

function addPoiMarkers() {
    poiList.forEach(poi => {
        const color = poi.score >= 4 ? '#34c759' : (poi.score >= 3 ? '#ff9500' : '#ff3b30');
        const marker = L.marker([poi.lat, poi.lng], {
            icon: L.divIcon({
                className: 'custom-poi',
                html: `<div style="background:${color}; width:16px; height:16px; border-radius:50%; border:3px solid white; box-shadow:0 2px 6px rgba(0,0,0,0.2);"></div>`,
                iconSize: [16, 16]
            })
        }).addTo(map);
        marker.bindPopup(createPopupContent(poi));
        poiMarkers.push(marker);
    });
}

function createPopupContent(poi) {
    const status = facilityStatus[poi.name] || { elevator: '未知', ramp: '未知' };
    return `
        <b>${poi.name}</b><br>
        ⭐ 可达性评分: ${poi.score}/5<br>
        🛗 电梯: <span style="color:${status.elevator === '正常' ? 'green' : 'red'}">${status.elevator}</span><br>
        ♿ 坡道: <span style="color:${status.ramp === '正常' ? 'green' : 'red'}">${status.ramp}</span><br>
        <button onclick="window.navigateTo(${poi.lat}, ${poi.lng}, '${poi.name}')" style="margin-top:5px;padding:5px 10px;">🧭 导航至此</button>
    `;
}

function updateObstacleMarkers() {
    obstacleMarkers.forEach(m => map.removeLayer(m));
    obstacleMarkers = [];
    obstacles.forEach(obs => {
        const marker = L.marker([obs.lat, obs.lng], {
            icon: L.divIcon({ className: 'obstacle-marker', html: '⚠️', iconSize: [24, 24] })
        }).addTo(map);
        marker.bindPopup(`
            <b>🚧 ${obs.type}</b><br>
            ${obs.description ? '📝 ' + obs.description + '<br>' : ''}
            状态: ${obs.status}<br>
            上报: ${obs.reportTime}
            ${obs.photo ? '<br><img src="' + obs.photo + '" style="max-width:100%; margin-top:5px;">' : ''}
        `);
        obstacleMarkers.push(marker);
    });
}

function getAvoidTypes() {
    const checks = document.querySelectorAll('.avoid-type:checked');
    return Array.from(checks).map(cb => cb.value);
}

function getRampPrefer() {
    return document.getElementById('rampPrefer')?.checked || false;
}

function pointToSegmentDistance(point, segStart, segEnd) {
    const [x0, y0] = [point.lat, point.lng];
    const [x1, y1] = [segStart.lat, segStart.lng];
    const [x2, y2] = [segEnd.lat, segEnd.lng];
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (dx === 0 && dy === 0) return Math.hypot(x0 - x1, y0 - y1);
    const t = ((x0 - x1) * dx + (y0 - y1) * dy) / (dx * dx + dy * dy);
    if (t < 0) return Math.hypot(x0 - x1, y0 - y1);
    if (t > 1) return Math.hypot(x0 - x2, y0 - y2);
    const projX = x1 + t * dx;
    const projY = y1 + t * dy;
    return Math.hypot(x0 - projX, y0 - projY);
}

function isEdgeBlockedByAvoidTypes(edge, avoidTypes) {
    if (!avoidTypes.length) return false;
    const fromNode = graph.nodes[edge.from];
    const toNode = graph.nodes[edge.to];
    if (!fromNode || !toNode) return false;
    for (let obs of obstacles) {
        if (avoidTypes.includes(obs.type)) {
            const dist = pointToSegmentDistance({lat: obs.lat, lng: obs.lng}, fromNode, toNode);
            if (dist < 0.003) return true;
        }
    }
    return false;
}

function getEdgeWeightWithRampPrefer(edge) {
    let weight = edge.distance;
    const fromName = graph.nodes[edge.from]?.name;
    const toName = graph.nodes[edge.to]?.name;
    let rampGood = true;
    [fromName, toName].forEach(name => {
        if (name && facilityStatus[name] && (facilityStatus[name].ramp === '维修中' || facilityStatus[name].ramp === '无')) {
            rampGood = false;
        }
    });
    return rampGood ? weight * 0.8 : weight * 1.2;
}

function findAccessiblePath(startNodeId, endNodeId, wheelchairMode = true, avoidTypes = [], rampPrefer = false) {
    const nodes = graph.nodes;
    const edges = graph.edges;
    const adj = {};
    Object.keys(nodes).forEach(id => adj[id] = []);
    edges.forEach(edge => {
        if (wheelchairMode && !edge.accessible) return;
        if (isEdgeBlockedByAvoidTypes(edge, avoidTypes)) return;
        let dist = edge.distance;
        if (rampPrefer) dist = getEdgeWeightWithRampPrefer(edge);
        adj[edge.from].push({ to: edge.to, dist });
        adj[edge.to].push({ to: edge.from, dist });
    });
    const dist = {}, prev = {};
    Object.keys(nodes).forEach(id => { dist[id] = Infinity; prev[id] = null; });
    dist[startNodeId] = 0;
    const pq = [{ id: startNodeId, dist: 0 }];
    while (pq.length) {
        pq.sort((a, b) => a.dist - b.dist);
        const current = pq.shift();
        if (current.id == endNodeId) break;
        if (!adj[current.id]) continue;
        adj[current.id].forEach(neighbor => {
            const alt = dist[current.id] + neighbor.dist;
            if (alt < dist[neighbor.to]) {
                dist[neighbor.to] = alt;
                prev[neighbor.to] = current.id;
                pq.push({ id: neighbor.to, dist: alt });
            }
        });
    }
    const path = [];
    let u = endNodeId;
    if (prev[u] !== null || u == startNodeId) {
        while (u) {
            path.unshift(u);
            u = prev[u];
        }
    }
    return { path: path.map(id => nodes[id]), distance: dist[endNodeId] };
}

function findNodeIdByName(name) {
    for (let id in graph.nodes) {
        if (graph.nodes[id].name === name) return parseInt(id);
    }
    return null;
}

window.navigateTo = function(lat, lng, name) {
    let closestNodeId = null;
    let minDist = Infinity;
    for (let id in graph.nodes) {
        const node = graph.nodes[id];
        const dist = Math.hypot(node.lat - lat, node.lng - lng);
        if (dist < minDist) {
            minDist = dist;
            closestNodeId = parseInt(id);
        }
    }
    const startId = findNodeIdByName("西门") || 1;
    const endId = closestNodeId;
    if (!startId || !endId) {
        speak("无法规划路线，请重试");
        return;
    }
    const wheelchairMode = document.getElementById('wheelchairMode').checked;
    const avoidTypes = getAvoidTypes();
    const rampPrefer = getRampPrefer();
    const result = findAccessiblePath(startId, endId, wheelchairMode, avoidTypes, rampPrefer);
    if (result.path.length < 2) {
        let msg = wheelchairMode ? "未找到无障碍路线，请尝试关闭轮椅优先模式或减少避开类型" : "未找到路线";
        document.getElementById('status').innerText = msg;
        speak(msg);
        vibrate(4);
        return;
    }
    if (currentRouteLayer) map.removeLayer(currentRouteLayer);
    const latlngs = result.path.map(p => [p.lat, p.lng]);
    currentRouteLayer = L.polyline(latlngs, { color: wheelchairMode ? '#007aff' : '#ff9500', weight: 6 }).addTo(map);
    map.fitBounds(currentRouteLayer.getBounds());
    const steps = result.path.map((p, i) => i === 0 ? `从${p.name}出发` : `前往${p.name}`);
    const distance = result.distance.toFixed(1);
    let modeStr = wheelchairMode ? '轮椅优先模式' : '普通模式';
    if (avoidTypes.length) modeStr += `，已避开${avoidTypes.join('、')}`;
    if (rampPrefer) modeStr += `，优先坡道路段`;
    const msg = `路线规划成功，全程约${distance}公里，${modeStr}。` + steps.join('，');
    document.getElementById('status').innerText = msg;
    speak(msg);
    vibrate(3);
    highlightObstaclesAlongRoute(latlngs);
    speakRouteWarnings(latlngs);
};

function highlightObstaclesAlongRoute(routeLatLngs) {
    if (window.highlightedMarkers) {
        window.highlightedMarkers.forEach(m => {
            if (m && m.setIcon) m.setIcon(L.divIcon({ className: 'obstacle-marker', html: '⚠️', iconSize: [24, 24] }));
        });
    }
    window.highlightedMarkers = [];
    const threshold = 0.0025;
    obstacles.forEach(obs => {
        let minDist = Infinity;
        for (let i = 0; i < routeLatLngs.length - 1; i++) {
            const p1 = { lat: routeLatLngs[i][0], lng: routeLatLngs[i][1] };
            const p2 = { lat: routeLatLngs[i+1][0], lng: routeLatLngs[i+1][1] };
            const dist = pointToSegmentDistance(obs, p1, p2);
            if (dist < minDist) minDist = dist;
        }
        if (minDist < threshold) {
            const marker = obstacleMarkers.find(m => {
                const pos = m.getLatLng();
                return Math.abs(pos.lat - obs.lat) < 0.0001 && Math.abs(pos.lng - obs.lng) < 0.0001;
            });
            if (marker) {
                marker.setIcon(L.divIcon({ className: 'obstacle-marker obstacle-highlight', html: '🔴⚠️', iconSize: [28, 28] }));
                window.highlightedMarkers.push(marker);
            }
        }
    });
}

function speakRouteWarnings(routeLatLngs) {
    const threshold = 0.0025;
    const nearby = obstacles.filter(obs => {
        let minDist = Infinity;
        for (let i = 0; i < routeLatLngs.length - 1; i++) {
            const p1 = { lat: routeLatLngs[i][0], lng: routeLatLngs[i][1] };
            const p2 = { lat: routeLatLngs[i+1][0], lng: routeLatLngs[i+1][1] };
            const dist = pointToSegmentDistance(obs, p1, p2);
            if (dist < minDist) minDist = dist;
        }
        return minDist < threshold;
    });
    if (nearby.length) {
        const types = [...new Set(nearby.map(o => o.type))];
        speak(`注意，沿途有${nearby.length}处障碍物，类型包括${types.join('、')}，请小心通行`);
        vibrate(4);
    }
}

function renderFacilityPanel() {
    const container = document.getElementById('facilityList');
    if (!container) return;
    let html = '';
    for (let name in facilityStatus) {
        const status = facilityStatus[name];
        const elevatorClass = status.elevator === '正常' ? 'status-normal' : 'status-warning';
        const rampClass = status.ramp === '正常' ? 'status-normal' : 'status-warning';
        html += `
            <div class="facility-item" data-name="${name}">
                <div class="facility-name">🏢 ${name}</div>
                <div class="facility-detail">🛗 电梯: <span class="${elevatorClass}">${status.elevator}</span></div>
                <div class="facility-detail">♿ 坡道: <span class="${rampClass}">${status.ramp}</span></div>
            </div>
        `;
    }
    container.innerHTML = html;
    document.querySelectorAll('.facility-item').forEach(el => {
        el.addEventListener('click', () => {
            const name = el.getAttribute('data-name');
            const poi = poiList.find(p => p.name === name);
            if (poi) {
                map.setView([poi.lat, poi.lng], 16);
                const marker = poiMarkers.find(m => {
                    const pos = m.getLatLng();
                    return Math.abs(pos.lat - poi.lat) < 0.0001 && Math.abs(pos.lng - poi.lng) < 0.0001;
                });
                if (marker) marker.openPopup();
                speak(`${name}，电梯${facilityStatus[name].elevator}，坡道${facilityStatus[name].ramp}`);
            }
        });
    });
}

function processVoiceCommand(command) {
    const lowerCmd = command.toLowerCase();
    const matchedPoi = poiList.find(poi => lowerCmd.includes(poi.name.toLowerCase()));
    if (matchedPoi) {
        navigateTo(matchedPoi.lat, matchedPoi.lng, matchedPoi.name);
        return;
    }
    if (lowerCmd.includes('附近') && (lowerCmd.includes('无障碍') || lowerCmd.includes('设施') || lowerCmd.includes('电梯') || lowerCmd.includes('坡道'))) {
        const center = map.getCenter();
        const nearby = poiList.filter(poi => {
            const dist = Math.hypot(poi.lat - center.lat, poi.lng - center.lng);
            const status = facilityStatus[poi.name];
            const hasGood = (status?.elevator === '正常' || status?.ramp === '正常') || poi.score >= 3.5;
            return dist < 0.05 && hasGood;
        });
        if (nearby.length === 0) {
            speak("附近暂时没有找到无障碍设施，您可以尝试移动地图位置或上报新设施。");
        } else {
            const names = nearby.map(p => `${p.name}（评分${p.score}）`).join('，');
            speak(`附近找到${nearby.length}个无障碍友好设施：${names}`);
            document.getElementById('status').innerHTML = `🔍 附近无障碍设施: ${names}`;
            vibrate(1);
        }
        return;
    }
    if (lowerCmd.includes('电梯') && lowerCmd.includes('哪里')) {
        const elevOk = poiList.filter(poi => facilityStatus[poi.name]?.elevator === '正常');
        if (elevOk.length) speak(`电梯正常的场所有：${elevOk.map(p => p.name).join('、')}`);
        else speak("当前暂无电梯正常运行的场所");
        return;
    }
    speak("未识别指令，您可以尝试说“导航到图书馆”或“附近有哪些无障碍设施”");
}

function voiceNavigation() {
    if (!window.webkitSpeechRecognition) {
        alert("浏览器不支持语音识别");
        return;
    }
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript;
        document.getElementById('status').innerText = `🎤 识别到: ${command}`;
        processVoiceCommand(command);
    };
    recognition.start();
}

function sos() {
    const msg = "SOS求助！已通知社区管理员（模拟）。当前位置：南华大学雨母校区。";
    speak(msg);
    document.getElementById('status').innerHTML = `<span style="color:red;">🚨 ${msg}</span>`;
    vibrate(4);
    alert(msg);
}

function showReportModal() {
    const center = map.getCenter();
    document.getElementById('obstacleLat').value = center.lat.toFixed(6);
    document.getElementById('obstacleLng').value = center.lng.toFixed(6);
    document.getElementById('locationHint').innerText = `📍 位置：${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}`;
    document.getElementById('reportModal').style.display = 'flex';
}

function showStats() {
    document.getElementById('chartModal').style.display = 'flex';
    const accessibleCount = poiList.filter(p => p.score >= 3.5).length;
    const notAccessible = poiList.length - accessibleCount;
    const coverageChart = echarts.init(document.getElementById('coverageChart'));
    coverageChart.setOption({
        title: { text: '无障碍设施覆盖率' },
        series: [{ type: 'pie', radius: '60%', data: [{ name: '无障碍友好', value: accessibleCount }, { name: '待改善', value: notAccessible }] }]
    });
    const days = [], counts = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().slice(5, 10);
        days.push(dateStr);
        counts.push(obstacles.filter(o => o.reportTime === d.toISOString().slice(0, 10)).length);
    }
    const trendChart = echarts.init(document.getElementById('trendChart'));
    trendChart.setOption({ title: { text: '近一周上报趋势' }, xAxis: { type: 'category', data: days }, yAxis: { type: 'value' }, series: [{ type: 'bar', data: counts }] });
}

function locateUser() {
    if (!navigator.geolocation) { alert("浏览器不支持地理定位"); return; }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            map.setView([lat, lng], 16);
            L.marker([lat, lng], { icon: L.divIcon({ className: 'current-location', html: '📍', iconSize: [24, 24] }) }).addTo(map).bindPopup('您当前的位置').openPopup();
            speak("已定位到您的位置");
        },
        (error) => { alert("定位失败：" + error.message); },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

function clearRoute() {
    if (currentRouteLayer) map.removeLayer(currentRouteLayer);
    if (startMarker) map.removeLayer(startMarker);
    if (endMarker) map.removeLayer(endMarker);
    startMarker = endMarker = null;
    document.getElementById('status').innerText = '👋 欢迎使用无障碍出行伴侣';
    if (window.highlightedMarkers) {
        window.highlightedMarkers.forEach(m => {
            if (m && m.setIcon) m.setIcon(L.divIcon({ className: 'obstacle-marker', html: '⚠️', iconSize: [24, 24] }));
        });
        window.highlightedMarkers = [];
    }
}

function getDistance(coord1, coord2) {
    const R = 6371;
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

async function geocodeAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'AccessibilityTravelCompanion/1.0' }
        });
        const data = await response.json();
        if (data.length > 0) {
            return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        } else {
            throw new Error('未找到该地址');
        }
    } catch (error) {
        console.error('地理编码失败:', error);
        alert('地址解析失败，请尝试更具体的名称');
        return null;
    }
}

async function reverseGeocode(lat, lng) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    try {
        const res = await fetch(url, {
            headers: { 'User-Agent': 'AccessibilityTravelCompanion/1.0' }
        });
        const data = await res.json();
        return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch {
        return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
}

async function getOSRMRoute(startCoords, endCoords) {
    const url = `https://router.project-osrm.org/route/v1/foot/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?overview=full&geometries=geojson&steps=true`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.code === 'Ok') {
            return data.routes[0];
        } else {
            throw new Error('路径规划失败');
        }
    } catch (error) {
        console.error('OSRM 错误:', error);
        return null;
    }
}

async function useMyLocationAsStart() {
    if (!navigator.geolocation) {
        alert('浏览器不支持定位');
        return;
    }
    document.getElementById('status').innerText = '📍 正在获取您的位置...';
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const addr = await reverseGeocode(lat, lng);
        document.getElementById('startAddress').value = addr;
        document.getElementById('status').innerText = '✅ 已设置起点为当前位置';
        speak('起点已设置为当前位置');
    }, (err) => {
        alert('定位失败：' + err.message);
        document.getElementById('status').innerText = '❌ 定位失败';
    }, { enableHighAccuracy: true, timeout: 10000 });
}

async function planRealRoute() {
    const startAddr = document.getElementById('startAddress').value.trim();
    const endAddr = document.getElementById('endAddress').value.trim();
    if (!startAddr || !endAddr) {
        alert('请输入起点和终点地址');
        return;
    }
    document.getElementById('status').innerText = '🔍 正在解析地址并规划路线...';
    const startCoord = await geocodeAddress(startAddr);
    const endCoord = await geocodeAddress(endAddr);
    if (!startCoord || !endCoord) {
        document.getElementById('status').innerText = '❌ 地址解析失败';
        return;
    }
    clearRoute();
    startMarker = L.marker([startCoord.lat, startCoord.lng], {
        icon: L.divIcon({ className: 'route-marker', html: '🚩', iconSize: [28, 28] })
    }).addTo(map).bindPopup(`<b>起点</b><br>${startAddr}`);
    endMarker = L.marker([endCoord.lat, endCoord.lng], {
        icon: L.divIcon({ className: 'route-marker', html: '🏁', iconSize: [28, 28] })
    }).addTo(map).bindPopup(`<b>终点</b><br>${endAddr}`);
    const route = await getOSRMRoute(startCoord, endCoord);
    if (!route) {
        alert('在线路径规划失败，将使用直线距离');
        const latlngs = [[startCoord.lat, startCoord.lng], [endCoord.lat, endCoord.lng]];
        currentRouteLayer = L.polyline(latlngs, { color: 'red', weight: 4, dashArray: '5, 10' }).addTo(map);
        map.fitBounds(currentRouteLayer.getBounds());
        const distance = getDistance(startCoord, endCoord).toFixed(2);
        document.getElementById('status').innerText = `直线距离约 ${distance} 公里`;
        speak(`直线距离约 ${distance} 公里`);
        return;
    }
    const geojson = route.geometry;
    currentRouteLayer = L.geoJSON(geojson, { style: { color: '#007aff', weight: 6, opacity: 0.8 } }).addTo(map);
    map.fitBounds(currentRouteLayer.getBounds());
    const distance = (route.distance / 1000).toFixed(2);
    const duration = Math.round(route.duration / 60);
    const wheelchairMode = document.getElementById('wheelchairModeSearch').checked;
    const modeText = wheelchairMode ? '轮椅优先模式' : '普通模式';
    const msg = `路线规划成功（${modeText}），全程约 ${distance} 公里，预计步行 ${duration} 分钟。`;
    document.getElementById('status').innerText = msg;
    speak(msg);
    vibrate(3);
    warnObstaclesAlongGeoJSON(geojson);
}

function warnObstaclesAlongGeoJSON(geojson) {
    const coords = [];
    if (geojson.type === 'LineString') {
        geojson.coordinates.forEach(c => coords.push({ lng: c[0], lat: c[1] }));
    }
    const threshold = 0.002;
    const nearby = obstacles.filter(obs => {
        return coords.some(c => Math.hypot(c.lat - obs.lat, c.lng - obs.lng) < threshold);
    });
    if (nearby.length) {
        const types = [...new Set(nearby.map(o => o.type))];
        speak(`沿途附近有${nearby.length}处障碍物，类型包括${types.join('、')}，请小心通行`);
        vibrate(4);
        highlightNearbyObstacles(nearby);
    }
}

function highlightNearbyObstacles(obsArray) {
    obstacleMarkers.forEach(m => m.setIcon(L.divIcon({ className: 'obstacle-marker', html: '⚠️', iconSize: [24, 24] })));
    obsArray.forEach(obs => {
        const marker = obstacleMarkers.find(m => {
            const pos = m.getLatLng();
            return Math.abs(pos.lat - obs.lat) < 0.0001 && Math.abs(pos.lng - obs.lng) < 0.0001;
        });
        if (marker) {
            marker.setIcon(L.divIcon({ className: 'obstacle-marker obstacle-highlight', html: '🔴⚠️', iconSize: [28, 28] }));
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const photoInput = document.getElementById('obstaclePhoto');
    if (photoInput) {
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    document.getElementById('photoPreview').src = ev.target.result;
                    document.getElementById('photoPreview').style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const type = document.getElementById('obstacleType').value;
            const desc = document.getElementById('obstacleDesc').value;
            const photoData = document.getElementById('photoPreview').src;
            const lat = parseFloat(document.getElementById('obstacleLat').value);
            const lng = parseFloat(document.getElementById('obstacleLng').value);
            const newObstacle = { id: Date.now(), lat, lng, type: type, description: desc, status: "未处理", reportTime: new Date().toISOString().slice(0, 10), photo: photoData || null };
            obstacles.push(newObstacle);
            saveObstacles();
            updateObstacleMarkers();
            document.getElementById('reportModal').style.display = 'none';
            speak("感谢上报，管理员会尽快处理");
            vibrate(1);
            reportForm.reset();
            document.getElementById('photoPreview').style.display = 'none';
        });
    }
});

window.onload = () => {
    initMap();
    addPoiMarkers();
    updateObstacleMarkers();
    renderFacilityPanel();
    if (document.getElementById('voiceBtn')) document.getElementById('voiceBtn').onclick = voiceNavigation;
    if (document.getElementById('sosBtn')) document.getElementById('sosBtn').onclick = sos;
    if (document.getElementById('reportBtn')) document.getElementById('reportBtn').onclick = showReportModal;
    if (document.getElementById('statsBtn')) document.getElementById('statsBtn').onclick = showStats;
    if (document.getElementById('closeModal')) document.getElementById('closeModal').onclick = () => document.getElementById('chartModal').style.display = 'none';
    if (document.getElementById('closeReportModal')) document.getElementById('closeReportModal').onclick = () => document.getElementById('reportModal').style.display = 'none';
    if (document.getElementById('agreePrivacy')) document.getElementById('agreePrivacy').onclick = () => document.getElementById('privacyModal').style.display = 'none';
    if (document.getElementById('locateBtn')) document.getElementById('locateBtn').onclick = locateUser;
    if (document.getElementById('searchRouteBtn')) document.getElementById('searchRouteBtn').addEventListener('click', planRealRoute);
    if (document.getElementById('useMyLocationBtn')) document.getElementById('useMyLocationBtn').addEventListener('click', useMyLocationAsStart);
    if (document.getElementById('clearRouteBtn')) document.getElementById('clearRouteBtn').addEventListener('click', () => { clearRoute(); speak('路线已清除'); });
    if (document.getElementById('contrastBtn')) {
        if (loadContrastPref()) document.body.classList.add('high-contrast');
        document.getElementById('contrastBtn').onclick = () => {
            document.body.classList.toggle('high-contrast');
            saveContrastPref(document.body.classList.contains('high-contrast'));
        };
    }
    if (document.getElementById('clearDataBtn')) {
        document.getElementById('clearDataBtn').onclick = () => {
            if (confirm('清除所有本地数据？不可恢复。')) {
                localStorage.clear();
                location.reload();
            }
        };
    }
    window.onclick = (e) => { if (e.target.classList.contains('modal')) e.target.style.display = 'none'; };
    setInterval(() => {
        const keys = Object.keys(facilityStatus);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const newElevator = Math.random() > 0.5 ? "正常" : "维修中";
        const newRamp = Math.random() > 0.5 ? "正常" : "维修中";
        facilityStatus[randomKey] = { elevator: newElevator, ramp: newRamp };
        poiMarkers.forEach((marker, idx) => { if (marker && marker.getPopup) marker.getPopup().setContent(createPopupContent(poiList[idx])); });
        renderFacilityPanel();
        document.getElementById('refreshIndicator').style.opacity = '0.6';
        setTimeout(() => document.getElementById('refreshIndicator').style.opacity = '1', 300);
    }, 30000);
};