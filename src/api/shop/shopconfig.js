import request from '@/utils/request'


export function save(data) {
    return request({
      url:'/shopconfig',
      method:'post',
      data:data
    })
}



export function get() {
    return request({
      url:'/shopconfig',
      method:'get'
    })
}