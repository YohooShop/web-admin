import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/wechat/reply',
    method: 'post',
    data:data
  })
}

export function del(params) {
  return request({
    url: 'api/wechat/reply',
    method: 'delete',
    params:params
  })
}

export function edit(data) {
  return request({
    url: 'api/wechat/reply',
    method: 'put',
    data
  })
}

export function get(id) {
  return request({
    url: 'api/wechat/reply/'+id,
    method: 'get'
  })
}

export function getList(query) {
  return request({
    url: 'api/wechat/replyList',
    method: 'get',
    params: query
  })
}