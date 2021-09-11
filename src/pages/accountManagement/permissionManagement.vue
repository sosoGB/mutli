<template>
  <div class="permissionManagement formPage">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main/accountManagement' }">账户权益</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/main/accountManagement/accountList' }">账户管理</el-breadcrumb-item>
        <el-breadcrumb-item>权益管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form class="form" :model="info" ref="infoForm" :rules="rules" hide-required-asterisk>
      <div class="section">
        <div class="title">账户信息</div>
        <el-divider></el-divider>
        <div class="accountInfo">
          <div>
            <span class="labelName">客户名称：</span>
            <span>{{info.name}}</span>
          </div>
          <div>
            <span class="labelName">手机号：</span>
            <span>{{info.mobile}}</span>
          </div>
          <div>
            <span class="labelName">客户类型：</span>
            <span>{{info.typeText}}</span>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="title">文本机器人权益</div>
        <el-divider></el-divider>
        <div class="textRobot">
          <el-form-item label="文本机器人流量：" prop="yearBalance">
            <el-input v-number v-model="info.yearBalance"></el-input>
            <span>&nbsp;条</span>
          </el-form-item>
          <el-form-item label="产品个数（产品License）：" prop="productNum">
            <el-input v-number v-model="info.productNum"></el-input>
            <span>&nbsp;个</span>
          </el-form-item>
          <el-form-item label="公司服务咨询个数（平台License）：" prop="companyServiceNum">
            <el-input v-number v-model="info.companyServiceNum"></el-input>
            <span>&nbsp;个</span>
          </el-form-item>
          <el-form-item label="任务机器人个数（多轮任务License）：" prop="taskRobotNum">
            <el-input v-number v-model="info.taskRobotNum"></el-input>
            <span>&nbsp;个</span>
          </el-form-item>
          <el-form-item  label="文本坐席辅助License：" prop="textSeatNum">
            <el-input v-number v-model="info.textSeatNum"></el-input>
            <span>&nbsp;个</span>
          </el-form-item>
          <el-form-item  label="机器人个数（机器人License）：" prop="robotNum">
            <el-input v-number v-model="info.robotNum"></el-input>
            <span>&nbsp;个</span>
          </el-form-item>
        </div>
      </div>
      <div class="section">
        <div class="title" style="display:inline-block; margin-right:20px">语音机器人权益</div>
        <el-button type="primary" size="mini" @click="dialogVisible = true">增加线路</el-button>
        <el-divider></el-divider>
        <div class="voiceRobot">
          <div class="item item_lines">
            <span class="labelName">企保线路：</span>
            <div class="item-content">
              <div class="item-group" v-for="(list, key) in info.qbLine" :key="key">
                <span class="labelName">{{key == '1' ? '机器人线路：' : '人工线路：'}}</span>
                <div class="item-tags">
                  <el-tag class="line" v-for="(line, index) in list" :key="index" :closable="!line.isOld" @close="deleteLine(3, key)">
                    {{line.name+'-'+(index+1)}}
                  </el-tag>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <span class="labelName">网关线路：</span>
            <el-tag class="line" v-for="(line, index) in info.gatewayLine" :key="index" :closable="!line.isOld" @close="deleteLine(1)">
              {{line.name+'-'+(index+1)}}
            </el-tag>
          </div>
          <div class="item">
            <span class="labelName">运营商线路：</span>
            <el-tag class="line" v-for="(line, index) in info.relayLine" :key="index" :closable="!line.isOld" @close="deleteLine(2)">
              {{line.name+'-'+(index+1)}}
            </el-tag>
          </div>
          <div class="item">
            <el-form-item  label="语音时长：" prop="callTime">
              <el-input v-number v-model="info.callTime"></el-input>
              <span>&nbsp;分钟</span>
              <span class="tip">温馨提示：语音时长仅对企保科技线路生效，网关线路和运营商线路为客户自有资源，不走企保计费。</span>
            </el-form-item>
          </div>
          <div class="item">
            <span class="labelName">业务场景：</span>
            <el-select multiple v-model="info.scenes" @remove-tag="scenseChange">
              <el-option 
                v-for="item in scenesOptions" 
                :key="item.code" 
                :label="item.name" 
                :value="item.code">
              </el-option>
            </el-select>
          </div>
          <div class="item" v-show="info.scenes.includes(item.code)" v-for="item in scenesOptions" :key="item.code">
            <span class="labelName">{{item.name}}-话术模板</span>
            <el-select multiple v-model="item.template" class="speechTemlate">
              <el-option v-for="temp in item.child" :key="temp.code" :label="temp.name" :value="temp.code"></el-option>
            </el-select>
          </div>
          <div class="item">
            <el-form-item  label="语音外呼坐席License：" prop="outboundNum">
              <el-input v-number v-model="info.outboundNum"></el-input>
              <span>&nbsp;个</span>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="section" v-if="info.addService">
        <div class="title" style="display:inline-block; margin-right:20px">商机权益</div>
        <div class="voiceRobot">
          <div class="item">
            <el-form-item  label="预计交付名单数量：" prop="bizChanceCount">
              <el-input-number ref="number" @focus="()=>this.$refs.number.select()" :min="0" :step="100" step-strictly v-model="info.bizChanceCount">
              </el-input-number>
              <span>&nbsp;条</span>
              <span class="tip">温馨提示：该数值为开户时设定的交付标准数量，意味着达到该名单数量就算交付完毕。</span>
            </el-form-item>
            <el-form-item  label="实际已交付名单数量：" prop="userBizChanceCount">
              {{info.userBizChanceCount}}
              <span>&nbsp;条</span>
            </el-form-item>
            <el-form-item  label="补名单数量：" prop="userBizChanceCount">
              <span>{{info.addBizChanceCount}}&nbsp;条</span>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <div class="footer">
      <el-button type="primary" @click="beforeSave">保存</el-button>
      <el-button plain @click="$router.push('/main/accountManagement/accountList')">取消</el-button>
    </div>
    <el-dialog title="增加线路" :visible.sync="dialogVisible" width="30%">
      <div>
        <span class="labelName">选择线路类型：</span>
        <el-select v-model="selectedLine">
          <el-option label="企保线路" value="3"></el-option>
          <el-option label="网关线路" value="1"></el-option>
          <el-option label="运营商线路" value="2"></el-option>
        </el-select>
      </div>
      <div class="tip">温馨提醒：网关线路和运营商线路为客户自有资源，添加后需去SaaS平台进行设置后才可生效。</div>
      <div v-if="selectedLine == '3'">
        <span class="labelName">选择线路子类：</span>
        <el-select v-model="selectedChildType">
          <el-option label="机器人线路" value="1"></el-option>
          <el-option label="人工线路" value="2"></el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLine">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    const rangeValidator = (rule, value, callback) => {
      if(value>99999999 || value<0){ 
        callback('请输入0~99999999的数字')
      }else{
        callback()
      } 
    }
    const callTimeValidator = (rule, value, callback) => {
      if(value>99999999){ 
        callback('上限为99999999')
      }else{
        callback()
      } 
    }
    return {
      rules: {
        yearBalance: [
          {required: true, message: '文本机器人流量不能为空', trigger: 'blur'},
          {validator: rangeValidator, trigger: 'blur'}
        ],
        productNum: [
          {required: true, message: '产品License不能为空', trigger: 'blur'},
          {validator: rangeValidator, trigger: 'blur'}
        ],
        companyServiceNum: [
          {required: true, message: '平台License不能为空', trigger: 'blur'},
          {validator: rangeValidator, trigger: 'blur'}
        ],
        taskRobotNum: [
          {required: true, message: '多轮任务License不能为空', trigger: 'blur'},
          {validator: rangeValidator, trigger: 'blur'}
        ],
        textSeatNum: [
          {required: true, message: '文本坐席辅助License不能为空', trigger: 'blur'},
          {validator: rangeValidator, trigger: 'blur'}
        ],
        robotNum: [
          {required: true, message: '机器人个数License不能为空', trigger: 'blur'},
          {validator: rangeValidator, trigger: 'blur'}
        ],
        callTime: [
          {required: true, message: '语音时长不能为空', trigger: 'blur'},
          {validator: callTimeValidator, trigger: 'blur'}
        ],
        outboundNum: [
          {required: true, message: '语音外呼坐席License不能为空', trigger: 'blur'},
          {validator: rangeValidator, trigger: 'blur'}
        ]
      },
      info: {
        name: '',
        mobile: '',
        typeText: '',
        yearBalance: '',   //文本机器人流量
        productNum: '',   //产品个数
        companyServiceNum: '',   //平台License
        robotNum: '',   //机器人个数License
        taskRobotNum: '',   //多轮任务
        textSeatNum: '',   //文本坐席辅助
        callTime: '',   //语音时长
        outboundNum: '',   //语音外呼坐席
        scenes: [],   //选择的业务场景
        gatewayLine: [],   //网关线路
        qbLine: [],   //企保线路
        relayLine: [],   //运营商线路
        addService: 0, // 商机权益
        bizChanceCount: 0, // 预计交付名单数量
        prevBizChanceCount: 0, // 上次预计交付名单数量
        userBizChanceCount: 0, // 实际已交付名单数量
        addBizChanceCount: 0, // 补名单数量
      },
      dialogVisible: false,
      selectedLine: '3',   //1网关 2运营商 3企保
      selectedChildType: '1',   //1机器人线路 2人工线路
      scenesOptions: [],   //业务场景及话术选项
      addLinesArr: []   //增加的线路
    }
  },
  watch: {
    dialogVisible(val) {
      if(!val){
        this.selectedLine = '3';
        this.selectedChildType = '1';
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/main/accountManagement/accountList' && (from.query.fromSearch && to.query.search != from.query.fromSearch) || (from.query.fromPage && to.query.page != from.query.fromPage)) {
      next({
        path: to.path,
        query: {
          search: from.query.fromSearch,
          page: from.query.fromPage
        }
      });
    } else {
      next();
    }
  },
  created() {
    this.getScene()
  },
  methods: {
    // 删除业务场景时同时清空对应话术
    scenseChange(val) {
      for(let item of this.scenesOptions){
        if(item.code === val){
          item.template = []
          break
        }
      }
    },
    // 获取场景和话术
    async getScene() {
      let res = await this.$request.formGet('/user/getScene')
      if(res.code === 0){
        this.queryById()   //查询到的话术依赖话术选项查询接口
        res.data.forEach(item=>{
          Object.assign(item,{template:[]})
        })
      }
      this.scenesOptions = res.data
    },
    // 根据id查询账户信息
    async queryById() {
      const res = await this.$request.formGet('/user/getEquity',{
        userId: this.$route.query.id
      })
      if(res.code === 0){
        Object.keys(this.info).forEach(item=>{
          this.info[item] = res.data[item]
        })
        this.info.prevBizChanceCount = res.data.bizChanceCount;
        this.scenesOptions.forEach(item=>{
          item.template = res.data.huashu[item.code] || []
        })
        // 归类企保线路子类
        let qbLine = this.info.qbLine, grouped = {'1': [], '2': []};
        qbLine.forEach(item => {
          if (item.childType === '机器人') {
            grouped['1'].push(item)
          } else if (item.childType === '人工') {
            grouped['2'].push(item)
          }
        })
        this.info.qbLine = grouped;
      }
    },
    // 保存前校验 如果业务场景对应的话术为空给予提示
    beforeSave() {
      for(let item of this.scenesOptions){
        if(item.template.length === 0 && this.info.scenes.includes(item.code)){
          this.$message.error('请选择业务场景对应的话术模板')
          return
        }
      }
      this.$refs.infoForm.validate(valid => {
        if(valid){
          this.saveData()
        }
      })
    },
    // 提交保存
    async saveData() {
      let huashu = []
      this.scenesOptions.forEach(item=>{
        huashu.push(...item.template)
      })
      const res = await this.$request.jsonPost('/user/setEquity',{
        userId: this.$route.query.id,
        yearBalance: this.info.yearBalance,
        callTime: this.info.callTime,
        productNum: this.info.productNum,
        companyServiceNum: this.info.companyServiceNum,
        taskRobotNum: this.info.taskRobotNum,
        robotNum: this.info.robotNum,
        textSeatNum: this.info.textSeatNum,
        outboundNum: this.info.outboundNum,
        lines: this.addLinesArr,
        huashu,
        bizChanceCount: this.info.bizChanceCount
      })
      if(res.code === 0){
        this.$message.success('保存成功')
        this.$router.push('/main/accountManagement/accountList')
      }
    },
    //增加线路
    addLine() {
      switch (this.selectedLine) {
        case '1':
          this.info.gatewayLine.push({
            isOld: false,
            name: '网关线路'
          })
          break
        case '3':
          if (!this.selectedChildType) {
            this.$message.error('请选择线路子类');
            return;
          }
          this.info.qbLine[this.selectedChildType].push({
            isOld: false,
            name: '企保线路'
          })
          break
        case '2':
          this.info.relayLine.push({
            isOld: false,
            name: '运营商线路'
          })
          break
        default:
          this.$message.error('请选择线路类型');
          return;
      }
      const newLine = this.selectedChildType ? `${this.selectedLine}:${this.selectedChildType}` : this.selectedLine;
      this.addLinesArr.push(newLine);
      this.dialogVisible = false
    },
    //删除线路
    deleteLine(type, childType) {
      switch (type) {
        case 1:
          this.info.gatewayLine.pop()
          break
        case 3:
          this.info.qbLine[childType].pop()
          break
        case 2:
          this.info.relayLine.pop()
          break
      }
      const index = this.addLinesArr.findIndex(item=>{
        if (childType) {
          return item == `${type}:${childType}`
        } else {
          return item == type
        }
      })
      this.addLinesArr.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/formPage.scss';
  .permissionManagement{
    .tip{
      color: #FF3B30;
    }
    .labelName{
      font-weight: 600;
      color: #333;
      margin-right: 20px;
    }
    .section{
      &:not(:last-child){
        margin-bottom: 60px;
      }
      .el-input{
        width: 160px;
        margin-right: 10px;
      }
      .title{
        position: relative;
        padding-left: 10px;
        line-height: 16px;
        font-weight: 600;
        color: #333;
        &::before{
          content: '';
          position: absolute;
          background-color: $themeColor;
          width: 4px;
          height: 16px;
          border-radius: 1px;
          left: 0;
        }
      }
      .accountInfo{
        display: grid;
        grid-template-columns: repeat(3, 33.33%);
        align-items: center;
      }
      .textRobot{
        display: grid;
        grid-template-columns: repeat(2, 50%);
        align-items: center;
        grid-row-gap: 10px;
      }
      .voiceRobot{
        display: flex;
        flex-direction: column;
        .item{
          margin-top: 10px;
          margin-bottom: 20px;
          &.item_lines {
            display: flex;
            align-items: center;
            .item-content {
              flex: 1;
            }
            .item-group {
              display: flex;
              align-items: center;
            }
            .item-tags {
              flex: 1;
              .line {
                margin-top: 5px;
                margin-bottom: 5px;
              }
            }
          }
          .tip{
            margin-left: 30px;
          }
          .speechTemlate{
            width: 240px
          }
          .el-form-item{
            margin-bottom: 0
          }
        }
        .line{
          margin-right: 20px;
        }
      }
    }
    .el-dialog{
      .tip{
        margin: 20px 0;
      }
    }
  }
</style>