//手机号码校验
export const mobileValidator = (rule, value, callback) => {
  if(/^\d{11}$/.test(value)){ 
    callback()
  }else{
    callback(new Error('请输入正确的手机号码'))
  } 
}
//邮箱格式校验
export const emailValidator = (rule, value, callback) => {
  if (value && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
    callback(new Error("邮箱格式有误"));
  } else {
    callback();
  }
}
//密码规则校验（8位以上字母加数字）
export const passwordValidator = (rule, value, callback) => {
  if (!value || /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value)) {
    callback();
  } else {
    callback(new Error("自定义密码需八位及以上数字加字母"));
  }
}