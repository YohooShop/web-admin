import request from '@/utils/request'
export function homeData(){
  return request({
    url: '/home/data',
    method: 'get'
  })
}
