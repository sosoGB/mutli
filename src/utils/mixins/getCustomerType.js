/*
*获取客户类型
*/
const getCustomerType = {
  data() {
    return {
      customerTypes: []
    }
  },
  created() {
    this.getCustomerType()
  },
  methods: {
    // 获取客户类型选项
    async getCustomerType() {
      const res = await this.$request.formGet('/user/types')
      Object.keys(res.data).forEach(item=>{
        this.customerTypes.push({
          label: res.data[item],
          value: item
        })
      })
    },
  }
}

export { getCustomerType }