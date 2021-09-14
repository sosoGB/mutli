import { setItem } from '@/utils/storage'

export default {
  // 切换菜单展开/收起
  toggleMenuExpand (state, isExpand) {
    state.isMenuExpand = isExpand;
  },
  // 保存用户信息
  saveUserInfo (state, info) {
    state.userInfo = info
    setItem('user', state.userInfo)
  },
  // 保存导出客户列表的状态
  saveCusListState (state, data) {
    state.cusListState = data
  },
}