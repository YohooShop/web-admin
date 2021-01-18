import request from '@/utils/request'

export function  getList(params){
    return request({
        url: 'api/wechat/msg/list',
        method: 'get',
        params:params
      })
}

export function  reply(data){
  return request({
      url: 'api/wechat/msg/reply',
      method: 'post',
      data:data
    })
}