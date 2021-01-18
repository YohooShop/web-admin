import request from '@/utils/request'

export function get() {
    return request({
      url: 'api/aliyunOssContent/config',
      method: 'get'
    })
}

export function update(data) {
    return request({
      url: 'api/aliyunOssContent/config',
      data,
      method: 'put'
    })
}

export function download(id) {
  return request({
    url: 'api/aliyunOssContent/download/' + id,
    method: 'get'
  })
}

export function sync() {
  return request({
    url: 'api/aliyunOssContent/synchronize',
    method: 'post'
  })
}

export function del(ids) {
  return request({
    url: 'api/aliyunOssContent',
    method: 'delete',
    data: ids
  })
}


export default { del, download, sync }
