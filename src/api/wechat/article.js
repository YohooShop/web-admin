import request from '@/utils/request'
import qs from 'qs'
export function add(data) {
  return request({
    url: 'api/wechat/article',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/wechat/article/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/wechat/article',
    method: 'put',
    data
  })
}

export function publish(id) {
  return request({
    url: 'api/wechat/article/publish/' + id,
    method: 'get'
  })
}


export function  getList(params) {
  return request({
    url: 'api/wechat/articleList' + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}