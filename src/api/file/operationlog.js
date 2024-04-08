import request from '@/utils/request'

// 查询log列表
export function listOperationlog(query) {
  return request({
    url: '/file/operationlog/list',
    method: 'get',
    params: query
  })
}

// 查询log详细
export function getOperationlog(operationLogId) {
  return request({
    url: '/file/operationlog/' + operationLogId,
    method: 'get'
  })
}

// 新增log
export function addOperationlog(data) {
  return request({
    url: '/file/operationlog',
    method: 'post',
    data: data
  })
}

// 修改log
export function updateOperationlog(data) {
  return request({
    url: '/file/operationlog',
    method: 'put',
    data: data
  })
}

// 删除log
export function delOperationlog(operationLogId) {
  return request({
    url: '/file/operationlog/' + operationLogId,
    method: 'delete'
  })
}
