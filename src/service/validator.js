export const mobileValidator = (rule, value, callback) => {
  if(/^1[3-9]\d{9}$/.test(value)){ 
    callback()
  }else{
    callback(new Error('请输入正确的手机号码'))
  } 
}

export const emailValidator = (rule, value, callback) => {
  if (value && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
    callback(new Error("格式有误"));
  } else {
    callback();
  }
}

export const urlValidator = (rule, value, callback) => {
  const urlP = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&#=]*)?$/;
  if (urlP.test(value) == false) {
    callback(new Error("格式错误, 如：http://www.baidu.com"));
  } else {
    callback();
  }
}

export const dayValidator = (rule, value, callback) => {
  if(value && !/^\d{4}-\d{2}-\d{2}$/.test(value)){
    callback(new Error('格式错误，如：2020-01-01'))
  }else{
    callback()
  }
}