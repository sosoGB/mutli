<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :close-on-click-modal="closeOnClickModal">
    <!-- <div slot="title" v-if="noCloser"></div> -->
    <div class="p-content">
      <!-- <img class="clock" src="../assets/image/callSystem/wait-clock.png" alt="" srcset="" /> -->
      <p class="progress-t">{{ progressText }}</p>
      <el-progress :percentage="percentage" color="#2e008b"></el-progress>
      <p class="babble">{{ babbleText }}</p>
    </div>
  </el-dialog>
</template>
<script>
// import { Dialog } from 'element-ui'
import { mapState } from 'vuex'
export default {
  props: {
    closeOnClickModal: {
      type: Boolean,
      default: true
    }, //是否可以通过点击 modal 关闭 Dialog
    title: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String
    },
    noCloser: {
      type: Boolean,
      default: false
    }, // 是否不需要右上角关闭按钮
    progressText: {
      type: String,
      default: '加密中...'
    },
    babbleText: {
      type: String,
      default: '正在调用第三方加密系统对号码进行处理，请稍等'
    },
    progressUpdateGap: {
      type: [String, Number],
      default: 500
    }, // 进度条更新的时间间隔
    progressTimeLongMin: {
      type: [String, Number],
      default: 5000
    }, // 进度条读条最短时间 ms
    isFinished: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      percentage: 0,
      ongress: false
    }
  },
  watch: {
    dialogVisible: function (val) {
      if (!val) return
      window._mtimestamp = Date.now() //全局时间戳
      this.percentage = 0
      const percentNums = this.generateRandomNums()
      let timestamp = 0
      this.ongress = true
      let timerId = setInterval(() => {
        timestamp += this.progressUpdateGap
        if (timestamp <= this.progressTimeLongMin) {
          this.percentage = percentNums.pop()
        } else {
          if (this.isFinished) {
            this.percentage = 100
            setTimeout(() => {
              this.$emit('update:dialogVisible', false)
            }, this.progressUpdateGap)
          }
          this.ongress = false
          clearInterval(timerId)
        }
      }, this.progressUpdateGap)
    },
    isFinished: function () {
      if (!this.ongress) {
        this.percentage = 100
        setTimeout(() => {
          this.$emit('update:dialogVisible', false)
        }, this.progressUpdateGap)
      }
    },
    callBulkAddCustomerState (val) {
      if (val == 1 || val == 2 || val == 3 || val == 4) {
        this.$emit('update:dialogVisible', false)
      }
    }
  },
  methods: {
    generateRandomNums () {
      const len = Math.floor(this.progressTimeLongMin / this.progressUpdateGap)
      let percentNums = []
      for (let i = 0; i < len; i++) {
        percentNums.push(Math.ceil(Math.random() * 100))
      }
      percentNums.sort((a, b) => b - a)
      return percentNums
    },
    handleClose () {
      this.$emit('update:dialogVisible', false)
    }
  },
  computed: {
    ...mapState({
      callBulkAddCustomerState: (state) => state.callBulkAddCustomerState
    })
  }
}
</script>
<style lang="scss">
.el-dialog .el-dialog__header {
  border-bottom: 1px solid #d8d8d8;
  min-height: 40px;
}
.p-content {
  text-align: center;
  .clock {
    width: 60px;
    height: 60px;
  }
  .progress-t {
    margin-top: 20px;
    color: #2e008b;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
  }
  .babble {
    color: #585858;
    margin-top: 26px;
    font-size: 16px;
  }
  .el-progress__text {
    color: #2e008b;
  }
}
</style>
