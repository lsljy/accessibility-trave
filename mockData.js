// ==============================================
// 南华大学雨母校区 - 完整数据（坐标已调整：纬度+0.0110，经度-0.0130）
// 新中心点坐标: 26.8843, 112.5095
// ==============================================

// POI数据（兴趣点）- 基于校园实际地点（新增至40个）
const poiList = [
    // 校门（4个）
    { id: 1, name: "西门", lat: 26.8838, lng: 112.5064, score: 4.5, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "校门" },
    { id: 2, name: "东门", lat: 26.8848, lng: 112.5124, score: 4.5, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "校门" },
    { id: 3, name: "南门", lat: 26.8818, lng: 112.5092, score: 4.3, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "校门" },
    { id: 4, name: "北门", lat: 26.8873, lng: 112.5089, score: 4.2, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "校门" },
    
    // 教学楼（新增至12个）
    { id: 5, name: "第一教学楼", lat: 26.8843, lng: 112.5082, score: 4.2, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "教学楼" },
    { id: 6, name: "第二教学楼", lat: 26.8831, lng: 112.5094, score: 4.0, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "教学楼" },
    { id: 7, name: "第三教学楼", lat: 26.8855, lng: 112.5079, score: 4.1, hasElevator: true, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "教学楼" },
    { id: 8, name: "逸夫楼", lat: 26.8838, lng: 112.5076, score: 4.3, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "教学楼" },
    { id: 9, name: "计算机学院", lat: 26.8828, lng: 112.5099, score: 4.1, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "教学楼" },
    { id: 10, name: "经管学院", lat: 26.8861, lng: 112.5104, score: 4.0, hasElevator: true, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "教学楼" },
    { id: 11, name: "设计艺术学院", lat: 26.8815, lng: 112.5082, score: 4.2, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "教学楼" },
    { id: 12, name: "土木工程学院", lat: 26.8825, lng: 112.5075, score: 4.0, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "教学楼" },
    { id: 13, name: "电气工程学院", lat: 26.8865, lng: 112.5078, score: 4.1, hasElevator: true, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "教学楼" },
    { id: 14, name: "外国语学院", lat: 26.8835, lng: 112.5110, score: 4.2, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "教学楼" },
    { id: 15, name: "数理学院", lat: 26.8848, lng: 112.5115, score: 4.0, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "教学楼" },
    { id: 16, name: "化学化工学院", lat: 26.8810, lng: 112.5100, score: 4.1, hasElevator: true, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "教学楼" },
    
    // 图书馆（1个）
    { id: 17, name: "图书馆", lat: 26.8845, lng: 112.5099, score: 4.8, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: false, type: "图书馆" },
    
    // 食堂（新增至4个）
    { id: 18, name: "雨母食堂", lat: 26.8858, lng: 112.5092, score: 4.3, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "食堂" },
    { id: 19, name: "民族食堂", lat: 26.8833, lng: 112.5104, score: 4.4, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "食堂" },
    { id: 20, name: "西苑食堂", lat: 26.8828, lng: 112.5068, score: 4.2, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "食堂" },
    { id: 21, name: "东苑食堂", lat: 26.8860, lng: 112.5118, score: 4.1, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "食堂" },
    
    // 宿舍（新增至12个）
    { id: 22, name: "男生宿舍1栋", lat: 26.8865, lng: 112.5084, score: 3.8, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "宿舍" },
    { id: 23, name: "男生宿舍2栋", lat: 26.8871, lng: 112.5092, score: 3.7, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "宿舍" },
    { id: 24, name: "男生宿舍3栋", lat: 26.8870, lng: 112.5100, score: 3.8, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "宿舍" },
    { id: 25, name: "男生宿舍4栋", lat: 26.8868, lng: 112.5108, score: 3.9, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "宿舍" },
    { id: 26, name: "女生宿舍1栋", lat: 26.8823, lng: 112.5086, score: 3.8, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "宿舍" },
    { id: 27, name: "女生宿舍2栋", lat: 26.8818, lng: 112.5096, score: 3.9, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "宿舍" },
    { id: 28, name: "女生宿舍3栋", lat: 26.8815, lng: 112.5105, score: 3.8, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "宿舍" },
    { id: 29, name: "女生宿舍4栋", lat: 26.8820, lng: 112.5112, score: 3.9, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "宿舍" },
    { id: 30, name: "研究生宿舍", lat: 26.8805, lng: 112.5095, score: 4.0, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "宿舍" },
    { id: 31, name: "留学生公寓", lat: 26.8875, lng: 112.5115, score: 4.2, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "宿舍" },
    
    // 运动场馆（新增至6个）
    { id: 32, name: "体育馆", lat: 26.8853, lng: 112.5114, score: 4.0, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "体育馆" },
    { id: 33, name: "操场", lat: 26.8835, lng: 112.5109, score: 4.0, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: false, type: "运动场" },
    { id: 34, name: "篮球场", lat: 26.8841, lng: 112.5116, score: 4.1, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: false, type: "运动场" },
    { id: 35, name: "排球场", lat: 26.8830, lng: 112.5120, score: 4.0, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: false, type: "运动场" },
    { id: 36, name: "网球场", lat: 26.8825, lng: 112.5125, score: 4.1, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: false, type: "运动场" },
    { id: 37, name: "游泳馆", lat: 26.8865, lng: 112.5120, score: 4.2, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "体育馆" },
    
    // 服务设施（新增至8个）
    { id: 38, name: "校医院", lat: 26.8861, lng: 112.5072, score: 4.2, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: false, type: "医疗" },
    { id: 39, name: "学生活动中心", lat: 26.8851, lng: 112.5079, score: 4.3, hasElevator: true, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "活动中心" },
    { id: 40, name: "快递中心", lat: 26.8868, lng: 112.5097, score: 4.0, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "服务" },
    { id: 41, name: "超市", lat: 26.8863, lng: 112.5089, score: 4.2, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "商业" },
    { id: 42, name: "咖啡厅", lat: 26.8840, lng: 112.5105, score: 4.3, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "商业" },
    { id: 43, name: "理发店", lat: 26.8860, lng: 112.5090, score: 3.9, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "服务" },
    { id: 44, name: "打印店", lat: 26.8835, lng: 112.5085, score: 4.0, hasElevator: false, hasRamp: true, hasTactilePaving: false, hasStairs: true, type: "服务" },
    { id: 45, name: "银行ATM", lat: 26.8842, lng: 112.5075, score: 4.1, hasElevator: false, hasRamp: true, hasTactilePaving: true, hasStairs: true, type: "服务" }
];

