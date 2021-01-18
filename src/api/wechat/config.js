import request from '@/utils/request'


/**公众号*/
export function addOfficeAccount(data) {
  return request({
    url: 'api/systemConfig/officialAccount',
    method: 'post',
    data
  })
}

export function getOfficeAccount() {
  return request({
    url: 'api/systemConfig/officialAccount',
    method: 'get'
  })
}


/**微信支付**/
export function getWxPay() {
  return request({
    url: 'api/systemConfig/wxpay',
    method: 'get'
  })
}

export function addWxPay(data) {
  return request({
    url: 'api/systemConfig/wxpay',
    method: 'post',
    data
  })
}

/**微信小程序**/
export function getWxApp() {
  return request({
    url: 'api/systemConfig/wxapp',
    method: 'get'
  })
}

export function addWxApp(data) {
  return request({
    url: 'api/systemConfig/wxapp',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'api/systemConfig',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/systemConfig/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/systemConfig',
    method: 'put',
    data
  })
}

export function get() {
  return request({
    url: 'api/systemConfig',
    method: 'get'
  })
}