<template>
  <div>
    <el-select v-bind="$props" :style="{ width: width + 'px' }" @change="changeEmit" v-model="selectList" collapse-tags multiple :popper-class="popperClass" :popper-append-to-body="false" @visible-change="visibleChange">
      <div style="display:flex;justify-content:space-between;">
        <div @click="toggleSelectAll" class="el-select-dropdown__item" :class="{
            selected: isAllSelcted
          }">
          全选
        </div>
        <div style="color: #999;height:34px; line-height:34px;float:right;margin-right:20px;">
          已选中{{ selectList.length }}条
        </div>
      </div>
      <div class="mask-outer" ref="maskOuter" style="position:relative;" @mousedown="mouseDown" @mousemove="throttledMove" @mouseup="mouseup" @mouseleave="mouseleave">
        <el-row>
          <el-col :span="8" v-for="item in options" :key="item.id">
            <el-tooltip class="item" effect="dark" :content="item[labelField]" placement="top">
              <el-option :label="item[labelField]" :value="item.id" :key="item.id" :disabled="item.disabled" :id="'op' + item.id" class="no-high" style="min-width:100px;">
              </el-option>
            </el-tooltip>
          </el-col>
        </el-row>
        <div id="moveSelected" ref="move" style="position:absolute; background-color: blue;
      opacity:0.3;top:0;left:0;width:0px;height:0px;"></div>
      </div>
    </el-select>
  </div>
