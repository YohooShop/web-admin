import request from '@/utils/request'

export function add(data) {
    return request({
      url: '/api/sms',
      data,
      method: 'post'
    })
  }

  export function edit(data) {
    return request({
      url: '/api/sms',
      data,
      method: 'put'
    })
  }

  export function del(id) {
    return request({
      url: '/api/sms/'+id,
      method: 'delete'
    })
  }
  
  export function send(params) {
    return request({
      url:'api/sms/send',
      method:'post',
      params:params
    })
  }
