import request from '@/utils/request'

export function add(data) {
    return request({
      url:'/landpages',
      method:'post',
      data:data
    })
}

export function edit(data) {
    return request({
      url:'/landpages',
      method:'put',
      data:data
    })
}

export function list() {
    return request({
      url:'/landpages/list',
      method:'get'
    })
}

export function info(id) {
  return request({
    url:'/landpages/'+id,
    method:'get'
  })
}

export function del(id) {
  return request({
    url:'/landpages/'+id,
    method:'delete'
  })
}

export function updateStatus(id,params) {
  return request({
    url:'/landpages/updateStatus/'+id,
    method:'post',
    params:params
  })
  
}