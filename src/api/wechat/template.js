import request from '@/utils/request'
export function add(data) {
    return request({
        url: 'api/wechat/template',
        method: 'post',
        data:data
      })
}

export function edit(data) {
    return request({
        url: 'api/wechat/template',
        method: 'put',
        data
      })
}

export function getList(query) {
    return request({
      url: 'api/wechat/template',
      method: 'get',
      params: query
    })
}

export function del(id) {
    return request({
      url: 'api/wechat/template/'+id,
      method: 'delete',
      params:params
    })
}