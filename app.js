// 全局变量
let map;
let poiMarkers = [];
let obstacleMarkers = [];
let currentRouteLayer = null;

// 初始化地图
function initMap() {
    map = L.map('map').setView([31.2304, 121.4737], 14);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);
}

// 语音播报
function speak(text) {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

// 震动反馈（模式：1=左转，2=右转，3=到达，4=警告）
function vibrate(pattern) {
    if (!navigator.vibrate) return;
    const patterns = {
        1: [200, 100],        // 左转：短震
        2: [200, 100, 200],    // 右转：两短
        3: [500],              // 到达：长震
        4: [500, 200, 500]     // 警告
    };
    navigator.vibrate(patterns[pattern] || 200);
}

// 添加POI标记
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
    return `
        <b>${poi.name}</b><br>
        ⭐ 可达性评分: ${poi.score}/5<br>
        🛗 电梯: ${facilityStatus[poi.name]?.elevator || '未知'}<br>
        ♿ 坡道: ${facilityStatus[poi.name]?.ramp || '未知'}<br>
        <button onclick="navigateTo(${poi.lat}, ${poi.lng}, '${poi.name}')" style="margin-top:5px;padding:5px 10px;">🧭 导航至此</button>
    `;
}

// 添加障碍物标记
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

// 无障碍路径规划（Dijkstra简易实现）
function findAccessiblePath(startNodeId, endNodeId, wheelchairMode = true) {
    const nodes = graph.nodes;
    const edges = graph.edges;

    // 构建邻接表
    const adj = {};
    Object.keys(nodes).forEach(id => adj[id] = []);
    edges.forEach(edge => {
        if (wheelchairMode && !edge.accessible) return; // 轮椅模式跳过不可达边
        adj[edge.from].push({ to: edge.to, dist: edge.distance });
        adj[edge.to].push({ to: edge.from, dist: edge.distance }); // 双向
    });

    const dist = {}, prev = {};
    Object.keys(nodes).forEach(id => { dist[id] = Infinity; prev[id] = null; });
    dist[startNodeId] = 0;
    const pq = [{ id: startNodeId, dist: 0 }];

    while (pq.length) {
        pq.sort((a, b) => a.dist - b.dist);
        const current = pq.shift();
        if (current.id == endNodeId) break;
        adj[current.id].forEach(neighbor => {
            const alt = dist[current.id] + neighbor.dist;
            if (alt < dist[neighbor.to]) {
                dist[neighbor.to] = alt;
                prev[neighbor.to] = current.id;
                pq.push({ id: neighbor.to, dist: alt });
            }
        });
    }

    // 回溯路径
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

// 根据POI名称查找节点ID
function findNodeIdByName(name) {
    for (let id in graph.nodes) {
        if (graph.nodes[id].name === name) return parseInt(id);
    }
    return null;
}

// 导航函数
function navigateTo(lat, lng, name) {
    const startName = "市民中心图书馆"; // 模拟当前位置
    const startId = findNodeIdByName(startName);
    const endId = findNodeIdByName(name);
    if (!startId || !endId) {
        speak("无法规划路线，请重试");
        return;
    }

    const wheelchairMode = document.getElementById('wheelchairMode').checked;
    const result = findAccessiblePath(startId, endId, wheelchairMode);

    if (result.path.length < 2) {
        const msg = wheelchairMode ? "未找到无障碍路线，请尝试关闭轮椅优先模式" : "未找到路线";
        document.getElementById('status').innerText = msg;
        speak(msg);
        vibrate(4);
        return;
    }

    // 绘制路线
    if (currentRouteLayer) map.removeLayer(currentRouteLayer);
    const latlngs = result.path.map(p => [p.lat, p.lng]);
    currentRouteLayer = L.polyline(latlngs, { color: wheelchairMode ? '#007aff' : '#ff9500', weight: 6 }).addTo(map);
    map.fitBounds(currentRouteLayer.getBounds());

    // 生成导航指令
    const steps = result.path.map((p, i) => i === 0 ? `从${p.name}出发` : `前往${p.name}`);
    const distance = result.distance.toFixed(1);
    const msg = `路线规划成功，全程约${distance}公里，${wheelchairMode ? '轮椅优先模式' : '普通模式'}。` + steps.join('，');
    document.getElementById('status').innerText = msg;
    speak(msg);
    vibrate(3);

    // 检查沿途障碍物并警告
    const hasObstacle = obstacles.some(obs => {
        return result.path.some(node => Math.abs(node.lat - obs.lat) < 0.005 && Math.abs(node.lng - obs.lng) < 0.005);
    });
    if (hasObstacle) {
        speak("注意，沿途有上报障碍物，请小心");
        vibrate(4);
    }
}

// 语音导航
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
        const matched = poiList.find(poi => command.includes(poi.name));
        if (matched) {
            navigateTo(matched.lat, matched.lng, matched.name);
        } else {
            speak("未找到地点，请说完整名称，例如：导航到第一人民医院");
        }
    };
    recognition.start();
}

