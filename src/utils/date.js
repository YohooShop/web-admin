// date.js
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

export function str2Date(dateStr, separator) {
  if (!separator) {
    separator = "-";
  }
  let dateArr = dateStr.split(separator);
  let year = parseInt(dateArr[0]);
  let month;
  //处理月份为04这样的情况
  if (dateArr[1].indexOf("0") == 0) {
    month = parseInt(dateArr[1].substring(1));
  } else {
    month = parseInt(dateArr[1]);
  }
  let day = parseInt(dateArr[2]);
  let date = new Date(year, month - 1, day);
  return date;
}


 export function getSeconds(s) {
  var sTime = parseInt(s);// 秒
  var mTime = 0;// 分
  var hTime = 0;// 时
  if(sTime > 60) {//如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      mTime = parseInt(sTime / 60);
      //获取秒数，秒数取佘，得到整数秒数
      sTime = parseInt(sTime % 60);
      //如果分钟大于60，将分钟转换成小时
      if(mTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hTime = parseInt(mTime / 60);
          //获取小时后取佘的分，获取分钟除以60取佘的分
          mTime = parseInt(mTime % 60);
      }
  }
    var result = '';
    if(sTime >=0 && sTime < 10){
      result = "0" + parseInt(sTime) + "";
    }else{
        result = "" + parseInt(sTime) + "";
    }
  if(mTime >= 0 && mTime < 10) {
    result = "0" + parseInt(mTime) + ":" + result;
  }else{
        result = "" + parseInt(mTime) + ":" + result;
    }
  if(hTime >= 0 && hTime < 10) {
    result = "0" + parseInt(hTime) + ":" + result;
  }else{
        result = "" + parseInt(hTime) + ":" + result;
    }
  return result;
  }