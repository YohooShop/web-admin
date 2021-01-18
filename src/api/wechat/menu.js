import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/wechat/menu',
    method: 'post',
    data
  })
}

export function del(key) {
  return request({
    url: 'api/wechat/menu' + key,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/wechat/menu',
    method: 'put',
    data
  })
}

export function get() {
  return request({
    url: 'api/wechat/menu',
    method: 'get'
  })
}

export function synchronize(){
  return request({
    url: 'api/wechat/menu/synchronize',
    method: 'get'
  })
 
}