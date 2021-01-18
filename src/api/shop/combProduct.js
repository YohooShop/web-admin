import request from '@/utils/request'

export function add(data) {
    return request({
      url:'/product/comb/create',
      method:'post',
      data:data
    })
}


export function getinfo(id) {
  return request({
    url:'/product/comb/info/'+id,
    method:'get'
  })
}

export function update(data) {
  return request({
    url:'/product/comb/update',
    method:'post',
    data:data
  })
}

export function del(id) {
  return request({
    url:'/product/comb/delete/' + id,
    method:'delete'
  })
}

export function list(param) {
  return request({
    url:'/product/comb/list',
    method:'get',
    param:param
  })
}

export function onsale (id, param){
  return request({
    url:'/product/comb/updateStatus/' + id,
    method:'post',
    params:param
  })
}

