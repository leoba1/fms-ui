import request from '@/utils/request'

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/font/user/list',
    method: 'get',
    params: query
  })
}

//修改用户可用状态
export function changeUser(id){
  console.log(id);
  return request({
    url: '/font/user/change/'+id,
    method: 'get',
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/font/user/' + userId,
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/font/user',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/font/user',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: '/font/user/' + userId,
    method: 'delete'
  })
}
