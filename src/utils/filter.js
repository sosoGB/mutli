export default {
  formatDate(date, fmt) {
    if (!date) return '-';
    // 解决IE解析字符串失败BUG
    if (typeof date === 'string'){
      let match;
      if (match = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})\.\d{3}(\+?\d{3,4})/.exec(date)) { /* eslint-disable-line */
        date = Date.parse(`${match[1].replace(/-/g, '/')} ${match[2]}${match[3].startsWith('+') ? match[3] : '+' + match[3]}`);
      } else if (~date.indexOf('-')) {
        date = Date.parse(date.replace('-', '/'));
      }
    }
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
  }
}