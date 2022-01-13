import request from "../utils/request";
export function addClassRooms(params) {
  return request.post("/addClassRooms", params);
}
export function addChatRoom(params) {
  return request.post("/newAddChatRoom", params);
}
export function deleteChatRoom(id) {
  return request.post("/newDeleteRoom/" + id);
}

export function updateChatRoom(params) {
  return request.post("/newModifyChatRoom", params);
}

export function search(userId) {
  return request.get("/viewMyRoom/" + userId);
}

export function getSubRoom(pid) {
  return request.post("/newGetSubRoom/" + pid);
}

export function getAllLocation() {
  return request.get("/newViewAllLocation");
}

export function getLocation(userId) {
  return request.get("/getShopperField/" + userId);
}

// 获取某日聊天室每小时人数变化,返回列表
export function getUserCount(roomId, date) {
  return request.post("/userCountSomeday/" + roomId + "/" + date);
}
// 获取roomId聊天室当前人数
export function getUserCountReal(roomId) {
  return request.post("/userCountRealtime/" + roomId);
}
export default {
  addClassRooms,
  addChatRoom,
  deleteChatRoom,
  updateChatRoom,
  search,
  getLocation,
  getAllLocation,
  getSubRoom,
  getUserCount,
  getUserCountReal,
};
