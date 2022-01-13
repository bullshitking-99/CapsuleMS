import request from '../utils/request';
export function login(params){
  return request.post('/newLogin', params);
}
export function logout() {
  return request.post('/user/logout')
}

export function register(params) {
  return request.post('/user/register', params);
}

export default {
  login, logout,register
}
