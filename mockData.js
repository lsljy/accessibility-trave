// ==============================================
// 南华大学雨母校区 - 完整数据（坐标: 26.8860, 112.5081）
// ==============================================

// POI数据（兴趣点）- 基于校园实际地点
const poiList = [
    { id: 1, name: "西门", lat: 26.8855, lng: 112.5050, score: 4.5, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "校门" },
    { id: 2, name: "东门", lat: 26.8865, lng: 112.5110, score: 4.5, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "校门" },
    { id: 3, name: "南门", lat: 26.8835, lng: 112.5078, score: 4.3, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "校门" },
    { id: 4, name: "北门", lat: 26.8890, lng: 112.5075, score: 4.2, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "校门" },
    { id: 5, name: "第一教学楼", lat: 26.8860, lng: 112.5068, score: 4.2, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "教学楼" },
    { id: 6, name: "第二教学楼", lat: 26.8848, lng: 112.5080, score: 4.0, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "教学楼" },
    { id: 7, name: "第三教学楼", lat: 26.8872, lng: 112.5065, score: 4.1, hasElevator: true, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "教学楼" },
    { id: 8, name: "图书馆", lat: 26.8862, lng: 112.5085, score: 4.8, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: false, type: "图书馆" },
    { id: 9, name: "雨母食堂", lat: 26.8875, lng: 112.5078, score: 4.3, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "食堂" },
    { id: 10, name: "民族食堂", lat: 26.8850, lng: 112.5090, score: 4.4, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "食堂" },
    { id: 11, name: "男生宿舍1栋", lat: 26.8882, lng: 112.5070, score: 3.8, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "宿舍" },
    { id: 12, name: "男生宿舍2栋", lat: 26.8888, lng: 112.5078, score: 3.7, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "宿舍" },
    { id: 13, name: "女生宿舍3栋", lat: 26.8840, lng: 112.5072, score: 3.8, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "宿舍" },
    { id: 14, name: "女生宿舍4栋", lat: 26.8835, lng: 112.5082, score: 3.9, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "宿舍" },
    { id: 15, name: "体育馆", lat: 26.8870, lng: 112.5100, score: 4.0, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "体育馆" },
    { id: 16, name: "操场", lat: 26.8852, lng: 112.5095, score: 4.0, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: false, type: "运动场" },
    { id: 17, name: "篮球场", lat: 26.8858, lng: 112.5102, score: 4.1, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: false, type: "运动场" },
    { id: 18, name: "校医院", lat: 26.8878, lng: 112.5058, score: 4.2, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: false, type: "医疗" },
    { id: 19, name: "学生活动中心", lat: 26.8868, lng: 112.5065, score: 4.3, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "活动中心" },
    { id: 20, name: "快递中心", lat: 26.8885, lng: 112.5083, score: 4.0, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "服务" },
    { id: 21, name: "超市", lat: 26.8880, lng: 112.5075, score: 4.2, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "商业" },
    { id: 22, name: "逸夫楼", lat: 26.8855, lng: 112.5062, score: 4.3, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "教学楼" },
    { id: 23, name: "计算机学院", lat: 26.8845, lng: 112.5085, score: 4.1, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "教学楼" },
    { id: 24, name: "经管学院", lat: 26.8878, lng: 112.5090, score: 4.0, hasElevator: true, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "教学楼" },
    { id: 25, name: "设计艺术学院", lat: 26.8832, lng: 112.5068, score: 4.2, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "教学楼" }
];

// 设施状态（包含电梯、坡道、盲道、台阶）
let facilityStatus = {
    "西门": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "东门": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "南门": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "北门": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "第一教学楼": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "第二教学楼": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "第三教学楼": { elevator: "正常", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "图书馆": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "无台阶" },
    "雨母食堂": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "民族食堂": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "男生宿舍1栋": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "男生宿舍2栋": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "女生宿舍3栋": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "女生宿舍4栋": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "体育馆": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "操场": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "无台阶" },
    "篮球场": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "无台阶" },
    "校医院": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "无台阶" },
    "学生活动中心": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "快递中心": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "超市": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "逸夫楼": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "计算机学院": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "经管学院": { elevator: "正常", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "设计艺术学院": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" }
};

