import request from '@/utils/request'

export function sync() {
    return request({
      url: 'api/wechat/fans/sync',
      method: 'post',
    })
  }

export function list(params) {
    return request({
        url: 'api/wechat/fans/list',
        method: 'get',
        params:params
      })
}



export function info(openId){
    return request({
        url: 'api/wechat/fans/info/'+openId,
        method: 'get'
      })
}

export function del(params){
    return request({
        url: 'api/wechat/fans/delete',
        method: 'post',
        params:params
      })
}

export function listByIds(params){
  return request({
      url: 'api/wechat/fans/listByIds',
      method: 'post',
      params:params
    })
}