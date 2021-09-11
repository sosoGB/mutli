export default {
  //只能输入数字
  number: {
    inserted: function (el) {
      const ele = el.querySelector('input')
      ele.addEventListener('input',()=>{
        ele.value = ele.value.replace(/[^\d]/g, "")
      })
    }
  },
  // 鼠标划入效果
  slideIn: {
    inserted (el) {
      el.addEventListener('mouseenter', (event) => {
        let target = event.target;
        target.style.setProperty('--offsetx', event.offsetX);
        target.style.setProperty('--offsety', event.offsetY);
      })
      el.addEventListener('mouseleave', (event) => {
        let target = event.target;
        target.style.removeProperty('--offsetx');
        target.style.removeProperty('--offsety');
      })
    }
  },
  // 鼠标滑动效果
  slide: {
    inserted (el) {
      el.addEventListener('mousemove', (event) => {
        let target = event.target;
        target.style.setProperty('--offsetx', event.offsetX);
        target.style.setProperty('--offsety', event.offsetY);
      })
    }
  }
}