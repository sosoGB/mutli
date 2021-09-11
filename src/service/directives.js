export default {
  //只能输入数字
  number: {
    inserted: function (el) {
      const ele = el.querySelector('input')
      ele.addEventListener('input',()=>{
        ele.value = ele.value.replace(/[^\d]/g, "")
      })
    }
  }
}