import { getItem } from '@/utils/storage'
export default {
  isMenuExpand: true, // 菜单是否展开
  userInfo: getItem('user'),
}