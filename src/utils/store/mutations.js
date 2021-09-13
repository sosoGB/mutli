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
  }
}