</template>
<script>
// v2版本加上立即执行
const throttle = function (fn, wait = 100) {
  let cur = Date.now(),
    isFirst = true
  return function () {
    let now = Date.now(),
      context = this
    let interval = now - cur
    if (interval > wait && !isFirst) {
      cur = now
      this[fn].apply(context, arguments)
    }
    isFirst = false
  }
}
export default {
  model: {
    prop: 'selections',
    event: 'change'
  },
  props: {
    // 下拉列表数据
    options: {
      type: Array,
      required: true
    },
    width: {
      type: [String, Number],
      default: 400
    },
    labelField: {
      type: String,
      required: true
    },
    selections: Array,
    popperClass: String
  },
  data () {
    return {
      moveFlag: false,
      mouseLeft: 0,
      mouseTop: 0,
      selectList: this.selections || []
    }
  },
  watch: {
    selections (val) {
      this.selectList = val
    }
  },
  computed: {
    isAllSelcted: function () {
      let filters = this.options.filter((e) => !e.disabled) || []
      return this.selectList && this.selectList.length
        ? this.selectList.length === filters.length
        : false
    }
  },
  methods: {
    visibleChange (isShow) {
      this.$emit('visibleChange', isShow)
    },
    changeEmit (val) {
      this.$emit('change', val)
    },
    getPosition (e) {
      let top
      let left
      if (e.target.tagName == 'SPAN') {
        top = e.target.offsetParent.offsetTop
        left = e.target.offsetParent.offsetLeft
      } else if (e.target.tagName == 'LI') {
        top = e.target.offsetTop
        left = e.target.offsetLeft
      } else if (e.target.id === 'moveSelected') {
        left = e.target.offsetLeft + e.offsetX
        top = e.target.offsetTop + e.offsetY
      }
      //   if (e.target.id === 'moveSelected') {
      // if (e.target.offsetWidth - e.offsetX > width) {
      //   left = e.target.offsetLeft + e.target.offsetWidth - 2 * width
      // } else {
      //   left = e.target.offsetLeft + e.target.offsetWidth - width
      // }
      // if (e.target.offsetHeight - e.offsetY > height) {
      //   top = e.target.offsetTop + e.target.offsetHeight - 2 * height
      // } else {
      //   top = e.target.offsetTop + e.target.offsetHeight - height
      // }
      //   }
      // let width = this.$el.querySelector('.no-high').offsetWidth
      // let height = this.$el.querySelector('.no-high').offsetHeight
      let width = this.$refs.maskOuter.querySelector('.no-high').offsetWidth
      let height = this.$refs.maskOuter.querySelector('.no-high').offsetHeight
      return { top, left, width, height }
    },
    debounce (fn, wait, immediate = false) {
      let timer = null,
        starttimestamp = 0,
        args = null,
        context = null
      function run (wait, immediate) {
        timer = setTimeout(() => {
          let now = Date.now()
          let interval = now - starttimestamp
          if (interval < wait) {
            starttimestamp = now
            run(wait - interval, immediate)
          } else {
            fn.method.apply(context, args)
            clearTimeout(timer)
            timer = null
          }
        }, wait)
      }
      return function () {
        starttimestamp = Date.now()
        args = arguments
        context = this
        if (!timer) {
          if (immediate) {
            fn.apply(context, args)
          }
          run(wait, immediate)
        }
      }
    },

    mouseDown (e) {
      this.moveFlag = true
      const { left, top } = this.getPosition(e)
      //   this.$refs.move.style.top = top + 'px'
      //   this.$refs.move.style.left = left + 'px'
      //   this.$refs.move.style.width = width + 'px'
      //   this.$refs.move.style.height = height + 'px'
      this.mouseLeft = left
      this.mouseTop = top
    },
    throttledMove: throttle('mousemove'),
    mousemove (e) {
      const { top, left, width, height } = this.getPosition(e)
      if (
        this.moveFlag &&
        (Math.abs(left - this.mouseLeft) >= width ||
          Math.abs(top - this.mouseTop) >= height)
      ) {
        if (e.target.id == 'moveSelected') {
          // 往左拖动又往右
          if (e.offsetX > width && e.target.offsetLeft < this.mouseLeft) {
            this.$refs.move.style.left = e.target.offsetLeft + width + 'px'
            this.$refs.move.style.width = e.target.offsetWidth - width + 'px'
          }
          // 往右拖动又往左
          if (
            e.offsetX < e.target.offsetWidth - width &&
            e.target.offsetLeft >= this.mouseLeft
          ) {
            this.$refs.move.style.width =
              this.$refs.move.offsetWidth - width + 'px'
          }
          // 往上拖动后又往下
          if (e.offsetY > height && e.target.offsetTop < this.mouseTop) {
            this.$refs.move.style.top = e.target.offsetTop + height + 'px'
            this.$refs.move.style.height =
              this.$refs.move.offsetHeight - height + 'px'
          }
          // 往下拖动又往上
          if (
            e.offsetY < e.target.offsetHeight - height &&
            e.target.offsetTop >= this.mouseTop
          ) {
            this.$refs.move.style.height =
              this.$refs.move.offsetHeight - height + 'px'
          }
        } else {
          if (left < this.mouseLeft) {
            this.$refs.move.style.left = left + 'px'
          } else {
            this.$refs.move.style.left = this.mouseLeft + 'px'
          }
          if (top < this.mouseTop) {
            this.$refs.move.style.top = top + 'px'
          } else {
            this.$refs.move.style.top = this.mouseTop + 'px'
          }
          this.$refs.move.style.width =
            Math.abs(left - this.mouseLeft) + width + 'px'
          this.$refs.move.style.height =
            Math.abs(top - this.mouseTop) + height + 'px'
        }
      }

      //   if (
      //     top >
      //     this.$el.querySelector('.el-select-dropdown__wrap').offsetHeight - 90
      //   ) {
      //     this.$el
      //       .querySelector('.el-select-dropdown__wrap')
      //       .scrollTo(
      //         0,
      //         top -
      //           this.$el.querySelector('.el-select-dropdown__wrap').offsetHeight +
      //           90
      //       )
      //   }
    },
    mouseup () {
      this.moveFlag = false
      //   this.$refs.move.style.bottom = Number()
      this.$refs.move.style.bottom =
        Number(this.$refs.move.style.top.split('px')[0]) +
        this.$refs.move.offsetHeight +
        'px'
      this.$refs.move.style.right =
        Number(this.$refs.move.style.left.split('px')[0]) +
        this.$refs.move.offsetWidth +
        'px'
      // const { top, left, width, height } = this.getPosition(e)

      this.findSelected()
      this.changeEmit(this.selectList)
      //   this.findSelected()
      this.clearMoveDom()
      //   e.preventDefault() // 阻止默认行为
      //   e.stopPropagation() // 阻止事件冒泡
    },
    mouseleave () {
      this.moveFlag = false
      this.clearMoveDom()
    },
    toggleSelectAll () {
      if (this.isAllSelcted) {
        this.selectList = []
      } else {
        let filters = this.options.filter((e) => !e.disabled) || []
        this.selectList = filters.map((e) => e.id)
      }
      this.changeEmit(this.selectList)
    },
    offset (obj, direction) {
      //将top,left首字母大写,并拼接成offsetTop,offsetLeft
      var offsetDir =
        'offset' + direction[0].toUpperCase() + direction.substring(1)
      // var scrollDir =
      //   'scroll' + direction[0].toUpperCase() + direction.substring(1)
      var realNum = obj[offsetDir]
      //   var positionParent = obj.offsetParent //获取上一级定位元素对象

      //   while (positionParent != null) {
      //     realNum += positionParent[offsetDir]
      //     positionParent = positionParent.offsetParent
      //   }
      return realNum
    },
    findSelected () {
      this.options.forEach((e) => {
        const el = this.$refs.maskOuter.querySelector('#op' + e.id)
        // 获取每个option的位置
        const left = this.offset(el, 'left')
        const right = left + el.offsetWidth
        const top = this.offset(el, 'top')
        const bottom = top + el.offsetHeight
        // 判断是否在区域内
        const block = this.$refs.move
        // const leftFlag =
        //   block.style.left.split('px')[0] <= left &&
        //   left <= block.style.right.split('px')[0]
        // const rightFlag =
        //   block.style.left.split('px')[0] <= right &&
        //   right <= block.style.right.split('px')[0]
        // const topFlag =
        //   block.style.top.split('px')[0] <= top &&
        //   top <= block.style.bottom.split('px')[0]
        // const bottomFlag =
        //   block.style.top.split('px')[0] <= bottom &&
        //   bottom <= block.style.bottom.split('px')[0]
        // if ((leftFlag || rightFlag) && (topFlag || bottomFlag)) {
        //   !this.selections.includes(e.id) && this.selections.push(e.id)
        // }
        // const horizonFlag =
        //   parseInt(block.style.right) > left &&
        //   parseInt(block.style.left) < right
        // const verticalFlag =
        //   parseInt(block.style.bottom) > top &&
        //   parseInt(block.style.top) < bottom
        // if (horizonFlag && verticalFlag) {
        //   !this.selections.includes(e.id) && this.selections.push(e.id)
        // }
        const horizonFlag =
          parseInt(block.style.left) + block.offsetWidth > left &&
          parseInt(block.style.left) < right
        const verticalFlag =
          parseInt(block.style.top) + block.offsetHeight > top &&
          parseInt(block.style.top) < bottom
        if (horizonFlag && verticalFlag) {
          !this.selectList.includes(e.id) &&
            !e.disabled &&
            this.selectList.push(e.id)
        }
      })
    },
    clearMoveDom () {
      this.$refs.move.style.width = 0
      this.$refs.move.style.height = 0
      this.$refs.move.style.top = 0
      this.$refs.move.style.left = 0
      this.$refs.move.style.bottom = 0
      this.$refs.move.style.right = 0
    }
  }
}
</script>
<style lang="scss" scoped>
.no-high.el-select-dropdown__item {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  // padding: 0 6px;
}
.el-select {
  /deep/ .el-scrollbar {
    padding: 20px;
  }
  /deep/ .el-scrollbar__bar {
    display: none;
  }
  /deep/
    .el-select-dropdown.is-multiple
    .el-select-dropdown__item.selected::after {
    right: 6px;
  }
}

.selectmulti {
  position: absolute;
}
</style>
