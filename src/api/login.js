import request from '@/utils/request'

export function login(username, password,code,uuid) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}

export function getCode(uuid) {
  return request({
    url: '/admin/code/'+uuid,
    method: 'get',
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}
export function updateInfo(data) {
  return request({
    url: '/admin/update/info',
    method: 'post',
    data: data
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
