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