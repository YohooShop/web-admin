import request from '@/utils/request'
export function fetchListAll() {
  return request({
    url:'/subject/listAll',
    method:'get',
  })
}

export function fetchList(params) {
  return request({
    url:'/subject/list',
    method:'get',
    params:params
  })
}

export function updateSubjectShowStatus(params){
  return request({
    url:'/subject/update/showStatus',
    method:'post',
    params:params
  })
}
export function updateSubjectCateShowStatus(params){
  return request({
    url:'/subject/cate/update/showStatus',
    method:'post',
    params:params
  })
}
export function updateSubjectCateSort(params){
  return request({
    url:'/subject/cate/updateSort',
    method:'post',
    params:params
  })
}
export function subjectDetail(id) {
  return request({
    url:'/subject/subjectDetail/'+id,
    method:'get'
  })
}



export function addSubject(data){
  return request({
    url:'/subject/addSubject',
    method:'post',
    data:data
  })
}

export function updateSubject(id, data) {
  return request({
    url:'/subject/updateSubject/' + id,
    method:'post',
    data:data
  })
}

export function subCateList(){
  return request({
    url:'/subject/cateList',
    method:'get',
  })
}

export function addCate(data){
  return request({
    url:'/subject/addCate',
    method:'post',
    data:data
  })
}

export function updateCate(data,id){
  return request({
    url:'/subject/updateCate/'+id,
    method:'post',
    data:data
  })
}

export function getCateDetail(params){
  return request({
    url:'/subject/cateDetail',
    method:'post',
    params:params
  })
}
