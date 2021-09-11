<template>
  <div class="orderList">
    <div class="totalAccount">
      <span class="tool-label">平台账户总余额：</span>
      <span class="account">{{account}}</span>
    </div>
    <div class="toolbar">
      <div class="tool-search">
        <!-- <div class="time-search">
          <span class="tool-label">交易时间：</span>
          <ul>
            <li @click="()=>selectTime(4)" :class="{'selected':tradeDate === 4}">三个月</li>
            <li @click="()=>selectTime(1)" :class="{'selected':tradeDate === 1}">今天</li>
            <li @click="()=>selectTime(2)" :class="{'selected':tradeDate === 2}">一周</li>
            <li @click="()=>selectTime(3)" :class="{'selected':tradeDate === 3}">一个月</li>
          </ul>
        </div> -->
        <div>
          <span class="tool-label">选择日期：</span>
          <el-date-picker
            v-model="start"
            type="date"
            value-format="yyyy-MM-dd"
            :picker-options="startValidator"
            placeholder="开始时间">
          </el-date-picker>
          <span> - </span>
          <el-date-picker
            v-model="end"
            type="date"
            value-format="yyyy-MM-dd"
            :picker-options="endValidator"
            placeholder="结束时间">
          </el-date-picker>
          <el-button type="primary" style="margin-left:10px" @click="search">查询</el-button>
        </div>
      </div>
      <div>
        <el-button type="primary" @click="toQueryBalance">余额及浮存金查询</el-button>
        <el-button type="primary" @click="exportList">查询结果下载</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" border height="100%">
        <el-table-column
          align="center"
          prop="trade_no"
          width="200"
          label="交易编号">
        </el-table-column>
         <el-table-column
          align="center"
          prop="book_date"
          width="150"
          label="记账日期">
        </el-table-column>
         <el-table-column
          align="center"
          prop="customer_id"
          width="150"
          label="客户ID">
        </el-table-column>
        <el-table-column
          align="center"
          prop="customer"
          min-width="220"
          show-overflow-tooltip
          label="客户名称">
        </el-table-column>
        <el-table-column
          prop="username"
          align="center"
          width="220"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="order_content"
          align="center"
          width="180"
          label="订单内容">
        </el-table-column>
        <el-table-column
          prop="date"
          align="center"
          width="160"
          label="交易日期">
        </el-table-column>
        <el-table-column
          prop="time"
          align="center"
          width="160"
          label="交易时间">
        </el-table-column>
        <el-table-column
          prop="income"
          align="center"
          width="140"
          label="收入">
        </el-table-column>
        <el-table-column
          prop="pay"
          align="center"
          width="140"
          label="支出">
        </el-table-column>
        <el-table-column
          prop="balance"
          align="center"
          width="140"
          label="账户余额">
        </el-table-column>
        <el-table-column
          prop="type"
          align="center"
          width="140"
          label="支付类型">
        </el-table-column>
        <el-table-column
          prop="mark"
          align="center"
          show-overflow-tooltip
          min-width="220"
          label="备注">
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="getList"
        @current-change="getList"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10,15,20]"
        :page-size.sync="page.size"
        :current-page.sync="page.current"
        :total="page.total"
      ></el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="60%">
      <div class="query-block">
        <div class="query-title">客户余额查询：</div>
        <div class="btns">
          <el-date-picker
           v-model="tradeEndDate"
           type="date"
           value-format="yyyy-MM-dd"
           :picker-options="endTradeValidator"
           placeholder="请选择交易截止日期"
           class="date-pick"
           >
          </el-date-picker>
          <el-button type="primary" class="btn" @click="exportBalance">查询并导出清单</el-button>
        </div>
        <div class="query-info">
          余额查询结果：查询所有客户在所选择的【交易日期】之前最近的一笔交易流水对应的【账户余额】字段值，不管结果是不是0，均进行输出。<br />
          清单模板见附件-客户月度余额查询结果清单.xlsx
        </div>
      </div>
      <div class="query-block">
        <div class="query-title">客户浮存金查询：</div>
        <div class="btns">
          <el-date-picker
           v-model="bookEndDate"
           type="date"
           value-format="yyyy-MM-dd"
           :picker-options="endBookValidator"
           placeholder="请选择记账截止日期"
           class="date-pick">
          </el-date-picker>
          <el-button type="primary" class="btn" @click="exportFloat">查询并导出清单</el-button>
        </div>
        <div class="query-info">
          浮存金查询结果：查询所有客户在所选择的【记账日期】之前所有的历史收入减去历史支出的差额，若差额不为0，则进行输出，若差额为0，则忽略。<br />
          清单模板见附件-客户月度浮存金查询结果清单.xlsx
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import filter from '../../utils/filter'
export default {
  data() {
    return {
      account: null,   //平台账户总余额
      tradeDate: null,   //交易时间： 1-今天 2-一周 3-一月 4-三月
      start: null,
      end: null,
      tableData: [],
      page: {
        size: 10,
        current: 1,
        total: 0
      },
      startValidator: {
        disabledDate: current => (this.end && filter.formatDate(current, 'yyyy-MM-dd') > this.end) || Date.now() < current 
      },
      endValidator: {
        disabledDate: current => (this.start && filter.formatDate(current, 'yyyy-MM-dd') < this.start) || Date.now() < current
      },
      endTradeValidator: {
        disabledDate: current => Date.now() < current
      },
      endBookValidator: {
        disabledDate: current => Date.now() < current
      },
      dialogVisible: false,
      tradeEndDate: '',
      bookEndDate: '',
      
    }
  },
  created() {
    this.getAccount()
    this.getList()
  },
  methods: {
    // 获取平台账户总余额
    async getAccount() {
      const res = await this.$request.formGet('/yee/totalBalance')
      if(res.code === 0){
        this.account = res.data.totalBalance
      }else{
        this.$message.error(res.msg)
      }
    },
    // 点击查询
    search() {
      if(!this.start || !this.end){
        this.$message.error('请输入起始时间')
        return
      }
      if (new Date(this.end) - new Date(this.start) > 6 * 30 * 24 * 3600 * 1000) {
        this.$message.error('日期跨度不得超过6个月');
        return;
      }
      this.tradeDate = ''
      this.page.current = 1
      this.getList()
    },
    // 获取列表
    async getList() {
      const res = await this.$request.formGet('/yee/trade', {
        page: this.page.current,
        pageSize: this.page.size,
        start: this.start,
        end: this.end,
        tradeDate: this.tradeDate
      })
      this.tableData = res.data.list
      this.page.total = res.data.count
    },
    // 查询结果下载 
    async exportList() {
      if (new Date(this.end) - new Date(this.start) > 6 * 30 * 24 * 3600 * 1000) {
        this.$message.error('日期跨度不得超过6个月');
        return;
      }
      const res = await this.$request.instance('/yee/exportTrade', {
        start: this.start,
        end: this.end,
        tradeDate: this.tradeDate
      })
      const a = document.createElement("a");
      a.download = '交易统计查询结果.xls';
      a.href = URL.createObjectURL(res);
      a.click();
    },
    // 根据选择周期切换选中类
    selectTime(val) {
      this.tradeDate = val
      this.start = null
      this.end = null
      this.getList()
    },
    // 点击查询余额、浮存金
    toQueryBalance () {
      this.dialogVisible = true
    },
    //点击导出余额
    async exportBalance () {
      if(!this.tradeEndDate) {
        this.$message.warning('请选择交易截止日期')
        return
      }
      this.$confirm('确认查询并导出所选截止日期的客户账户余额清单？').then(async ()=>{
        const res = await this.$request.instance('/yee/exportBalance',{ end: this.tradeEndDate})
        const a = document.createElement("a");
        a.download = '客户月度余额查询结果清单.xls';
        a.href = URL.createObjectURL(res);
        a.click();
        this.$message.warning('正在下载中，无需重复提交')
      })
    },
    // 导出浮存金
    async exportFloat () {
      if (!this.bookEndDate) {
        this.$message.warning('请选择记账截止日期')
        return
      }
      this.$confirm('确认查询并导出所选截止日期的客户浮存金清单？').then(async ()=>{
        const res = await this.$request.instance('/yee/exportFloat',{ end: this.bookEndDate})
        const a = document.createElement("a");
        a.download = '客户月度浮存金查询结果清单.xls';
        a.href = URL.createObjectURL(res);
        a.click();
        this.$message.warning('正在下载中，无需重复提交')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.orderList{
  height: 100%;
  display: flex;
  flex-direction: column;
  .totalAccount{
    margin-left: 30px;
    margin-top: 30px;
    .account{
      font-size: 22px;
      color: $themeColor;
      margin-left: 20px;
    }
  }
  .table{
    flex: 1;
    /deep/.el-table{
      thead{
        color: #333;
        th{
          background: #fafafa;
          .cell{
          font-weight: 700;
        }
        }
      }
    }
  }
  .nav{
    font-size: 14px;
    margin-bottom: 10px;
    .nav-1{
      color: #999999;
      margin-right: 3px;
    }
    .nav-2{
      color: #666666;
      margin-left: 3px;
    }
  }
  .toolbar{
    display: flex;
    justify-content: space-between;
    margin: 30px;
    .tool-search{
      display: flex;
      .time-search{
        display: flex;
        align-items: center;
      }
      ul{
        display: flex;
        margin-right: 20px;
        li{
          text-align: center;
          width: 84px;
          color:  $themeColor;
          border: 1px solid $themeColor;
          border-radius: 4px;
          padding: 8px 16px;
          margin-right: 10px;
          cursor: pointer;
          &.selected{
            background: $themeColor;
            color: white;
          }
        }
      }
    }
    .tool-label{
      margin-right: 5px;
    }
    .el-input{
      width: 160px;
    }
  }
  .pagination{
    margin: 30px;
    display: flex;
    flex-direction: row-reverse;
  }
  .query-block {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 40px;
    align-items: center;
    .query-title {
      font-size: 18px;
      font-weight: 700;
      width: 200px;
      padding-left: 20px;
    }
    .btns { 
      width: 500px;
      flex: 1;
      .date-pick {
        display: inline-block;
        width: 200px;
      }
      .btn {
        margin-left: 10px;
        display: inline-block;
      }
    }
    .query-info {
      flex: 1;
    }
  }
}
</style>