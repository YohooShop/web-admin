import request from '@/utils/request'

export function set(data){
    return request({
        url:'/store/setconfig',
        method:'post',
        data:data
      })
}


export function get(){
    return request({
        url:'/store/getconfig',
        method:'get',
      })
}