import request from '@/utils/request'

// 查询文件列表
export function listUserfile(query) {
  return request({
    url: '/system/userfile/list',
    method: 'get',
    params: query
  })
}

// 查询文件详细
export function getUserfile(userFileId) {
  return request({
    url: '/system/userfile/' + userFileId,
    method: 'get'
  })
}

// 新增文件
export function addUserfile(data) {
  return request({
    url: '/system/userfile',
    method: 'post',
    data: data
  })
}

// 修改文件
export function updateUserfile(data) {
  return request({
    url: '/system/userfile',
    method: 'put',
    data: data
  })
}

// 删除文件
export function delUserfile(userFileId) {
  return request({
    url: '/system/userfile/' + userFileId,
    method: 'delete'
  })
}