// 设施状态（扩展至45个）
let facilityStatus = {
    "西门": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "东门": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "南门": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "北门": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "第一教学楼": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "第二教学楼": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "第三教学楼": { elevator: "正常", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "逸夫楼": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "计算机学院": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "经管学院": { elevator: "正常", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "设计艺术学院": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "土木工程学院": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "电气工程学院": { elevator: "正常", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "外国语学院": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "数理学院": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "化学化工学院": { elevator: "正常", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "图书馆": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "无台阶" },
    "雨母食堂": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "民族食堂": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "西苑食堂": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "东苑食堂": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "男生宿舍1栋": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "男生宿舍2栋": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "男生宿舍3栋": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "男生宿舍4栋": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "女生宿舍1栋": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "女生宿舍2栋": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "女生宿舍3栋": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "女生宿舍4栋": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "研究生宿舍": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "留学生公寓": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "体育馆": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "操场": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "无台阶" },
    "篮球场": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "无台阶" },
    "排球场": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "无台阶" },
    "网球场": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "无台阶" },
    "游泳馆": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "校医院": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "无台阶" },
    "学生活动中心": { elevator: "正常", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "快递中心": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "超市": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "咖啡厅": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" },
    "理发店": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "打印店": { elevator: "无", ramp: "正常", tactilePaving: "无", stairs: "有台阶" },
    "银行ATM": { elevator: "无", ramp: "正常", tactilePaving: "有", stairs: "有台阶" }
};

