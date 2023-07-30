<!--
 * @Author: your name
 * @Date: 2022-01-21 15:30:34
 * @LastEditTime: 2022-04-14 11:02:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mutli\src\pages\programRosterManage\list.vue
-->
<template>
  <div class="customerList page-list">
    <!-- 面包屑导航 -->
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/main/customerManage/customerList' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>项目批次管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="toolbar">
      <div class="tool-search">
        <el-input
          placeholder="名单批次"
          class="search-component search-input"
          v-model.trim="search.batch"
          style="width: 260px"
          clearable
        ></el-input>
        <el-date-picker
          v-model="search.repeatTimeStart"
          class="search-component search-input"
          type="date"
          placeholder="复用开始时间"
          value-format="yyyy-MM-dd"
          :picker-options="beginUpdateValidator"
          clearable
        ></el-date-picker>
        <span class="search-delimiter">-</span>
        <el-date-picker
          v-model="search.repeatTimeEnd"
          class="search-component search-input"
          type="date"
          placeholder="复用结束时间"
          value-format="yyyy-MM-dd"
          :picker-options="endUpdateValidator"
          clearable
        ></el-date-picker>
        <el-date-picker
          v-model="search.createTimeMin"
          class="search-component search-input"
          type="date"
          placeholder="创建时间最小值"
          value-format="yyyy-MM-dd"
          :picker-options="createTimeMinValidator"
          @change="whenCreateTimeMinChange"
        ></el-date-picker>
        <span class="search-delimiter">-</span>
        <el-date-picker
          v-model="search.createTimeMax"
          class="search-component search-input"
          type="date"
          placeholder="创建时间最大值"
          value-format="yyyy-MM-dd"
          :picker-options="createTimeMaxValidator"
          @change="whenCreateTimeMaxChange"
        ></el-date-picker>
        <el-button
          type="primary"
          class="search-component"
          @click="
            () => {
              pagination.currentPage = 1
              clickedSle = true
              queryList()
            }
          "
          >搜索</el-button
        >
        <span
          class="toggle-advanced"
          @click="showMoreSearch = !showMoreSearch"
          >{{ showMoreSearch ? '取消' : '高级搜索' }}</span
        >
      </div>
      <div class="tool-button">
        <el-button @click="toCreateTask" icon="el-icon-plus"
          >新建任务</el-button
        >
        <el-button @click="toManage" icon="el-icon-setting">管理项目</el-button>
        <el-button @click="toListPullSet" type="primary" icon="el-icon-upload"
          >上传成功单</el-button
        >
        <el-button @click="dowmloadList" type="primary" icon="el-icon-download"
          >列表导出</el-button
        >
      </div>
    </div>
    <div v-show="showMoreSearch" class="toolbar-advanced">
      <div class="advanced-item">
        <span class="advanced-label">项目名称：</span>
        <el-select
          v-model="search.projectName"
          placeholder="请选择项目名称"
          clearable
          class="advanced-input"
        >
          <el-option
            v-for="item in projectList"
            :label="item.projectName"
            :value="item.projectName"
            :key="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">名单来源：</span>
        <el-select
          v-model="search.type"
          placeholder="请选择名单来源"
          clearable
          class="advanced-input"
        >
          <el-option
            v-for="item in sourceTypeList"
            :label="item"
            :value="item"
            :key="item"
          ></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">销售产品：</span>
        <el-input
          v-model="search.product"
          placeholder="请输入销售产品"
          class="advanced-input"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">性别：</span>
        <el-select
          v-model="search.sex"
          placeholder="请选择性别"
          clearable
          class="advanced-input"
          multiple
        >
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="0"></el-option>
          <el-option label="未知" :value="-1"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">年龄：</span>
        <el-input
          v-number
          placeholder="最小值(含)"
          v-model="search.minAge"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
        <span class="delimiter">-</span>
        <el-input
          v-number
          placeholder="最大值(含)"
          v-model="search.maxAge"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">复用次数：</span>
        <el-input
          v-number
          placeholder="最小值(含)"
          v-model="search.repeatCtMin"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
        <span class="delimiter">-</span>
        <el-input
          v-number
          placeholder="最大值(含)"
          v-model="search.repeatCtMax"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">姓名是否为空：</span>
        <el-select
          v-model="search.isName"
          placeholder="请选择"
          clearable
          class="advanced-input"
        >
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">是否已成功转化：</span>
        <el-select
          v-model="search.isSuccess"
          placeholder="请选择"
          clearable
          class="advanced-input"
          :disabled="successFlag"
        >
          <el-option label="是" :value="2"></el-option>
          <el-option label="否" :value="1"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">是否已创建外呼任务：</span>
        <el-select
          v-model="search.isCall"
          placeholder="请选择"
          clearable
          class="advanced-input"
        >
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">姓名是否有特殊符号：</span>
        <el-select
          placeholder="请选择"
          clearable
          v-model="search.nameSpecial"
          class="advanced-input"
        >
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">历史最高通话时长/s：</span>
        <el-input
          v-number
          placeholder="最小值(含)"
          v-model="search.startMaxTalkTime"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
        <span class="delimiter">-</span>
        <el-input
          v-number
          placeholder="最大值(含)"
          v-model="search.endMaxTalkTime"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">最近通话时长/s：</span>
        <el-input
          v-number
          placeholder="最小值(含)"
          v-model="search.startTalkTime"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
        <span class="delimiter">-</span>
        <el-input
          v-number
          placeholder="最大值(含)"
          v-model="search.endTalkTime"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">赠险名称：</span>
        <el-input
          v-model="search.freeInsurance"
          placeholder="请输入赠险名称"
          class="advanced-input"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">赠险所属公司：</span>
        <el-input
          v-model="search.freeInsuranceCompany"
          placeholder="请输入赠险所属公司"
          class="advanced-input"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">当批是否为新客户：</span>
        <el-select
          placeholder="请选择"
          clearable
          v-model="search.isNewCus"
          class="advanced-input"
        >
          <el-option label="是" :value="0"></el-option>
          <el-option label="否" :value="1"></el-option>
        </el-select>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">赠险领取月份：</span>
        <el-date-picker
          v-model="search.freeInsuranceMonth"
          type="monthrange"
          class="free-month"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          :picker-options="monthPickOp"
          value-format="yyyy-MM"
        >
        </el-date-picker>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">成单日期：</span>
        <el-date-picker
          v-model="search.successStartDate"
          class="search-input"
          type="date"
          placeholder="成单日期最小值"
          value-format="yyyy-MM-dd"
          :picker-options="successStartDateValidator"
          @change="checkSuccessDate"
          clearable
        ></el-date-picker>
        <span class="search-delimiter">-</span>
        <el-date-picker
          v-model="search.successEndDate"
          class="search-input"
          type="date"
          placeholder="成单最大值"
          value-format="yyyy-MM-dd"
          :picker-options="successEndDateValidator"
          clearable
          @change="checkSuccessDate"
        ></el-date-picker>
      </div>
      <div>
        <div class="advanced-item">
          <span class="advanced-label">外呼日期：</span>
          <el-date-picker
            v-model="search.callStartDate"
            class="search-input"
            type="date"
            placeholder="复用开始时间"
            value-format="yyyy-MM-dd"
            :picker-options="callStartDateValidator"
            clearable
          ></el-date-picker>
          <span class="search-delimiter">-</span>
          <el-date-picker
            v-model="search.callEndDate"
            class="search-input"
            type="date"
            placeholder="复用结束时间"
            value-format="yyyy-MM-dd"
            :picker-options="callEndDateValidator"
            clearable
          ></el-date-picker>
        </div>
        <div class="advanced-item">
          <span class="advanced-label">是否接通：</span>
          <el-select
            placeholder="请选择"
            clearable
            v-model="search.callStatus"
            class="advanced-input"
          >
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </div>
        <!-- <div class="advanced-item">
          <span class="advanced-label" style="width: 220px"
            >通话时长/s（最近一次外呼）：</span
          >
          <el-input
            v-number
            placeholder="最小值(含)"
            v-model="search.callStartTalkTime"
            class="advanced-input input_small"
            @keyup.enter.native="
              () => {
                pagination.currentPage = 1
                queryList()
              }
            "
            clearable
          ></el-input>
          <span class="delimiter">-</span>
          <el-input
            v-number
            placeholder="最大值(含)"
            v-model="search.callEndTalkTime"
            class="advanced-input input_small"
            @keyup.enter.native="
              () => {
                pagination.currentPage = 1
                queryList()
              }
            "
            clearable
          ></el-input>
        </div> -->
      </div>
      <div class="advanced-item">
        <span class="advanced-label">机器人名称：</span>
        <el-select
          placeholder="请选择"
          clearable
          v-model="search.robotName"
          class="advanced-input"
        >
          <el-option
            v-for="item in robotList"
            :key="item.id"
            :label="item.showName"
            :value="item.showName"
          ></el-option>
        </el-select>
      </div>
      <!-- <div class="advanced-item">
        <span class="advanced-label" style="width: 220px"
          >是否已成功转化（最近一次外呼）：</span
        >
        <el-select
          v-model="search.callIsSuccess"
          placeholder="请选择"
          clearable
          class="advanced-input"
          :disabled="successFlag"
        >
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </div> -->
      <div class="advanced-item">
        <span class="advanced-label">意向分级标签：</span>
        <el-input
          placeholder="请输入意向分级标签，用逗号隔开"
          v-model="search.tag"
          class="advanced-input large-input"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
      </div>
      <div class="advanced-item">
        <span class="advanced-label">意向分级等级：</span>
        <el-checkbox-group v-model="aiCategory" style="display: inline-block">
          <el-checkbox
            v-for="range in intentTags"
            :label="range"
            :key="range"
            style="width: 80px"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
      <!-- <div class="advanced-item">
        <span class="advanced-label" style="width: 220px"
          >外呼日期（最近一次接通）：</span
        >
        <el-date-picker
          v-model="search.talkStartDate"
          class="search-component search-input"
          type="date"
          placeholder="接通开始时间"
          value-format="yyyy-MM-dd"
          :picker-options="talkStartDateValidator"
          clearable
        ></el-date-picker>
        <span class="search-delimiter">-</span>
        <el-date-picker
          v-model="search.talkEndDate"
          class="search-component search-input"
          type="date"
          placeholder="接通结束时间"
          value-format="yyyy-MM-dd"
          :picker-options="talkEndDateValidator"
          clearable
        ></el-date-picker>
      </div> -->
      <!-- <div class="advanced-item">
        <span class="advanced-label" style="width: 220px"
          >通话时长/s（最近一次接通）：</span
        >
        <el-input
          v-number
          placeholder="最小值(含)"
          v-model="search.talkStartTalkTime"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
        <span class="delimiter">-</span>
        <el-input
          v-number
          placeholder="最大值(含)"
          v-model="search.talkEndTalkTime"
          class="advanced-input input_small"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
      </div> -->
      <!-- <div class="advanced-item">
        <span class="advanced-label" style="width: 220px"
          >机器人名称（最近一次接通）：</span
        >
        <el-select
          placeholder="请选择"
          clearable
          v-model="search.talkRobotName"
          class="advanced-input"
        >
          <el-option
            v-for="item in robotList"
            :key="item.id"
            :label="item.showName"
            :value="item.showName"
          ></el-option>
        </el-select>
      </div> -->
      <!-- <div class="advanced-item">
        <span class="advanced-label" style="width: 220px"
          >是否已成功转化（最近一次接通）：</span
        >
        <el-select
          v-model="search.talkIsSuccess"
          placeholder="请选择"
          clearable
          class="advanced-input"
          :disabled="successFlag"
        >
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </div> -->
      <!-- <div class="advanced-item">
        <span class="advanced-label" style="width: 220px"
          >意向分级标签（最近一次接通）：</span
        >
        <el-input
          placeholder="请输入意向分级标签，用逗号隔开"
          v-model="search.talkGroupInfo"
          class="advanced-input large-input"
          @keyup.enter.native="
            () => {
              pagination.currentPage = 1
              queryList()
            }
          "
          clearable
        ></el-input>
      </div> -->
      <!-- <div class="advanced-item">
        <span class="advanced-label" style="width: 220px"
          >意向分级等级（最近一次接通）：</span
        >
        <el-checkbox-group
          v-model="talkAiCategory"
          style="display: inline-block"
        >
          <el-checkbox
            v-for="range in intentTags"
            :label="range"
            :key="range"
            style="width: 80px"
          ></el-checkbox>
        </el-checkbox-group>
      </div> -->
      <div>
        <div class="advanced-item">
          <span class="advanced-label">接通次数：</span>
          <el-input
            v-number
            placeholder="最小值(含)"
            v-model="search.minTalkNum"
            class="advanced-input input_small"
            @keyup.enter.native="
              () => {
                pagination.currentPage = 1
                queryList()
              }
            "
            clearable
          ></el-input>
          <span class="delimiter">-</span>
          <el-input
            v-number
            placeholder="最大值(含)"
            v-model="search.maxTalkNum"
            class="advanced-input input_small"
            @keyup.enter.native="
              () => {
                pagination.currentPage = 1
                queryList()
              }
            "
            clearable
          ></el-input>
        </div>
        <div class="advanced-item">
          <span class="advanced-label">呼叫次数：</span>
          <el-input
            v-number
            placeholder="最小值(含)"
            v-model="search.minCallNum"
            class="advanced-input input_small"
            @keyup.enter.native="
              () => {
                pagination.currentPage = 1
                queryList()
              }
            "
            clearable
          ></el-input>
          <span class="delimiter">-</span>
          <el-input
            v-number
            placeholder="最大值(含)"
            v-model="search.maxCallNum"
            class="advanced-input input_small"
            @keyup.enter.native="
              () => {
                pagination.currentPage = 1
                queryList()
              }
            "
            clearable
          ></el-input>
        </div>
        <div class="advanced-item" v-if="!search.batch">
          <div class="advanced-label">
            <span style="color: #f00">*</span>
            新名单来源：
          </div>
          <el-select
            v-model="search.batchOrigin"
            placeholder="请选择名单来源"
            clearable
            class="advanced-input"
          >
            <el-option
              v-for="(item, key) in sourceTypeList"
              :label="item"
              :value="key"
              :key="item"
            ></el-option>
          </el-select>
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            margin: 5px 20px;
            align-items: center;
          "
        >
          <span class="advanced-label" style="min-width: 140px"
            >上传筛选条件：</span
          >
          <div style="display: flex; flex-direction: row">
            <file-uploader
              style="width=240px;margin-right:20px"
              :uploaded.sync="pFile"
            ></file-uploader>
            <el-button @click="handleDownloadTemplate" type="primary"
              >下载模板</el-button
            >
            <el-button @click="handleDownloadImported" type="primary"
              >下载已导入的筛选条件</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="customerList"
        ref="table"
        stripe
        height="100%"
        border
        tooltip-effect="dark"
        v-loading="isLoading"
        @select="handleSingleSelect"
        @select-all="handleAllSelect"
        @sort-change="sortChange"
      >
        <el-table-column
          type="selection"
          fixed="left"
          align="center"
          width="55"
        ></el-table-column>
        <el-table-column
          label="序号"
          align="center"
          type="index"
          :resizable="false"
          width="70"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="projectName"
          label="项目名称"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="batch"
          label="名单批次"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          :resizable="false"
          prop="type"
          label="名单来源"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="product"
          label="销售产品"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="repeatCt"
          label="复用次数"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="最近一次复用时间"
          width="110"
          align="center"
          sortable="custom"
          prop="repeatTime"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.repeatTime | formatDate('yyyy-MM-dd hh:mm:ss')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="项目批次创建时间"
          width="110"
          align="center"
          sortable="custom"
          prop="createTime"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.createTime | formatDate('yyyy-MM-dd hh:mm:ss')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="distCt"
          label="实际入库的客户总数量"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="callCt"
          label="已创建呼叫任务的客户数量"
          width="190"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          :resizable="false"
          label="操作"
          min-width="140"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button @click="lookTask(scope.row)">查看任务</el-button>
            <el-button @click="lookTransform(scope.row)"
              >查看转化情况</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-checkbox v-model="isSelectAll" @change="toggleSelectAll"
        >结果页全选</el-checkbox
      >
      <el-pagination
        background
        @current-change="queryList"
        @size-change="queryList"
        :page-size.sync="pagination.pageSize"
        :page-sizes="[10, 20, 50]"
        :current-page.sync="pagination.currentPage"
        layout="prev, pager, next, sizes, jumper"
        :total="pagination.total"
      ></el-pagination>
    </div>
    <el-dialog
      title="上传成功单"
      :visible.sync="listPullDialogVisible"
      v-if="listPullDialogVisible"
    >
      <el-upload
        class="upload-demo"
        drag
        action="/sdmulti/api/insurance/upload"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        ref="upload"
        :on-success="uploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将xls/xlsx文件拖到此处，或<em>点击上传</em>
        </div>
      </el-upload>
      <div style="text-align: center; margin-top: 10px">
        <a href="/xls/成功单.xlsx">下载成功单模板</a>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePullDialog">返回</el-button>
        <!-- <el-button type="primary" @click="handleDialogConfirm">确 定</el-button> -->
      </div>
    </el-dialog>
    <el-dialog title="转化情况" width="600px" :visible.sync="transFormView">
      <el-form :model="transForm">
        <el-form-item label="已接通的客户数量：">
          {{ transForm.connectCt }}
        </el-form-item>
        <el-form-item label="已成功转化的客户数量：">
          {{ transForm.successCt }}
        </el-form-item>
        <el-form-item label="总体接通率：">
          {{ transForm.connectPercent }}
        </el-form-item>
        <el-form-item label="接通转化率：">
          {{ transForm.successPercent }}
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="transFormView = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import util from '@/service/util'
import filter from '@/service/filter.js'
import FileUploader from '@/components/FileUploader'
import keepAlive from '@/utils/mixins/keepAlive.js' //用于从详情页返回列表页仍然返回之前页面
export default {
  components: {
    FileUploader,
  },
  mixins: [keepAlive],
  data() {
    // const now = filter.formatDate(Date.now(), 'yyyy-MM-dd')
    // const oneWeekAgo = filter.formatDate(
    //   Date.now() - 6 * 24 * 3600 * 1000,
    //   'yyyy-MM-dd'
    // )
    return {
      transFormView: false,
      transForm: {},
      clickedSle: false,
      authExport: false,
      userInfo: this.$store.state.userInfo,
      detailPages: ['customerInfo', 'followRecords'], //当前页面能跳转的子页面的name数组
      tableShow: [], //控制表格列显示
      searchShow: [], //控制筛选显示
      isSelectAll: false, //是否全选列表结果
      showMoreSearch: false, //是否显示高级搜索
      sourceTypeList: [],
      projectList: [],
      pFile: [],
      pullForm: {
        type: '',
        number: '',
        autoPullTime: '',
      },
      rules: {
        type: [
          { required: true, message: '请选择名单拉取方式', trigger: 'change' },
        ],
        number: [
          { required: true, message: '请输入最大拉取条数', trigger: 'blur' },
        ],
        autoPullTime: [
          {
            required: true,
            message: '请选择自动拉取名单时间',
            trigger: 'change',
          },
        ],
      },
      intentTags: [
        'A++类',
        'A+类',
        'A类',
        'A-类',
        'B类',
        'C类',
        'D类',
        'E类',
        'F类',
        '未分类',
      ],
      successFlag: false,
      aiCategory: [],
      // talkAiCategory: [],
      oldSearch: {
        //查询筛选字段
        userId: this.$store.state.userInfo.id,
        batch: null, //客户批次
        batchOrigin: '',
        repeatTimeEnd: '', //复用开始时间
        repeatTimeStart: '', //复用结束时间
        projectName: null, // 项目名称
        type: null, //名单来源
        product: null,
        sex: null, //性别
        minAge: null, //年龄最小值
        maxAge: null, //年龄最大值
        repeatCtMin: null, // 复用次数
        repeatCtMax: null, // 复用次数
        isCall: null, //是否已创建外呼任务
        nameSpecial: null, //是否为新客户
        isSuccess: null, //是否已成功转化
        // talkIsSuccess: null, //是否已成功转化
        // callIsSuccess: null,
        isName: null, //名字是否为空
        isNewCus: null,
        startMaxTalkTime: null,
        endMaxTalkTime: null,
        startTalkTime: null,
        endTalkTime: null,
        createTimeMin: null,
        createTimeMax: null,
        freeInsuranceCompany: null,
        freeInsurance: null,
        freeInsuranceMonth: [],
        successStartDate: null,
        successEndDate: null,
        callStartDate: '',
        callEndDate: '',
        callStatus: null,
        // callStartTalkTime: null,
        // callEndTalkTime: null,
        robotName: null,
        // talkStartDate: '',
        // talkEndDate: '',
        // talkStartTalkTime: null,
        // talkEndTalkTime: null,
        // talkRobotName: null,
        minTalkNum: null,
        maxTalkNum: null,
        minCallNum: null,
        maxCallNum: null,
        tag: '',
        // talkGroupInfo: '',
      },
      search: {
        //查询筛选字段
        userId: this.$store.state.userInfo.id,
        batch: this.$route.query.batch, //客户批次
        batchOrigin: '',
        repeatTimeEnd: '', //开始时间
        repeatTimeStart: '', //结束时间
        projectName: '', //项目名称
        type: null, //名单来源
        product: null, //销售产品
        sex: null, //性别
        minAge: null, //年龄最小值
        maxAge: null, //年龄最大值
        repeatCtMin: null, // 复用次数
        repeatCtMax: null, // 复用次数
        isCall: null, //是否已创建外呼任务
        nameSpecial: null, //是否为新客户
        isSuccess: null, //是否已成功转化
        // talkIsSuccess: null,
        // callIsSuccess: null,
        isName: null, //名字是否为空
        isNewCus: null,
        startMaxTalkTime: null,
        endMaxTalkTime: null,
        startTalkTime: null,
        endTalkTime: null,
        createTimeMin: null,
        createTimeMax: null,
        freeInsuranceCompany: null,
        freeInsurance: null,
        freeInsuranceMonth: [],
        successStartDate: null,
        successEndDate: null,
        callStartDate: '',
        callEndDate: '',
        callStatus: '',
        // callStartTalkTime: null,
        // callEndTalkTime: null,
        robotName: null,
        // talkStartDate: '',
        // talkEndDate: '',
        // talkStartTalkTime: null,
        // talkEndTalkTime: null,
        // talkRobotName: null,
        minTalkNum: null,
        maxTalkNum: null,
        minCallNum: null,
        maxCallNum: null,
        tag: '',
        // talkGroupInfo: '',
      },
      repeatTimeOrder: null,
      createTimeOrder: null,
      listPullDialogVisible: false,
      pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      monthPickOp: {
        disabledDate: (val) => Date.now() < val,
      },
      robotList: [], // 可选机器人列表
      customerList: [], //表格填充数据
      isLoading: false,
      checkedTableRow: [], //表格已选中或取消行
      beginUpdateValidator: {
        disabledDate: (current) => Date.now() < current,
      },
      endUpdateValidator: {
        disabledDate: (current) => {
          return (
            this.search.repeatTimeStart &&
            filter.formatDate(current, 'yyyy-MM-dd') <
              this.search.repeatTimeStart
          )
        },
      },
      createTimeMinValidator: {
        disabledDate: (current) => Date.now() < current,
      },
      createTimeMaxValidator: {
        disabledDate: (current) => {
          return (
            this.search.createTimeMin &&
            filter.formatDate(current, 'yyyy-MM-dd') < this.search.createTimeMin
          )
        },
      },
      successStartDateValidator: {
        disabledDate: (current) => Date.now() < current,
      },
      successEndDateValidator: {
        disabledDate: (current) => {
          return (
            this.search.successStartDate &&
            filter.formatDate(current, 'yyyy-MM-dd') <
              this.search.successStartDate
          )
        },
      },
      callStartDateValidator: {
        disabledDate: (current) => Date.now() < current,
      },
      callEndDateValidator: {
        disabledDate: (current) => {
          return (
            this.search.callStartDate &&
            filter.formatDate(current, 'yyyy-MM-dd') < this.search.callStartDate
          )
        },
      },
      talkStartDateValidator: {
        disabledDate: (current) => Date.now() < current,
      },
      talkEndDateValidator: {
        disabledDate: (current) => {
          return (
            this.search.talkStartDate &&
            filter.formatDate(current, 'yyyy-MM-dd') < this.search.talkStartDate
          )
        },
      },
    }
  },
  created() {
    if (this.$route.query.search) {
      Object.assign(this.search, JSON.parse(this.$route.query.search))
    }
    this.getSourceTypeList()
    this.getProjectsAll()
    this.getRobotList()
    this.queryList()
  },
  activated() {
    //重新进入缓存页面的钩子
    this.queryList()
    this.getSourceTypeList()
    this.getProjectsAll()
  },
  methods: {
    async handleDownloadTemplate() {
      let a = document.createElement('a')
      let res = await this.$request.xmlGet(`/sdmulti/cs/param/template`)
      a.download = '筛选条件模板.xls'
      a.href = URL.createObjectURL(res)
      a.click()
    },
    async handleDownloadImported() {
      let a = document.createElement('a')
      let res = await this.$request.xml(`/sdmulti/cs/query/param/file`)
      a.download = '筛选条件.xls'
      a.href = URL.createObjectURL(res)
      a.click()
    },
    lookTransform(row) {
      const url = '/sdmulti/project/info/get/statistics'
      this.$request
        .jsonPost(url, {
          ...row,
          projectInfoId: row.id,
        })
        .then((res) => {
          this.transForm = res.data
          this.transFormView = true
        })
    },
    checkSuccessDate() {
      if (this.search.successStartDate && this.search.successEndDate) {
        this.successFlag = true
        // this.search.callIsSuccess = 1
        // this.search.talkIsSuccess = 1
        this.search.isSuccess = 2
      } else {
        this.successFlag = false
      }
    },
    getRobotList() {
      this.$request.jsonGet('/sdmulti/task/getRobots').then((res) => {
        this.robotList = res.data
      })
    },
    whenCreateTimeMinChange(val) {
      if (
        new Date(this.search.createTimeMax).getTime() -
          new Date(val).getTime() >
          1000 * 60 * 60 * 24 * 6 ||
        new Date(this.search.createTimeMax).getTime() -
          new Date(val).getTime() <
          0
      ) {
        this.search.createTimeMax = filter.formatDate(
          new Date(val).getTime() + 1000 * 60 * 60 * 24 * 6,
          'yyyy-MM-dd'
        )
      }
    },
    whenCreateTimeMaxChange(val) {
      if (
        new Date(val).getTime() -
          new Date(this.search.createTimeMin).getTime() >
          1000 * 60 * 60 * 24 * 6 ||
        new Date(val).getTime() -
          new Date(this.search.createTimeMin).getTime() <
          0
      ) {
        this.search.createTimeMin = filter.formatDate(
          new Date(val).getTime() - 1000 * 60 * 60 * 24 * 6,
          'yyyy-MM-dd'
        )
      }
    },
    getProjectsAll() {
      const url = '/sdmulti/manage/project/list/type'
      this.$request.formGet(url).then((res) => {
        if (res.code == 0) {
          this.projectList = res.data
        }
      })
    },
    sortChange({ prop, order }) {
      // console.log(column)
      // console.log(prop)
      // console.log(order)
      if (prop == 'repeatTime') {
        this.repeatTimeOrder = order === 'descending' ? 1 : 0
        this.createTimeOrder = null
      } else {
        this.createTimeOrder = order === 'descending' ? 1 : 0
        this.repeatTimeOrder = null
      }
      this.pagination.currentPage = 1
      this.queryList()
    },
    getSourceTypeList() {
      const url = '/sdmulti/qbzz/manage/api/customer/type/list'
      this.$request.jsonGet(url).then((res) => {
        if (res.code == '0') {
          this.sourceTypeList = res.data
        }
      })
    },
    lookTask(row) {
      this.$router.push({
        path: '/main/callManage/callTask',
        query: {
          projectName: row.projectName,
          batch: row.batch,
        },
      })
    },
    uploadSuccess(response) {
      if (response.code == '0') {
        this.$message.success('上传成功')
        this.$refs.upload.clearFiles()
        this.listPullDialogVisible = false
      }
    },
    async dowmloadList() {
      ///project/info/project/batch/export
      if (!this.isSelectAll && !this.checkedTableRow.length) {
        this.$message.error('请选择数据后再导出')
        return
      }
      const url = '/sdmulti/project/info/project/batch/export'
      let sex = null
      if (this.search.sex && this.search.sex.length) {
        sex = this.search.sex.map(Number)
        if (sex.includes(0)) {
          sex.push(2)
        }
      }
      // let talkGroupInfo = this.talkGroupInfo.join(',')
      // let tag = this.tag.join(',')
      let aiCategory = this.aiCategory.join(',')
      // let talkAiCategory = this.talkAiCategory.join(',')
      const params = {
        userId: this.$store.state.userInfo.id,
        batch: this.search.batch || null,
        batchOrigin: this.search.batchOrigin || null,
        repeatTimeStart: this.search.repeatTimeStart
          ? this.search.repeatTimeStart + ' 00:00:00'
          : null,
        repeatTimeEnd: this.search.repeatTimeEnd
          ? this.search.repeatTimeEnd + ' 23:59:59'
          : null,
        type: this.search.type,
        projectName: this.search.projectName,
        product: this.search.product,
        sex: sex,
        minAge: this.search.minAge,
        maxAge: this.search.maxAge,
        repeatCtMin: this.search.repeatCtMin,
        repeatCtMax: this.search.repeatCtMax,
        isCall: this.search.isCall,
        nameSpecial: this.search.nameSpecial,
        isNewCus: this.search.isNewCus,
        isSuccess: this.search.isSuccess,
        // talkIsSuccess: this.search.talkIsSuccess,
        // callIsSuccess: this.search.callIsSuccess,
        isName: this.search.isName,
        startMaxTalkTime: this.search.startMaxTalkTime,
        endMaxTalkTime: this.search.endMaxTalkTime,
        startTalkTime: this.search.startTalkTime,
        endTalkTime: this.search.endTalkTime,
        createTimeMin: this.search.createTimeMin
          ? this.search.createTimeMin + ' 00:00:00'
          : null,
        createTimeMax: this.search.createTimeMax
          ? this.search.createTimeMax + ' 23:59:59'
          : null,
        ids: this.isSelectAll
          ? []
          : this.checkedTableRow.map((item) => item.row.id),
        createTimeOrder: this.createTimeOrder,
        repeatTimeOrder: this.repeatTimeOrder,
        freeInsuranceCompany: this.search.freeInsuranceCompany || null,
        freeInsurance: this.search.freeInsurance || null,
        // freeInsuranceMonth: this.search.freeInsuranceMonth || null,
        freeInsuranceMonthMin:
          this.search.freeInsuranceMonth &&
          this.search.freeInsuranceMonth.length
            ? this.search.freeInsuranceMonth[0]
            : null,
        freeInsuranceMonthMax:
          this.search.freeInsuranceMonth &&
          this.search.freeInsuranceMonth.length
            ? this.search.freeInsuranceMonth[1]
            : null,
        successStartDate: this.search.successStartDate
          ? this.search.successStartDate + ' 00:00:00'
          : null,
        successEndDate: this.search.successEndDate
          ? this.search.successEndDate + ' 00:00:00'
          : null,
        callStartDate: this.search.callStartDate
          ? this.search.callStartDate + ' 00:00:00'
          : null,
        callEndDate: this.search.callEndDate
          ? this.search.callEndDate + ' 00:00:00'
          : null,
        callStatus: this.search.callStatus,
        // callStartTalkTime: this.search.callStartTalkTime,
        // callEndTalkTime: this.search.callEndTalkTime,
        robotName: this.search.robotName,
        // talkStartDate: this.search.talkStartDate
        //   ? this.search.talkStartDate + ' 00:00:00'
        //   : null,
        // talkEndDate: this.search.talkEndDate
        //   ? this.search.talkEndDate + ' 00:00:00'
        //   : null,
        // talkStartTalkTime: this.search.talkStartTalkTime,
        // talkEndTalkTime: this.search.talkEndTalkTime,
        // talkRobotName: this.search.talkRobotName,
        minTalkNum: this.search.minTalkNum,
        maxTalkNum: this.search.maxTalkNum,
        minCallNum: this.search.minCallNum,
        maxCallNum: this.search.maxCallNum,
        // talkGroupInfo: this.search.talkGroupInfo,
        tag: this.search.tag,
        // talkAiCategory,
        aiCategory,
      }
      const res = await this.$request.xml(url, params)
      const a = document.createElement('a')
      a.download = '项目批次查询结果导出报表.xls'
      a.href = URL.createObjectURL(res)
      a.click()
    },
    toManage() {
      this.$router.push('/main/customerManage/programManageList')
    },
    closePullDialog() {
      for (const key in this.pullForm) {
        this.pullForm[key] = ''
      }
      this.listPullDialogVisible = false
    },
    toListPullSet() {
      this.listPullDialogVisible = true
    },
    // 表格单个行状态切换
    handleSingleSelect(selection, row) {
      const repeatIndex = this.checkedTableRow.findIndex((item) => {
        return item.row.id === row.id
      })
      if (repeatIndex !== -1) {
        this.checkedTableRow.splice(repeatIndex, 1)
        return
      }
      const index = this.customerList.findIndex((item) => {
        return item.id === row.id
      })
      this.checkedTableRow.push({
        page: this.pagination.currentPage,
        index,
        row,
      })
    },
    // 手动勾选全选
    handleAllSelect(selection) {
      if (this.isSelectAll && selection.length !== 0) {
        selection.forEach((item) => {
          const repeatIndex = this.checkedTableRow.findIndex((repeatItem) => {
            return item.id === repeatItem.row.id
          })
          repeatIndex !== -1 && this.checkedTableRow.splice(repeatIndex, 1)
        })
      }
      if (this.isSelectAll && selection.length === 0) {
        this.checkedTableRow = this.customerList
          .map((item, index) => {
            return {
              page: this.pagination.currentPage,
              index,
              row: item,
            }
          })
          .concat(this.checkedTableRow)
      }
      if (!this.isSelectAll && selection.length !== 0) {
        this.checkedTableRow = selection
          .map((item, index) => {
            return {
              page: this.pagination.currentPage,
              index,
              row: item,
            }
          })
          .concat(this.checkedTableRow)
      }
      if (!this.isSelectAll && selection.length === 0) {
        this.customerList.forEach((item) => {
          const repeatIndex = this.checkedTableRow.findIndex((repeatItem) => {
            return item.id === repeatItem.row.id
          })
          repeatIndex !== -1 && this.checkedTableRow.splice(repeatIndex, 1)
        })
      }
    },
    // 结果页全选事件
    toggleSelectAll(val) {
      this.checkedTableRow = []
      this.$refs.table.clearSelection()
      if (val) {
        this.$refs.table.toggleAllSelection()
      }
    },
    //跳转新建任务
    toCreateTask() {
      if (this.isSelectAll) {
        this.isSelectAll = false
        this.checkedTableRow = []
      } else {
        if (this.checkedTableRow.length === 0) {
          this.$message.warning('请选择项目批次')
          return
        }
      }
      // 判断勾选的类型是否相同
      const result = this.checkedTableRow.every(
        (el) => el.row.type === this.checkedTableRow[0].row.type
      )
      if (!result) {
        this.$message.warning('只可针对同一名单来源新建外呼任务，请重新选择！')
        return
      }
      function isRepeat(arr) {
        var hash = {}
        for (var i in arr) {
          if (hash[arr[i]]) {
            return true
          }
          // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
          hash[arr[i]] = true
        }
        return false
      }
      const batchList = this.checkedTableRow.map((e) => e.row.batch)
      if (isRepeat(batchList)) {
        this.$message.error('选择数据中包含重复的名单批次')
        return
      }
      const pagination = this.pagination
      const search = { ...this.oldSearch }
      if (!search.sex || !search.sex.length) {
        search.sex = null
      }
      this.$router.push({
        path: '/main/customerManage/createTask',
        query: {
          name: JSON.stringify(this.checkedTableRow),
          search: JSON.stringify({
            ...search,
            // talkAiCategory: this.talkAiCategory,
            aiCategory: this.aiCategory,
          }),
          pagination: JSON.stringify(pagination),
          type: this.checkedTableRow[0].row.type,
          batchList,
        },
      })
    },
    // 查询列表
    queryList() {
      Object.assign(this.oldSearch, this.search)
      if (
        new Date(this.search.repeatTimeEnd) -
          new Date(this.search.repeatTimeStart) >
        31 * 24 * 3600 * 1000
      ) {
        this.$message.warning('日期跨度不得超过31天')
        return
      }
      this.isLoading = true
      this.checkedTableRow = []
      let sex = null
      if (this.search.sex && this.search.sex.length) {
        sex = this.search.sex.map(Number)
        if (sex.includes(0)) {
          sex.push(2)
        }
      }
      // let talkAiCategory = this.talkAiCategory.join(',')
      let aiCategory = this.aiCategory.join(',')
      const params = {
        userId: this.$store.state.userInfo.id,
        batch: this.search.batch || null,
        batchOrigin: this.search.batchOrigin || null,
        repeatTimeStart: this.search.repeatTimeStart
          ? this.search.repeatTimeStart + ' 00:00:00'
          : null,
        repeatTimeEnd: this.search.repeatTimeEnd
          ? this.search.repeatTimeEnd + ' 23:59:59'
          : null,
        type: this.search.type,
        projectName: this.search.projectName,
        product: this.search.product,
        sex: sex,
        minAge: this.search.minAge,
        maxAge: this.search.maxAge,
        repeatCtMin: this.search.repeatCtMin,
        repeatCtMax: this.search.repeatCtMax,
        isCall: this.search.isCall,
        nameSpecial: this.search.nameSpecial,
        isSuccess: this.search.isSuccess,
        // talkIsSuccess: this.search.talkIsSuccess,
        // callIsSuccess: this.search.callIsSuccess,
        isNewCus: this.search.isNewCus,
        isName: this.search.isName,
        page: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        startMaxTalkTime: this.search.startMaxTalkTime,
        endMaxTalkTime: this.search.endMaxTalkTime,
        startTalkTime: this.search.startTalkTime,
        endTalkTime: this.search.endTalkTime,
        createTimeMin: this.search.createTimeMin
          ? this.search.createTimeMin + ' 00:00:00'
          : null,
        createTimeMax: this.search.createTimeMax
          ? this.search.createTimeMax + ' 23:59:59'
          : null,
        createTimeOrder: this.createTimeOrder,
        repeatTimeOrder: this.repeatTimeOrder,
        freeInsuranceCompany: this.search.freeInsuranceCompany || null,
        freeInsurance: this.search.freeInsurance || null,
        // freeInsuranceMonth: this.search.freeInsuranceMonth || null
        freeInsuranceMonthMin:
          this.search.freeInsuranceMonth &&
          this.search.freeInsuranceMonth.length
            ? this.search.freeInsuranceMonth[0]
            : null,
        freeInsuranceMonthMax:
          this.search.freeInsuranceMonth &&
          this.search.freeInsuranceMonth.length
            ? this.search.freeInsuranceMonth[1]
            : null,
        successStartDate: this.search.successStartDate
          ? this.search.successStartDate + ' 00:00:00'
          : null,
        successEndDate: this.search.successEndDate
          ? this.search.successEndDate + ' 00:00:00'
          : null,
        callStartDate: this.search.callStartDate
          ? this.search.callStartDate + ' 00:00:00'
          : null,
        callEndDate: this.search.callEndDate
          ? this.search.callEndDate + ' 00:00:00'
          : null,
        callStatus: this.search.callStatus,
        // callStartTalkTime: this.search.callStartTalkTime,
        // callEndTalkTime: this.search.callEndTalkTime,
        robotName: this.search.robotName,
        // talkStartDate: this.search.talkStartDate
        //   ? this.search.talkStartDate + ' 00:00:00'
        //   : null,
        // talkEndDate: this.search.talkEndDate
        //   ? this.search.talkEndDate + ' 00:00:00'
        //   : null,
        // talkStartTalkTime: this.search.talkStartTalkTime,
        // talkEndTalkTime: this.search.talkEndTalkTime,
        // talkRobotName: this.search.talkRobotName,
        minTalkNum: this.search.minTalkNum,
        maxTalkNum: this.search.maxTalkNum,
        minCallNum: this.search.minCallNum,
        maxCallNum: this.search.maxCallNum,
        tag: this.search.tag,
        // talkGroupInfo: this.search.talkGroupInfo,

        // talkAiCategory,
        aiCategory,
      }
      if (!this.search.batch && this.pFile.length) {
        if (!this.search.batchOrigin) {
          this.$message.error('请选择新名单来源')
          return
        }
        const url = '/sdmulti/cs/query/save'
        const param2 = new FormData()
        param2.append('projectInfoParam', JSON.stringify(params))
        param2.append('pFile', this.pFile[0])
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
        this.$request.uploadPost(url, param2, config).then((res) => {
          if (res.code == 0) {
            this.pFile = []
            this.$message.success('创建筛选记录成功')
            this.$router.push('/main/customerManage/rosterSelectRecords')
          }
        })
      } else {
        let url = '/sdmulti/project/info/list'
        this.$request
          .jsonPost(url, params)
          .then((res) => {
            this.isLoading = false
            this.showMoreSearch = false
            if (res.code == 0) {
              this.customerList = res.data ? res.data.list : []
              this.pagination.total = res.data ? res.data.total : 0
              if (this.checkedTableRow.length !== 0) {
                this.$nextTick(() => {
                  const checkedRow = this.checkedTableRow.filter((item) => {
                    return item.page === this.pagination.currentPage
                  })
                  if (this.isSelectAll) {
                    this.customerList.forEach((item) => {
                      this.$refs.table.toggleRowSelection(item)
                    })
                  }
                  checkedRow.forEach((item) => {
                    this.$refs.table.toggleRowSelection(
                      this.customerList[item.index]
                    )
                  })
                })
              } else if (this.isSelectAll) {
                this.$nextTick(() => {
                  this.$refs.table.toggleAllSelection(true)
                })
              }
            }
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.customerList {
  .tool-search {
    flex: 1;
  }
  .free-month {
    width: 320px;
    /deep/ .el-range-separator {
      padding: 0;
    }
  }
  .pagination {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }
  .toolbar-advanced {
    margin-top: -10px;
    padding-bottom: 10px;
    overflow-x: auto;
    overflow-y: auto;
    height: 240px;
    $labelWidth: 100px;
    .advanced-item {
      display: inline-block;
      margin: 5px 20px;
      white-space: nowrap;
    }
    .advanced-label {
      display: inline-block;
      width: 140px;
      color: rgba(0, 0, 0, 0.65);
    }
    .advanced-input {
      width: 320px;
      &.input_small {
        width: 147px;
      }
      &.large-input {
        width: 450px;
      }
    }
    .delimiter {
      padding: 0 10px;
    }
    .advanced-item_category {
      margin: 5px 20px;
      $line-height: 27px;
      .advanced-label {
        float: left;
        line-height: $line-height;
      }
      .advanced-category-container {
        margin-left: $labelWidth;
        .toggle {
          margin-right: 15px;
          color: $themeColor;
          cursor: pointer;
        }
      }
      .advanced-category {
        display: inline-block;
        width: 92.5px;
        line-height: $line-height;
        text-align: center;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        cursor: pointer;
        margin: 0 15px 10px 0;
        color: rgba(0, 0, 0, 0.65);
        transition: all 0.3s;
        &.selected {
          color: #fff;
          border-color: $themeColor;
          background: $themeColor;
        }
      }
    }
  }
  .toggle-advanced {
    margin-left: 20px;
    color: $themeColor;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      color: lighten($themeColor, 15%);
    }
  }
  .el-dialog {
    .tip {
      margin: 6px 0;
      color: rgba(110, 110, 110, 0.5);
    }
    .exportTip {
      margin-bottom: 20px;
      font-size: 16px;
    }
    .tableTitle {
      color: $themeColor;
      border: 1px solid $themeColor;
      padding: 8px 18px;
      border-radius: 4px;
    }
  }
}
</style>
