export default {
  formatDate(date, fmt) {
    if (!date) return '-';
    date = new Date(date);
    let o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  formatTel(tel) {
    var reg = /^(\d{3})\d{4}(\d{4})$/;
    return tel.replace(reg, "$1****$2");
  },
  encMobile(mobile){
    if (isNaN(mobile) || !mobile) {
        return mobile;
    }
    const length = mobile.length
    let pre = 0;
    let post = 0;
    let regex = null;
    if (length <= 4) {
      regex = new RegExp("\\d{" + length + "}");
      return mobile.replace(regex, "****")
    }else {
        let subLen = length - 4;
        if (subLen <= 1) {
            pre = 1;
        }else {
            let division = parseInt( subLen / 2)
            let model = parseInt(subLen % 2)
            pre = division;
            post = division + model;
        }
    }
    regex = new RegExp("(\\d{" + pre + "})\\d{4}(\\d{" + post + "})")
    return mobile.replace(regex, "$1****$2");
  }
}