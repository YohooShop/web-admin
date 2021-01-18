import request from '@/utils/request'

export function updateMinePassword(data) {
    return request({
      url: '/admin/updateMinePassword',
      method: 'post',
      data:data
    })
  }

