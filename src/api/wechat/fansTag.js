import request from '@/utils/request'

export function tagList() {
    return request({
        url: 'api/wechat/fansTag/list',
        method: 'get'
      })
}

export function saveTag(data) {
    return request({
        url: 'api/wechat/fansTag/save',
        method: 'post',
        data:data
      })
}

export function delTag(tagId) {
    return request({
        url: 'api/wechat/fansTag/delete/' + tagId,
        method: 'post'
    })
}

export function handleTagging(url,data) {
    return request({
        url: 'api/wechat/fansTag/'+url,
        method: 'post',
        data:data
    })
}


