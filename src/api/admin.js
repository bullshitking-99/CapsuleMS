import request from '../utils/request';
import {login, logout, register} from "./user";

export function getUser(){
  return request.get("/shopperList")
}

/**
 * params = {
  "field": "1",
  "location": "眉州东坡二层",
  "managerId": 11
  }
 */
export function addField(params){
  return request.post("/addShopperField", params)
}
// 删除某个商家用户的某个区域
export function deleteField(managerId, fieldId){
  return request.post(`/removeShopperField/${managerId}/${fieldId}`)
}
// 查看某个商家用户的全部区域：见chatroom.js中getLocation方法

export default {
  getUser, addField, deleteField
}
