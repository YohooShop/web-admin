import request from '@/utils/request'

export function addAddress(data) {
    return request({
      url:'/address/add',
      method:'post',
      data:data
    })
}

export function addressList(){
    return request({
        url:'/address/addressList',
        method:'get'
    })
}

export function addressDetail(params){
    return request({
        url:'/address/addressDetail',
        method:'get',
        params: params
    })
}


export function updateAddress(id,data) {
    return request({
      url:'/address/updateAddress/'+id,
      method:'post',
      data:data
    })
}

export function delAddress(id) {
    return request({
      url:'/address/delAddress/'+id,
      method:'post'
    })
}

export function defaultAddress(params) {
    return request({
      url:'/address/defaultAddress',
      method:'post',
      params:params
    })
}
