import request from '@/utils/request'

export function allFetchList() {
  return request({
    url:'/logistic/companyList',
    method:'get'
  })
}

export function add(data) {
  return request({
    url: 'logistic/company',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'logistic/company/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'logistic/company',
    method: 'put',
    data
  })
}

export function expressInfo(data) {
  return request({
    url: 'logistic/express',
    method: 'post',
    data
  })
}
