import request from '@/utils/request'


export function getL(data) {
  return request({
    url: 'store/getL',
    method: 'post',
    data
  })
}


export function add(data) {
    return request({
        url: 'store/addStore',
        method: 'post',
        data
      })
  }
  
export function edit(data) {
    return request({
        url: 'store/updateStore',
        method: 'post',
        data
      })
  }
  
export function del(ids) {
    return request({
        url: 'store',
        method: 'delete',
        data: ids
      })
  }
  
export function get(data) {
    return request({
        url: 'store/list',
        method: 'get'
      })   
   
  }
export function getAll(data) {
    return request({
        url: 'store/all',
        method: 'get'
      })   
}
export default { getL, add, edit, del, get, getAll }