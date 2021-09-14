import { Message } from 'element-ui'
import wsClass from '@/service/websocket'
export default {
  // 获取外呼导出列表的状态，包括录音下载，通话流水下载，客户列表下载
  getExportListState (context, value) {
    context.commit(value.mutation, 'loading')
    let url = ''
    if (process.env.NODE_ENV === 'production') {
      url = location.host
    } else {
      url = location.hostname
      url = 'test.sdmanage.qibot-ai.com'
    }
    const ws = new wsClass(`wss://${url + process.env.VUE_APP_ARTIFICIAL_WS_TRANSFER}/${value.wsId}`);
    ws.onmessage(this, msg => {
      context.commit(value.mutation, 'finish')
      ws.destroy()
      const data = JSON.parse(msg)
      const now = Date.now()
      if (data.code === '1') {
        if (context.state.userInfo.encMobile) {

          if (now - window._mtimestamp < 2000) {
            setTimeout(() => {
              context.commit('saveCallBulkAddCustomerState', 1)
              Message.error(data.message)
            }, 1000)
          } else {
            context.commit('saveCallBulkAddCustomerState', 3)
            Message.error(data.message)
          }
        } else {
          Message.error(data.message)
        }
        return
      }
      if (data.code === '0' && data.isCover) {   //isCover为覆盖原有信息的标志
        // context.commit('saveCallBulkAddCustomerState',data.msg)
        // Message.success(data.msg)
        if (context.state.userInfo.encMobile) {
          if (now - window._mtimestamp < 5000) {
            setTimeout(() => {
              context.commit('saveCallBulkAddCustomerState', 2)
              Message.success(data.message)
            }, 5000 + window._mtimestamp - now)
          } else {
            context.commit('saveCallBulkAddCustomerState', 4)
            Message.success(data.message)
          }
        } else {
          Message.success(data.message)
        }
        return
      }
      if (data.fileType === 'repeatCus') {
        if (context.state.userInfo.encMobile) {
          if (now - window._mtimestamp < 5000) {
            setTimeout(() => {
              context.commit('saveCallBulkAddCustomerState', 2)
            }, 5000 + window._mtimestamp - now)
          } else {
            context.commit('saveCallBulkAddCustomerState', 4)
          }
        } else {
          Message.success(data.message)
        }
        const importInfo = {
          successNum: data.successNum,
          repeatCusNum: data.repeatCusNum,
          repeatNum: data.repeatNum,
          errorNum: data.erroeNum,
          oriFileName: data.oriFileName,
          downloadUrl: `${process.env.VUE_APP_CALL_URL}/export/download?fileName=${data.fileName}&fileType=${data.fileType}`,
          repeatData: data.repeatData
        }
        context.commit('saveImportInfo', importInfo)
        return
      }
      const a = document.createElement('a');
      a.href = `${location.origin + process.env.VUE_APP_CALL_URL}/export/download?fileName=${data.fileName}&fileType=${data.fileType}`;
      a.click()
    })
  },
}