import request from '@/utils/request'

export function add(data) {
    return request({
      url:'/product/seckill/create',
      method:'post',
      data:data
    })
}


export function getinfo(id) {
  return request({
    url:'/product/seckill/info/'+id,
    method:'get'
  })
}

export function update(data) {
  return request({
    url:'/product/seckill/update',
    method:'post',
    data:data
  })
}

export function del(id) {
  return request({
    url:'/product/seckill/delete/' + id,
    method:'delete'
  })
}

export function list(param) {
  return request({
    url:'/product/seckill/list',
    method:'get',
    param:param
  })
}

