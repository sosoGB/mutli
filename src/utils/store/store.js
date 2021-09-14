import { getItem } from '@/utils/storage'
export default {
  isMenuExpand: true, // 菜单是否展开
  userInfo: getItem('user'),
  cusListState: null, //导出客户列表的状态 loading, finish
}