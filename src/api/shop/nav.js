import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/home/nav/list',
    method:'get',
    params:params
  })
}
export function updateStatus(id,params) {
  return request({
    url:'/home/nav/update/status/'+id,
    method:'post',
    params:params
  })
}
export function del(params) {
  return request({
    url:'/home/nav/delete',
    method:'post',
    params:params
  })
}
export function add(data) {
  return request({
    url:'/home/nav/create',
    method:'post',
    data:data
  })
}
export function getHomeAdvertise(id) {
  return request({
    url:'/home/nav/'+id,
    method:'get',
  })
}

export function edit(id,data) {
  return request({
    url:'/home/nav/update/'+id,
    method:'post',
    data:data
  })
}