// 障碍物数据
let obstacles = [
    {
        id: 101,
        lat: 26.8858,
        lng: 112.5065,
        type: "台阶",
        description: "一教正门三级台阶，轮椅无法通行，建议走侧门坡道",
        status: "未处理",
        reportTime: "2026-04-08",
        photo: null,
        claimedBy: null,
        claimTime: null,
        resolvedPhoto: null,
        resolvedTime: null
    },
    {
        id: 102,
        lat: 26.8872,
        lng: 112.5098,
        type: "坡道损坏",
        description: "体育馆门口坡道破损严重，轮椅通行困难",
        status: "处理中",
        reportTime: "2026-04-09",
        photo: null,
        claimedBy: "志愿者张三",
        claimTime: "2026-04-10",
        resolvedPhoto: null,
        resolvedTime: null
    },
    {
        id: 103,
        lat: 26.8850,
        lng: 112.5075,
        type: "施工区域",
        description: "二教北侧道路施工，行人需绕行",
        status: "未处理",
        reportTime: "2026-04-07",
        photo: null,
        claimedBy: null,
        claimTime: null,
        resolvedPhoto: null,
        resolvedTime: null
    },
    {
        id: 104,
        lat: 26.8884,
        lng: 112.5068,
        type: "盲道被占",
        description: "男生宿舍1栋门口共享单车乱停，盲道完全被占",
        status: "未处理",
        reportTime: "2026-04-10",
        photo: null,
        claimedBy: null,
        claimTime: null,
        resolvedPhoto: null,
        resolvedTime: null
    },
    {
        id: 105,
        lat: 26.8838,
        lng: 112.5080,
        type: "电梯故障",
        description: "女生宿舍3栋电梯已停运3天，高层住户不便",
        status: "处理中",
        reportTime: "2026-04-06",
        photo: null,
        claimedBy: "物业维修",
        claimTime: "2026-04-09",
        resolvedPhoto: null,
        resolvedTime: null
    },
    {
        id: 106,
        lat: 26.8864,
        lng: 112.5090,
        type: "台阶",
        description: "图书馆侧门台阶未设坡道，轮椅无法进入",
        status: "未处理",
        reportTime: "2026-04-05",
        photo: null,
        claimedBy: null,
        claimTime: null,
        resolvedPhoto: null,
        resolvedTime: null
    },
    {
        id: 107,
        lat: 26.8876,
        lng: 112.5076,
        type: "盲道被占",
        description: "雨母食堂门口长期被餐车占用盲道",
        status: "已处理",
        reportTime: "2026-04-01",
        photo: null,
        claimedBy: "后勤处",
        claimTime: "2026-04-03",
        resolvedPhoto: null,
        resolvedTime: "2026-04-04"
    },
    {
        id: 108,
        lat: 26.8843,
        lng: 112.5088,
        type: "坡道损坏",
        description: "计算机学院侧门坡道积水严重，雨天无法使用",
        status: "未处理",
        reportTime: "2026-04-09",
        photo: null,
        claimedBy: null,
        claimTime: null,
        resolvedPhoto: null,
        resolvedTime: null
    },
    {
        id: 109,
        lat: 26.8892,
        lng: 112.5072,
        type: "施工区域",
        description: "北门附近水管维修，行人需绕行西门",
        status: "处理中",
        reportTime: "2026-04-08",
        photo: null,
        claimedBy: "施工队",
        claimTime: "2026-04-09",
        resolvedPhoto: null,
        resolvedTime: null
    },
    {
        id: 110,
        lat: 26.8854,
        lng: 112.5100,
        type: "其他",
        description: "操场跑道部分区域破损，盲人跑步有安全隐患",
        status: "未处理",
        reportTime: "2026-04-07",
        photo: null,
        claimedBy: null,
        claimTime: null,
        resolvedPhoto: null,
        resolvedTime: null
    },
    {
        id: 111,
        lat: 26.8866,
        lng: 112.5062,
        type: "台阶",
        description: "学生活动中心门口台阶无坡道辅助",
        status: "未处理",
        reportTime: "2026-04-10",
        photo: null,
        claimedBy: null,
        claimTime: null,
        resolvedPhoto: null,
        resolvedTime: null
    },
    {
        id: 112,
        lat: 26.8879,
        lng: 112.5073,
        type: "盲道被占",
        description: "超市门口电动车乱停，盲道被占",
        status: "未处理",
        reportTime: "2026-04-09",
        photo: null,
        claimedBy: null,
        claimTime: null,
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
        } catch(e) { 
            console.warn("解析存储数据失败"); 
        }
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

// ==============================================
// 详细的校园路网图（用于真实路径规划）
// ==============================================
const graph = {
    nodes: {
        // 西门区域
        1: { name: "西门", lat: 26.8855, lng: 112.5050 },
        2: { name: "西门主干道-点1", lat: 26.8858, lng: 112.5058 },
        3: { name: "西门主干道-点2", lat: 26.8860, lng: 112.5065 },
        
        // 中心区域
        4: { name: "一教路口", lat: 26.8860, lng: 112.5068 },
        5: { name: "食堂路口", lat: 26.8875, lng: 112.5078 },
        6: { name: "图书馆路口", lat: 26.8862, lng: 112.5085 },
        7: { name: "二教路口", lat: 26.8848, lng: 112.5080 },
        
        // 宿舍区域
        8: { name: "男生宿舍路口", lat: 26.8882, lng: 112.5070 },
        9: { name: "女生宿舍路口", lat: 26.8840, lng: 112.5072 },
        
        // 东门区域
        10: { name: "体育馆路口", lat: 26.8870, lng: 112.5100 },
        11: { name: "东门", lat: 26.8865, lng: 112.5110 },
        
        // 操场区域
        12: { name: "操场入口", lat: 26.8855, lng: 112.5092 },
        13: { name: "操场", lat: 26.8852, lng: 112.5095 },
        
        // 补充节点
        14: { name: "图书馆北路口", lat: 26.8868, lng: 112.5080 },
        15: { name: "食堂南路口", lat: 26.8865, lng: 112.5075 },
        16: { name: "三教路口", lat: 26.8872, lng: 112.5065 },
        17: { name: "南门路口", lat: 26.8835, lng: 112.5078 },
        18: { name: "北门路口", lat: 26.8890, lng: 112.5075 },
        19: { name: "校医院路口", lat: 26.8878, lng: 112.5058 },
        20: { name: "活动中心路口", lat: 26.8868, lng: 112.5065 }
    },
    edges: [
        // 西门到中心区
        { from: 1, to: 2, distance: 0.09, accessible: true, name: "西门路" },
        { from: 2, to: 3, distance: 0.08, accessible: true, name: "西门路" },
        { from: 3, to: 4, distance: 0.07, accessible: true, name: "主干道" },
        { from: 3, to: 15, distance: 0.10, accessible: true, name: "西门南路" },
        
        // 一教周边
        { from: 4, to: 5, distance: 0.16, accessible: true, name: "教学楼路" },
        { from: 4, to: 7, distance: 0.15, accessible: true, name: "教学楼路" },
        { from: 4, to: 9, distance: 0.22, accessible: true, name: "宿舍路" },
        { from: 4, to: 20, distance: 0.06, accessible: true, name: "活动中心路" },
        
        // 食堂周边
        { from: 5, to: 6, distance: 0.13, accessible: true, name: "食堂路" },
        { from: 5, to: 8, distance: 0.10, accessible: true, name: "宿舍路" },
        { from: 5, to: 14, distance: 0.08, accessible: true, name: "食堂北路" },
        { from: 5, to: 15, distance: 0.10, accessible: true, name: "食堂南路" },
        { from: 5, to: 16, distance: 0.07, accessible: true, name: "三教路" },
        
        // 图书馆周边
        { from: 6, to: 7, distance: 0.16, accessible: true, name: "图书馆路" },
        { from: 6, to: 10, distance: 0.15, accessible: true, name: "体育馆路" },
        { from: 6, to: 12, distance: 0.09, accessible: true, name: "操场路" },
        { from: 6, to: 14, distance: 0.07, accessible: true, name: "图书馆北路" },
        
        // 二教周边
        { from: 7, to: 9, distance: 0.09, accessible: true, name: "二教路" },
        { from: 7, to: 12, distance: 0.14, accessible: true, name: "操场路" },
        { from: 7, to: 17, distance: 0.12, accessible: true, name: "南门路" },
        
        // 东门区域
        { from: 10, to: 11, distance: 0.16, accessible: true, name: "东门路" },
        { from: 10, to: 14, distance: 0.13, accessible: true, name: "体育馆北路" },
        
        // 操场
        { from: 12, to: 13, distance: 0.04, accessible: true, name: "操场入口路" },
        
        // 补充连接
        { from: 14, to: 15, distance: 0.08, accessible: true, name: "中心环路" },
        { from: 15, to: 7, distance: 0.17, accessible: true, name: "教学楼南路" },
        { from: 16, to: 18, distance: 0.21, accessible: true, name: "北门路" },
        { from: 19, to: 16, distance: 0.09, accessible: true, name: "校医院路" },
        { from: 19, to: 3, distance: 0.13, accessible: true, name: "校医院西路" },
        { from: 20, to: 16, distance: 0.06, accessible: true, name: "活动中心北路" }
    ]
};

// 节点名称到ID的映射（用于快速查找）
const nodeNameToId = {};
for (let id in graph.nodes) {
    nodeNameToId[graph.nodes[id].name] = parseInt(id);
}

// 通知权限状态
let notificationEnabled = false;