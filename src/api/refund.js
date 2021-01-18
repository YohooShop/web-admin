import request from '@/utils/request'
export function getRefundDetail(id) {
    return request({
        url:'/orderRefund/detail/'+id,
        method:'get'
      })
}
export function updateStatus(id, params){
  return request({
    url:'/orderRefund/update/status/'+id,
    method:'post',
    params:params
  })
}