// SOS
function sos() {
    const msg = "SOS求助！已通知社区管理员（模拟）。当前位置：市民中心图书馆附近。";
    speak(msg);
    document.getElementById('status').innerHTML = `<span style="color:red;">🚨 ${msg}</span>`;
    vibrate(4);
    alert(msg);
}

// 上报模态框
function showReportModal() {
    const center = map.getCenter();
    document.getElementById('obstacleLat').value = center.lat.toFixed(6);
    document.getElementById('obstacleLng').value = center.lng.toFixed(6);
    document.getElementById('locationHint').innerText = `📍 位置：${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}`;
    document.getElementById('reportModal').style.display = 'flex';
}

// 处理照片预览
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

    // 上报表单提交
    document.getElementById('reportForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('obstacleType').value;
        const desc = document.getElementById('obstacleDesc').value;
        const photoData = document.getElementById('photoPreview').src;
        const lat = parseFloat(document.getElementById('obstacleLat').value);
        const lng = parseFloat(document.getElementById('obstacleLng').value);

        const newObstacle = {
            id: Date.now(),
            lat, lng,
            type: type,
            description: desc,
            status: "未处理",
            reportTime: new Date().toISOString().slice(0, 10),
            photo: photoData || null
        };
        obstacles.push(newObstacle);
        saveObstacles();
        updateObstacleMarkers();
        document.getElementById('reportModal').style.display = 'none';
        speak("感谢上报，管理员会尽快处理");
        vibrate(1);
        document.getElementById('reportForm').reset();
        document.getElementById('photoPreview').style.display = 'none';
    });
});

// 数据看板
function showStats() {
    document.getElementById('chartModal').style.display = 'flex';
    const accessibleCount = poiList.filter(p => p.score >= 3.5).length;
    const notAccessible = poiList.length - accessibleCount;
    const coverageChart = echarts.init(document.getElementById('coverageChart'));
    coverageChart.setOption({
        title: { text: '无障碍设施覆盖率' },
        series: [{
            type: 'pie',
            radius: '60%',
            data: [
                { name: '无障碍友好', value: accessibleCount },
                { name: '待改善', value: notAccessible }
            ]
        }]
    });

    // 统计最近7天上报趋势（基于obstacles真实数据简化）
    const days = [];
    const counts = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().slice(5, 10);
        days.push(dateStr);
        const count = obstacles.filter(o => o.reportTime === d.toISOString().slice(0, 10)).length;
        counts.push(count);
    }
    const trendChart = echarts.init(document.getElementById('trendChart'));
    trendChart.setOption({
        title: { text: '近一周上报趋势' },
        xAxis: { type: 'category', data: days },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: counts }]
    });
}

// 页面初始化
window.onload = () => {
    initMap();
    addPoiMarkers();
    updateObstacleMarkers();

    // 绑定事件
    document.getElementById('voiceBtn').onclick = voiceNavigation;
    document.getElementById('sosBtn').onclick = sos;
    document.getElementById('reportBtn').onclick = showReportModal;
    document.getElementById('statsBtn').onclick = showStats;
    document.getElementById('closeModal').onclick = () => document.getElementById('chartModal').style.display = 'none';
    document.getElementById('closeReportModal').onclick = () => document.getElementById('reportModal').style.display = 'none';
    document.getElementById('agreePrivacy').onclick = () => document.getElementById('privacyModal').style.display = 'none';
    document.getElementById('locateBtn').onclick = locateUser;

    // 高对比度切换
    const contrastBtn = document.getElementById('contrastBtn');
    if (loadContrastPref()) document.body.classList.add('high-contrast');
    contrastBtn.onclick = () => {
        document.body.classList.toggle('high-contrast');
        saveContrastPref(document.body.classList.contains('high-contrast'));
    };

    // 清除数据
    document.getElementById('clearDataBtn').onclick = () => {
        if (confirm('清除所有本地数据？不可恢复。')) {
            localStorage.clear();
            location.reload();
        }
    };

    // 点击模态框背景关闭
    window.onclick = (e) => {
        if (e.target.classList.contains('modal')) e.target.style.display = 'none';
    };

    // 模拟实时状态变化
    setInterval(() => {
        const keys = Object.keys(facilityStatus);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const newElevator = Math.random() > 0.5 ? "正常" : "维修中";
        const newRamp = Math.random() > 0.5 ? "正常" : "维修中";
        facilityStatus[randomKey] = { elevator: newElevator, ramp: newRamp };
        poiMarkers.forEach((marker, idx) => {
            const poi = poiList[idx];
            marker.getPopup().setContent(createPopupContent(poi));
        });
    }, 30000);
};


// 定位到用户当前位置
function locateUser() {
    if (!navigator.geolocation) {
        alert("您的浏览器不支持地理定位");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            // 将地图中心移动到用户位置
            map.setView([lat, lng], 16);
            // 添加一个标记表示当前位置
            L.marker([lat, lng], {
                icon: L.divIcon({
                    className: 'current-location',
                    html: '📍',
                    iconSize: [24, 24]
                })
            }).addTo(map).bindPopup('您当前的位置').openPopup();
            speak("已定位到您的位置");
        },
        (error) => {
            alert("定位失败：" + error.message);
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}