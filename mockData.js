// 模拟POI数据（无障碍设施）
const poiList = [
    { id: 1, name: "市民中心图书馆", lat: 31.2304, lng: 121.4737, score: 4.8, hasElevator: true, hasRamp: true, type: "图书馆" },
    { id: 2, name: "中山公园地铁站A口", lat: 31.2223, lng: 121.4642, score: 2.5, hasElevator: false, hasRamp: false, type: "地铁站" },
    { id: 3, name: "第一人民医院", lat: 31.2401, lng: 121.4805, score: 4.2, hasElevator: true, hasRamp: true, type: "医院" },
    { id: 4, name: "万达广场", lat: 31.2350, lng: 121.4500, score: 3.9, hasElevator: true, hasRamp: false, type: "商场" }
];

// 电梯/坡道实时状态
let facilityStatus = {
    "市民中心图书馆": { elevator: "正常", ramp: "正常" },
    "中山公园地铁站A口": { elevator: "维修中", ramp: "无" },
    "第一人民医院": { elevator: "正常", ramp: "正常" },
    "万达广场": { elevator: "正常", ramp: "维修中" }
};

// 障碍物数据（扩展字段：志愿者认领、处理照片、完成时间）
let obstacles = [
    {
        id: 101,
        lat: 31.2280,
        lng: 121.4700,
        type: "台阶",
        description: "图书馆南门三级台阶",
        status: "未处理",        // 状态：未处理、处理中、已完成（替代原“已处理”语义）
        reportTime: "2025-04-08",
        photo: null,             // 上报时照片
        claimedBy: null,         // 认领志愿者姓名
        claimTime: null,         // 认领时间
        resolvedPhoto: null,     // 处理完成后照片
        resolvedTime: null       // 完成时间
    },
    {
        id: 102,
        lat: 31.2330,
        lng: 121.4600,
        type: "坡道损坏",
        description: "万达广场侧门坡道破损",
        status: "处理中",
        reportTime: "2025-04-09",
        photo: null,
        claimedBy: "志愿者张三",
        claimTime: "2025-04-10",
        resolvedPhoto: null,
        resolvedTime: null
    }
];

// 存储操作
function saveObstacles() {
    localStorage.setItem('obstacles', JSON.stringify(obstacles));
}
function loadObstacles() {
    const stored = localStorage.getItem('obstacles');
    if (stored) {
        try {
            obstacles = JSON.parse(stored);
        } catch(e) { console.warn("解析存储数据失败"); }
    }
}
loadObstacles();

// 存储高对比度偏好
function saveContrastPref(enabled) {
    localStorage.setItem('highContrast', enabled);
}
function loadContrastPref() {
    return localStorage.getItem('highContrast') === 'true';
}

// 简易路网（用于路径规划）
const graph = {
    nodes: {
        1: { name: "市民中心图书馆", lat: 31.2304, lng: 121.4737 },
        2: { name: "中山公园地铁站A口", lat: 31.2223, lng: 121.4642 },
        3: { name: "第一人民医院", lat: 31.2401, lng: 121.4805 },
        4: { name: "万达广场", lat: 31.2350, lng: 121.4500 }
    },
    edges: [
        { from: 1, to: 2, distance: 1.2, accessible: true },
        { from: 1, to: 3, distance: 0.9, accessible: true },
        { from: 2, to: 4, distance: 1.5, accessible: false },
        { from: 3, to: 4, distance: 2.0, accessible: true },
        { from: 1, to: 4, distance: 2.2, accessible: false }
    ]
};

// 新增：通知权限请求状态
let notificationEnabled = false;

