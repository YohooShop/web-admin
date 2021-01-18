import {policy} from '@/api/oss'
import axios from 'axios'
export function upload(api, file) {
   return new Promise((resolve, reject) => {
        getOssToken().then(data =>{
            var getSuffix = function (fileName) {
                var pos = fileName.lastIndexOf(".");
                var suffix = '';
                if (pos != -1) {
                    suffix = fileName.substring(pos);
                }
                return suffix;
            }
            var formData = new FormData()
            var filename = new Date().getTime() + getSuffix(file.name);
            formData.append('key', data.dir + filename); //存储在oss的文件路径
            formData.append('OSSAccessKeyId', data.accessKeyId); //accessKeyId
            formData.append('policy', data.policy); //policy
            formData.append('Signature', data.signature); //签名
            formData.append("file", file);
            formData.append('success_action_status', 200); //成功后返回的操作码
            var url = data.host;
            var fileUrl = data.host +'/'+ data.dir + filename;
            axios({
                method:'post',
                url:url,
                data:formData
            }).then((response) =>{          //这里使用了ES6的语法
                // console.log(response)       //请求成功返回的数据
                // console.log(fileUrl);
                // console.log(data);
                resolve(fileUrl)
            }).catch(() => {

            })
            
        })
    }).catch(() => {

    })
    
  
}

 function getOssToken() {
    return new Promise((resolve, reject) => {
        policy().then(response => {
            resolve(response.data)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
    })
}