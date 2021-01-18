import request from '@/utils/request'

export function resetEmail(data) {
    return request({
      url: '/api/code/resetEmail',
      method: 'post',
      data:data
    })
  }
  
export function updateEmail(data) {
    
    return request({
      url: '/admin/updateEmail',
      method: 'post',
      data:data
    })
}