// 障碍物数据（扩展至40个）
let obstacles = [
    // 原有障碍物（1-12）
    { id: 101, lat: 26.8841, lng: 112.5079, type: "台阶", description: "一教正门三级台阶，轮椅无法通行，建议走侧门坡道", status: "未处理", reportTime: "2026-04-08", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 102, lat: 26.8855, lng: 112.5112, type: "坡道损坏", description: "体育馆门口坡道破损严重，轮椅通行困难", status: "处理中", reportTime: "2026-04-09", photo: null, claimedBy: "志愿者张三", claimTime: "2026-04-10", resolvedPhoto: null, resolvedTime: null },
    { id: 103, lat: 26.8833, lng: 112.5089, type: "施工区域", description: "二教北侧道路施工，行人需绕行", status: "未处理", reportTime: "2026-04-07", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 104, lat: 26.8867, lng: 112.5082, type: "盲道被占", description: "男生宿舍1栋门口共享单车乱停，盲道完全被占", status: "未处理", reportTime: "2026-04-10", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 105, lat: 26.8821, lng: 112.5094, type: "电梯故障", description: "女生宿舍3栋电梯已停运3天，高层住户不便", status: "处理中", reportTime: "2026-04-06", photo: null, claimedBy: "物业维修", claimTime: "2026-04-09", resolvedPhoto: null, resolvedTime: null },
    { id: 106, lat: 26.8847, lng: 112.5104, type: "台阶", description: "图书馆侧门台阶未设坡道，轮椅无法进入", status: "未处理", reportTime: "2026-04-05", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 107, lat: 26.8859, lng: 112.5090, type: "盲道被占", description: "雨母食堂门口长期被餐车占用盲道", status: "已处理", reportTime: "2026-04-01", photo: null, claimedBy: "后勤处", claimTime: "2026-04-03", resolvedPhoto: null, resolvedTime: "2026-04-04" },
    { id: 108, lat: 26.8826, lng: 112.5102, type: "坡道损坏", description: "计算机学院侧门坡道积水严重，雨天无法使用", status: "未处理", reportTime: "2026-04-09", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 109, lat: 26.8875, lng: 112.5086, type: "施工区域", description: "北门附近水管维修，行人需绕行西门", status: "处理中", reportTime: "2026-04-08", photo: null, claimedBy: "施工队", claimTime: "2026-04-09", resolvedPhoto: null, resolvedTime: null },
    { id: 110, lat: 26.8837, lng: 112.5114, type: "其他", description: "操场跑道部分区域破损，盲人跑步有安全隐患", status: "未处理", reportTime: "2026-04-07", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 111, lat: 26.8849, lng: 112.5076, type: "台阶", description: "学生活动中心门口台阶无坡道辅助", status: "未处理", reportTime: "2026-04-10", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 112, lat: 26.8862, lng: 112.5087, type: "盲道被占", description: "超市门口电动车乱停，盲道被占", status: "未处理", reportTime: "2026-04-09", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    
    // 新增障碍物（13-30）
    { id: 113, lat: 26.8850, lng: 112.5100, type: "路面破损", description: "图书馆东侧道路地砖翘起，轮椅推行困难", status: "未处理", reportTime: "2026-04-11", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 114, lat: 26.8830, lng: 112.5085, type: "台阶", description: "第二教学楼后门台阶未设扶手，视障学生通行危险", status: "未处理", reportTime: "2026-04-11", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 115, lat: 26.8870, lng: 112.5095, type: "盲道被占", description: "快递中心门口快递车长期占用盲道", status: "处理中", reportTime: "2026-04-10", photo: null, claimedBy: "快递中心管理员", claimTime: "2026-04-11", resolvedPhoto: null, resolvedTime: null },
    { id: 116, lat: 26.8816, lng: 112.5088, type: "坡道损坏", description: "设计艺术学院门口坡道防滑条脱落，雨天易滑倒", status: "未处理", reportTime: "2026-04-09", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 117, lat: 26.8856, lng: 112.5080, type: "照明故障", description: "第三教学楼至食堂路段路灯损坏，夜间通行安全隐患", status: "未处理", reportTime: "2026-04-08", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 118, lat: 26.8825, lng: 112.5110, type: "台阶", description: "操场看台入口台阶无坡道，轮椅无法上观看台", status: "未处理", reportTime: "2026-04-07", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 119, lat: 26.8869, lng: 112.5083, type: "其他", description: "男生宿舍2栋楼下下水道盖板缺失，盲人行走危险", status: "已处理", reportTime: "2026-04-05", photo: null, claimedBy: "物业维修", claimTime: "2026-04-06", resolvedPhoto: null, resolvedTime: "2026-04-07" },
    { id: 120, lat: 26.8842, lng: 112.5120, type: "坡道损坏", description: "东门入口坡道坡度太陡，轮椅下坡危险", status: "未处理", reportTime: "2026-04-10", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    
    // 更多新增障碍物（21-40）
    { id: 121, lat: 26.8872, lng: 112.5102, type: "台阶", description: "男生宿舍3栋门口台阶过高，无坡道辅助", status: "未处理", reportTime: "2026-04-12", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 122, lat: 26.8812, lng: 112.5108, type: "盲道被占", description: "女生宿舍4栋门口花盆占用盲道", status: "未处理", reportTime: "2026-04-12", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 123, lat: 26.8832, lng: 112.5122, type: "路面破损", description: "排球场旁道路坑洼，轮椅推行困难", status: "未处理", reportTime: "2026-04-11", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 124, lat: 26.8866, lng: 112.5110, type: "电梯故障", description: "留学生公寓电梯按键无盲文标识", status: "未处理", reportTime: "2026-04-10", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 125, lat: 26.8828, lng: 112.5070, type: "施工区域", description: "西苑食堂旁燃气管道施工，需绕行", status: "处理中", reportTime: "2026-04-09", photo: null, claimedBy: "燃气公司", claimTime: "2026-04-11", resolvedPhoto: null, resolvedTime: null },
    { id: 126, lat: 26.8845, lng: 112.5118, type: "坡道损坏", description: "篮球场入口坡道防滑条脱落", status: "未处理", reportTime: "2026-04-08", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 127, lat: 26.8852, lng: 112.5072, type: "照明故障", description: "逸夫楼前路灯闪烁，夜间视障学生通行困难", status: "未处理", reportTime: "2026-04-07", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 128, lat: 26.8839, lng: 112.5107, type: "盲道被占", description: "咖啡厅门口桌椅外摆占用盲道", status: "未处理", reportTime: "2026-04-06", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 129, lat: 26.8808, lng: 112.5098, type: "台阶", description: "研究生宿舍楼入口无坡道，轮椅无法进入", status: "未处理", reportTime: "2026-04-05", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 130, lat: 26.8878, lng: 112.5122, type: "其他", description: "游泳馆更衣室无障碍通道堵塞", status: "处理中", reportTime: "2026-04-04", photo: null, claimedBy: "游泳馆管理员", claimTime: "2026-04-08", resolvedPhoto: null, resolvedTime: null },
    { id: 131, lat: 26.8822, lng: 112.5078, type: "路面破损", description: "土木工程学院门前地砖松动", status: "未处理", reportTime: "2026-04-03", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 132, lat: 26.8854, lng: 112.5098, type: "盲道被占", description: "打印店门口广告牌占用盲道", status: "未处理", reportTime: "2026-04-02", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 133, lat: 26.8844, lng: 112.5088, type: "台阶", description: "经管学院侧门台阶无扶手", status: "未处理", reportTime: "2026-04-01", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 134, lat: 26.8864, lng: 112.5075, type: "坡道损坏", description: "电气工程学院坡道开裂", status: "已处理", reportTime: "2026-03-30", photo: null, claimedBy: "后勤维修", claimTime: "2026-04-02", resolvedPhoto: null, resolvedTime: "2026-04-05" },
    { id: 135, lat: 26.8836, lng: 112.5116, type: "照明故障", description: "操场夜间照明灯损坏，盲人运动不安全", status: "未处理", reportTime: "2026-03-29", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 136, lat: 26.8819, lng: 112.5115, type: "其他", description: "网球场围网破损，存在安全隐患", status: "未处理", reportTime: "2026-03-28", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 137, lat: 26.8873, lng: 112.5090, type: "盲道被占", description: "北门早餐车长期占道经营", status: "处理中", reportTime: "2026-03-27", photo: null, claimedBy: "城管", claimTime: "2026-04-01", resolvedPhoto: null, resolvedTime: null },
    { id: 138, lat: 26.8857, lng: 112.5105, type: "台阶", description: "东苑食堂入口台阶无警示色", status: "未处理", reportTime: "2026-03-26", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 139, lat: 26.8846, lng: 112.5093, type: "坡道损坏", description: "图书馆无障碍坡道扶手松动", status: "未处理", reportTime: "2026-03-25", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null },
    { id: 140, lat: 26.8867, lng: 112.5105, type: "路面破损", description: "男生宿舍4栋前道路积水严重", status: "未处理", reportTime: "2026-03-24", photo: null, claimedBy: null, claimTime: null, resolvedPhoto: null, resolvedTime: null }
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
// 详细的校园路网图（坐标已调整，节点扩展至30个）
// ==============================================
const graph = {
    nodes: {
        // 西门区域
        1: { name: "西门", lat: 26.8838, lng: 112.5064 },
        2: { name: "西门主干道-点1", lat: 26.8841, lng: 112.5072 },
        3: { name: "西门主干道-点2", lat: 26.8843, lng: 112.5079 },
        
        // 中心区域
        4: { name: "一教路口", lat: 26.8843, lng: 112.5082 },
        5: { name: "食堂路口", lat: 26.8858, lng: 112.5092 },
        6: { name: "图书馆路口", lat: 26.8845, lng: 112.5099 },
        7: { name: "二教路口", lat: 26.8831, lng: 112.5094 },
        
        // 宿舍区域
        8: { name: "男生宿舍路口", lat: 26.8865, lng: 112.5084 },
        9: { name: "女生宿舍路口", lat: 26.8823, lng: 112.5086 },
        
        // 东门区域
        10: { name: "体育馆路口", lat: 26.8853, lng: 112.5114 },
        11: { name: "东门", lat: 26.8848, lng: 112.5124 },
        
        // 操场区域
        12: { name: "操场入口", lat: 26.8838, lng: 112.5106 },
        13: { name: "操场", lat: 26.8835, lng: 112.5109 },
        
        // 补充节点
        14: { name: "图书馆北路口", lat: 26.8851, lng: 112.5094 },
        15: { name: "食堂南路口", lat: 26.8848, lng: 112.5089 },
        16: { name: "三教路口", lat: 26.8855, lng: 112.5079 },
        17: { name: "南门路口", lat: 26.8818, lng: 112.5092 },
        18: { name: "北门路口", lat: 26.8873, lng: 112.5089 },
        19: { name: "校医院路口", lat: 26.8861, lng: 112.5072 },
        20: { name: "活动中心路口", lat: 26.8851, lng: 112.5079 },
        
        // 新增节点（21-30）
        21: { name: "土木学院路口", lat: 26.8825, lng: 112.5075 },
        22: { name: "电气学院路口", lat: 26.8865, lng: 112.5078 },
        23: { name: "研究生宿舍路口", lat: 26.8805, lng: 112.5095 },
        24: { name: "留学生公寓路口", lat: 26.8875, lng: 112.5115 },
        25: { name: "游泳馆路口", lat: 26.8865, lng: 112.5120 },
        26: { name: "排球场路口", lat: 26.8830, lng: 112.5120 },
        27: { name: "网球场路口", lat: 26.8825, lng: 112.5125 },
        28: { name: "西苑食堂路口", lat: 26.8828, lng: 112.5068 },
        29: { name: "东苑食堂路口", lat: 26.8860, lng: 112.5118 },
        30: { name: "咖啡厅路口", lat: 26.8840, lng: 112.5105 }
    },
    edges: [
        // 西门到中心区
        { from: 1, to: 2, distance: 0.09, accessible: true, name: "西门路" },
        { from: 2, to: 3, distance: 0.08, accessible: true, name: "西门路" },
        { from: 3, to: 4, distance: 0.07, accessible: true, name: "主干道" },
        { from: 3, to: 15, distance: 0.10, accessible: true, name: "西门南路" },
        { from: 2, to: 28, distance: 0.11, accessible: true, name: "西苑路" },
        
        // 一教周边
        { from: 4, to: 5, distance: 0.16, accessible: true, name: "教学楼路" },
        { from: 4, to: 7, distance: 0.15, accessible: true, name: "教学楼路" },
        { from: 4, to: 9, distance: 0.22, accessible: true, name: "宿舍路" },
        { from: 4, to: 20, distance: 0.06, accessible: true, name: "活动中心路" },
        { from: 4, to: 21, distance: 0.18, accessible: true, name: "土木路" },
        
        // 食堂周边
        { from: 5, to: 6, distance: 0.13, accessible: true, name: "食堂路" },
        { from: 5, to: 8, distance: 0.10, accessible: true, name: "宿舍路" },
        { from: 5, to: 14, distance: 0.08, accessible: true, name: "食堂北路" },
        { from: 5, to: 15, distance: 0.10, accessible: true, name: "食堂南路" },
        { from: 5, to: 16, distance: 0.07, accessible: true, name: "三教路" },
        { from: 5, to: 29, distance: 0.09, accessible: true, name: "东苑路" },
        
        // 图书馆周边
        { from: 6, to: 7, distance: 0.16, accessible: true, name: "图书馆路" },
        { from: 6, to: 10, distance: 0.15, accessible: true, name: "体育馆路" },
        { from: 6, to: 12, distance: 0.09, accessible: true, name: "操场路" },
        { from: 6, to: 14, distance: 0.07, accessible: true, name: "图书馆北路" },
        { from: 6, to: 30, distance: 0.06, accessible: true, name: "咖啡厅路" },
        
        // 二教周边
        { from: 7, to: 9, distance: 0.09, accessible: true, name: "二教路" },
        { from: 7, to: 12, distance: 0.14, accessible: true, name: "操场路" },
        { from: 7, to: 17, distance: 0.12, accessible: true, name: "南门路" },
        { from: 7, to: 21, distance: 0.06, accessible: true, name: "学院路" },
        
        // 东门区域
        { from: 10, to: 11, distance: 0.16, accessible: true, name: "东门路" },
        { from: 10, to: 14, distance: 0.13, accessible: true, name: "体育馆北路" },
        { from: 10, to: 24, distance: 0.14, accessible: true, name: "留学生路" },
        { from: 10, to: 25, distance: 0.10, accessible: true, name: "游泳馆路" },
        
        // 操场区域
        { from: 12, to: 13, distance: 0.04, accessible: true, name: "操场入口路" },
        { from: 12, to: 26, distance: 0.08, accessible: true, name: "排球场路" },
        { from: 12, to: 27, distance: 0.12, accessible: true, name: "网球场路" },
        
        // 补充连接
        { from: 14, to: 15, distance: 0.08, accessible: true, name: "中心环路" },
        { from: 15, to: 7, distance: 0.17, accessible: true, name: "教学楼南路" },
        { from: 16, to: 18, distance: 0.21, accessible: true, name: "北门路" },
        { from: 16, to: 22, distance: 0.09, accessible: true, name: "电气路" },
        { from: 19, to: 16, distance: 0.09, accessible: true, name: "校医院路" },
        { from: 19, to: 3, distance: 0.13, accessible: true, name: "校医院西路" },
        { from: 20, to: 16, distance: 0.06, accessible: true, name: "活动中心北路" },
        { from: 21, to: 23, distance: 0.22, accessible: true, name: "研究生路" },
        { from: 23, to: 17, distance: 0.12, accessible: true, name: "南门支路" },
        { from: 24, to: 25, distance: 0.08, accessible: true, name: "公寓路" },
        { from: 26, to: 27, distance: 0.06, accessible: true, name: "球场路" },
        { from: 28, to: 21, distance: 0.08, accessible: true, name: "西苑支路" },
        { from: 29, to: 24, distance: 0.07, accessible: true, name: "东苑支路" },
        { from: 30, to: 14, distance: 0.06, accessible: true, name: "咖啡厅支路" }
    ]
};

// 节点名称到ID的映射（用于快速查找）
const nodeNameToId = {};
for (let id in graph.nodes) {
    nodeNameToId[graph.nodes[id].name] = parseInt(id);
}

// 通知权限状态
let notificationEnabled = false;