// 追加到 obstacles 数组末尾（保留原有数据）
// 追加到 obstacles 数组末尾（雨母校区密集障碍物）
const additionalObstacles = [
    // 雨母校区核心区（图书馆、教学楼、食堂、宿舍）
    { id: 201, lat: 26.8810, lng: 112.5145, type: "台阶", description: "雨母校区图书馆正门三级台阶", status: "未处理", reportTime: "2025-04-10", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 202, lat: 26.8795, lng: 112.5160, type: "坡道损坏", description: "雨母校区食堂侧门坡道破损", status: "未处理", reportTime: "2025-04-09", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 203, lat: 26.8820, lng: 112.5138, type: "盲道被占", description: "教学楼A栋前盲道被电动车占用", status: "未处理", reportTime: "2025-04-11", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 204, lat: 26.8780, lng: 112.5172, type: "电梯故障", description: "学生宿舍3栋电梯停运", status: "未处理", reportTime: "2025-04-10", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 205, lat: 26.8835, lng: 112.5120, type: "台阶", description: "体育场入口处无坡道", status: "未处理", reportTime: "2025-04-08", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 206, lat: 26.8805, lng: 112.5180, type: "坡道损坏", description: "第二食堂北侧坡道碎裂", status: "未处理", reportTime: "2025-04-07", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 207, lat: 26.8818, lng: 112.5152, type: "盲道被占", description: "图书馆西侧盲道被自行车阻挡", status: "未处理", reportTime: "2025-04-11", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 208, lat: 26.8790, lng: 112.5140, type: "台阶", description: "教学楼B栋侧门台阶过高", status: "未处理", reportTime: "2025-04-09", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 209, lat: 26.8825, lng: 112.5165, type: "电梯故障", description: "行政楼电梯停用", status: "未处理", reportTime: "2025-04-08", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 210, lat: 26.8775, lng: 112.5135, type: "盲道被占", description: "宿舍区主干道盲道被杂物堵塞", status: "未处理", reportTime: "2025-04-06", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    
    // 校园道路沿途障碍物
    { id: 211, lat: 26.8840, lng: 112.5110, type: "坡道损坏", description: "北门至体育场路段坡道坑洼", status: "未处理", reportTime: "2025-04-05", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 212, lat: 26.8855, lng: 112.5130, type: "台阶", description: "北门出口处有3级台阶无坡道", status: "未处理", reportTime: "2025-04-04", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 213, lat: 26.8760, lng: 112.5150, type: "盲道被占", description: "南门公交站盲道被共享单车占满", status: "未处理", reportTime: "2025-04-03", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 214, lat: 26.8785, lng: 112.5190, type: "电梯故障", description: "实验楼货梯停运", status: "未处理", reportTime: "2025-04-02", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 215, lat: 26.8830, lng: 112.5185, type: "坡道损坏", description: "图书馆东侧无障碍通道破损", status: "未处理", reportTime: "2025-04-01", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    
    // 周边道路（雨母山镇附近）
    { id: 216, lat: 26.8860, lng: 112.5200, type: "台阶", description: "雨母山镇政府门口台阶", status: "未处理", reportTime: "2025-04-11", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 217, lat: 26.8750, lng: 112.5100, type: "盲道被占", description: "南华大学雨母校区公交站盲道被占", status: "未处理", reportTime: "2025-04-09", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 218, lat: 26.8880, lng: 112.5250, type: "坡道损坏", description: "雨母大道人行道地砖缺失", status: "未处理", reportTime: "2025-04-07", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 219, lat: 26.8720, lng: 112.5080, type: "台阶", description: "雨母农贸市场入口台阶", status: "未处理", reportTime: "2025-04-05", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 220, lat: 26.8900, lng: 112.5220, type: "电梯故障", description: "雨母超市观光电梯故障", status: "未处理", reportTime: "2025-04-03", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    
    // 更多内部道路密集点（使热力图更明显）
    { id: 221, lat: 26.8802, lng: 112.5155, type: "盲道被占", description: "图书馆与教学楼之间盲道被摊贩占用", status: "未处理", reportTime: "2025-04-10", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 222, lat: 26.8815, lng: 112.5170, type: "坡道损坏", description: "学生活动中心坡道防滑条脱落", status: "未处理", reportTime: "2025-04-09", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 223, lat: 26.8798, lng: 112.5125, type: "台阶", description: "教学楼C栋后门两级台阶", status: "未处理", reportTime: "2025-04-08", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 224, lat: 26.8770, lng: 112.5165, type: "电梯故障", description: "宿舍5栋电梯间照明损坏且电梯异响", status: "未处理", reportTime: "2025-04-07", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 225, lat: 26.8828, lng: 112.5140, type: "盲道被占", description: "行政楼前盲道被机动车违停阻挡", status: "未处理", reportTime: "2025-04-06", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
];
obstacles.push(...additionalObstacles);
saveObstacles(); // 立即保存到 localStorage
obstacles.push(...additionalObstacles);
saveObstacles(); // 立即保存到 localStorage