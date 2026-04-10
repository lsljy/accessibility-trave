// ==============================================
// 南华大学雨母校区 - 地点数据（全局变量，单独维护）
// ==============================================
const campusLocations = [
  { id: 1, name: "西门", lat: 26.9018, lng: 112.6395, accessible: true },
  { id: 2, name: "东门", lat: 26.9002, lng: 112.6451, accessible: true },
  { id: 3, name: "第一教学楼", lat: 26.9007, lng: 112.6412, accessible: true },
  { id: 4, name: "第二教学楼", lat: 26.8995, lng: 112.6420, accessible: true },
  { id: 5, name: "图书馆", lat: 26.9000, lng: 112.6430, accessible: true },
  { id: 6, name: "食堂一楼", lat: 26.9012, lng: 112.6425, accessible: true },
  { id: 7, name: "男生宿舍1栋", lat: 26.9020, lng: 112.6418, accessible: true },
  { id: 8, name: "女生宿舍3栋", lat: 26.8990, lng: 112.6415, accessible: true },
  { id: 9, name: "体育馆", lat: 26.9015, lng: 112.6440, accessible: false },
  { id: 10, name: "雨母校区操场", lat: 26.8988, lng: 112.6435, accessible: true }
];

// ==============================================
// 南华大学雨母校区 - 道路路网（全局变量，真实可通行路径）
// ==============================================
const campusRoadNetwork = {
  nodes: [
    { id: "S1", name: "西门入口", lat: 26.9018, lng: 112.6395 },
    { id: "S2", name: "西门主干道", lat: 26.9012, lng: 112.6405 },
    { id: "S3", name: "食堂路口", lat: 26.9012, lng: 112.6425 },
    { id: "S4", name: "一教路口", lat: 26.9007, lng: 112.6412 },
    { id: "S5", name: "图书馆路口", lat: 26.9000, lng: 112.6430 },
    { id: "S6", name: "二教路口", lat: 26.8995, lng: 112.6420 },
    { id: "S7", name: "宿舍区路口", lat: 26.9020, lng: 112.6418 },
    { id: "S8", name: "东门入口", lat: 26.9002, lng: 112.6451 }
  ],
  edges: [
    ["S1", "S2"], ["S2", "S3"], ["S2", "S4"], ["S3", "S5"],
    ["S4", "S6"], ["S5", "S6"], ["S3", "S7"], ["S5", "S8"]
  ]
};