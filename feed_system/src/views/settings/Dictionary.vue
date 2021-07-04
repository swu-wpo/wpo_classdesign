<template>
  <div>
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <!-- 体况部分 -->
      <el-tab-pane label="体况表"
                   name="first">
        <el-row>
          <el-col :span="4">
            <el-button @click="show1">添加体况信息</el-button>
          </el-col>
          <el-col :span="4">
            <el-input v-model="body.bodyStateCode"
                      placeholder="请输入搜索内容"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-search"
                       type="primary"
                       @click="getBodyList"></el-button>
          </el-col>
        </el-row>
        <br>
        <!-- 表格 -->
        <el-row>
          <AutoTable :tableData="tableData1"
                     :tableHeader="tableHeader1"
                     :loading="loading"></AutoTable>
          <UucPagination :total="total1"
                         @pagination="getBodyList" />
        </el-row>
        <!-- 添加体况 -->
        <AutoDialog :data="dialog1"
                    :dialogTitle="addTitle1"
                    :form="body"
                    :rules="rules1"
                    :submitForm="this.addBody"
                    :visible.sync="addVisible1"></AutoDialog>
        <!-- 修改体况 -->
        <AutoDialog :data="dialog1"
                    :dialogTitle="updateTitle1"
                    :form="body"
                    :rules="rules1"
                    :submitForm="this.updateBody"
                    :visible.sync="updateVisible1"></AutoDialog>
      </el-tab-pane>

      <!-- 因素调节部分 -->
      <el-tab-pane label="因素调节表"
                   name="second">
        <el-row>
          <el-col :span="4">
            <el-button @click="show2">添加因素调节信息</el-button>
          </el-col>
          <el-col :span="4">
            <el-input v-model="causation.id"
                      placeholder="请输入搜索内容"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-search"
                       type="primary"
                       @click="getCausationList"></el-button>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <AutoTable :tableData="tableData2"
                     :tableHeader="tableHeader2"
                     :loading="loading"></AutoTable>
          <UucPagination :total="total2"
                         @pagination="getCausationList" />
        </el-row>
        <!-- 添加因素调节 -->
        <AutoDialog :data="dialog2"
                    :dialogTitle="addTitle2"
                    :form="causation"
                    :rules="rules2"
                    :layout="layout2"
                    :dialogWidth="dialogWidth2"
                    :submitForm="this.addCausation"
                    :visible.sync="addVisible2"></AutoDialog>
        <!-- 修改因素调节 -->
        <AutoDialog :data="dialog2"
                    :dialogTitle="updateTitle2"
                    :form="causation"
                    :rules="rules2"
                    :layout="layout2"
                    :dialogWidth="dialogWidth2"
                    :submitForm="this.updateCausation"
                    :visible.sync="updateVisible2"></AutoDialog>
      </el-tab-pane>

      <!-- 部件异常部分 -->
      <el-tab-pane label="部件异常表"
                   name="third">
        <el-row>
          <el-col :span="4">
            <el-button @click="show3">添加部件异常信息</el-button>
          </el-col>
          <el-col :span="4">
            <el-input v-model="part.id"
                      placeholder="请输入搜索内容"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-search"
                       type="primary"
                       @click="getPartList"></el-button>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <AutoTable :tableData="tableData3"
                     :tableHeader="tableHeader3"
                     :loading="loading"></AutoTable>
          <UucPagination :total="total3"
                         @pagination="getPartList" />
        </el-row>
        <!-- 添加部件异常 -->
        <AutoDialog :data="dialog3"
                    :dialogTitle="addTitle3"
                    :form="part"
                    :rules="rules3"
                    :submitForm="this.addPart"
                    :visible.sync="addVisible3"></AutoDialog>
        <!-- 修改部件异常 -->
        <AutoDialog :data="dialog3"
                    :dialogTitle="updateTitle3"
                    :form="part"
                    :rules="rules3"
                    :submitForm="this.updatePart"
                    :visible.sync="updateVisible3"></AutoDialog>
      </el-tab-pane>

      <!-- 生产阶段部分 -->
      <el-tab-pane label="生产阶段表"
                   name="forth">
        <el-row>
          <el-col :span="4">
            <el-button @click="show4">添加生产阶段信息</el-button>
          </el-col>
          <el-col :span="4">
            <el-input v-model="phase.id"
                      placeholder="请输入搜索内容"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-search"
                       type="primary"
                       @click="getPhaseList"></el-button>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <AutoTable :tableData="tableData4"
                     :tableHeader="tableHeader4"
                     :loading="loading"></AutoTable>
          <UucPagination :total="total4"
                         @pagination="getPhaseList" />
        </el-row>
        <!-- 添加生产阶段 -->
        <AutoDialog :data="dialog4"
                    :dialogTitle="addTitle4"
                    :form="phase"
                    :rules="rules4"
                    :submitForm="this.addPhase"
                    :visible.sync="addVisible4"></AutoDialog>
        <!-- 修改生产阶段 -->
        <AutoDialog :data="dialog4"
                    :dialogTitle="updateTitle4"
                    :form="phase"
                    :rules="rules4"
                    :submitForm="this.updatePhase"
                    :visible.sync="updateVisible4"></AutoDialog>
      </el-tab-pane>
    </el-tabs>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      searchBody: '', // 搜索内容
      body: {
        id: '',
        bodyStateCode: '',
        bodyStateDes: '',
        createTime: '',
        updateTime: '',
        weightStart: '',
        weightEnd: ''
      },
      searchCausation: '',
      causation: {
        id: '',
        causationCode: '',
        causationExplain: '',
        createTime: '',
        updateTime: ''
      },
      searchPart: '',
      part: {
        id: '',
        partCode: '',
        partDes: '',
        statusCode: '',
        description: '',
        createUser: '',
        createTime: '',
        updateTime: '',
        flag: ''
      },
      searchPhase: '',
      phase: {
        id: '',
        phaseCode: '',
        phaseDes: '',
        createUser: '',
        createTime: '',
        updateTime: '',
        flag: ''
      },

      // 对话框显示
      addVisible1: false,
      addVisible2: false,
      addVisible3: false,
      addVisible4: false,
      updateVisible1: false,
      updateVisible2: false,
      updateVisible3: false,
      updateVisible4: false,
      // 分页器相关
      total1: 0,
      pageIndex1: 1,
      pageSize1: 10,

      total2: 0,
      pageIndex2: 1,
      pageSize2: 10,

      total3: 0,
      pageIndex3: 1,
      pageSize3: 10,

      total4: 0,
      pageIndex4: 1,
      pageSize4: 10,

      loading: false,
      // 表格数据
      tableData1: [
        { id: '1' }
      ], // 体况
      tableData2: [
        { id: '1' }
      ], // 因素调节
      tableData3: [
        { id: '1' }
      ], // 部件异常
      tableData4: [
        { id: '1' }
      ], // 生产阶段

      // 表头内容
      tableHeader1: [
        { prop: 'id', label: '主键' },
        { prop: 'bodyStateCode', label: '体况code' },
        { prop: 'bodyStateDes', label: '体况描述' },
        { prop: 'createTime', label: '创建时间' },
        { prop: 'updateTime', label: '更新时间' },
        { prop: 'weightStart', label: '体重起始值（kg）' },
        { prop: 'weightEnd', label: '体重结束值（kg）' },
        // 此处为操作栏，不需要可以删除，clickFun绑定此操作按钮的事件
        {
          prop: 'oper',
          label: '操作',
          oper: [
            { name: '修改', style: 'text', clickFun: this.showBody },
            { name: '删除', style: 'text', clickFun: this.delBody, tip: '确定删除吗' }
          ]
        }
      ],
      tableHeader2: [
        { prop: 'id', label: '主键' },
        { prop: 'causationCode', label: '因素代码' },
        { prop: 'causationExplain', label: '具体因素描述' },
        { prop: 'createTime', label: '创建时间' },
        { prop: 'updateTime', label: '更新时间' },
        // 此处为操作栏，不需要可以删除，clickFun绑定此操作按钮的事件
        {
          prop: 'oper',
          label: '操作',
          oper: [
            { name: '修改', style: 'text', clickFun: this.showCausation },
            { name: '删除', style: 'text', clickFun: this.delCausation, tip: '确定删除吗' }
          ]
        }
      ],
      tableHeader3: [
        { prop: 'id', label: '主键' },
        { prop: 'partCode', label: '部件代码' },
        { prop: 'partDes', label: '部件描述' },
        { prop: 'statusCode', label: '执行状态' },
        { prop: 'description', label: '执行状态描述' },
        { prop: 'creatUser', label: '创建人' },
        { prop: 'createTime', label: '创建时间' },
        { prop: 'updateTime', label: '更新时间' },
        { prop: 'flag', label: '保留字段' },
        // 此处为操作栏，不需要可以删除，clickFun绑定此操作按钮的事件
        {
          prop: 'oper',
          label: '操作',
          oper: [
            { name: '修改', style: 'text', clickFun: this.showPart },
            { name: '删除', style: 'text', clickFun: this.delPart, tip: '确定删除吗' }
          ]
        }
      ],
      tableHeader4: [
        { prop: 'id', label: '主键' },
        { prop: 'phaseCode', label: '生产阶段code' },
        { prop: 'phaseDes', label: '映射阶段中文' },
        { prop: 'creatUser', label: '创建人' },
        { prop: 'createTime', label: '创建时间' },
        { prop: 'updateTime', label: '更新时间' },
        { prop: 'flag', label: '保留字段' },
        // 此处为操作栏，不需要可以删除，clickFun绑定此操作按钮的事件
        {
          prop: 'oper',
          label: '操作',
          oper: [
            { name: '修改', style: 'text', clickFun: this.showPhase },
            { name: '删除', style: 'text', clickFun: this.delPhase, tip: '确定删除吗' }
          ]
        }
      ],
      // 对话框相关
      addTitle1: '添加体况信息',
      updateTitle1: '修改体况信息',
      dialog1: [
        { style: 'input', prop: 'id', label: '主键：', place: '请输入主键' },
        { style: 'input', prop: 'bodyStateCode', label: '体况code：', place: '请输入体况code' },
        { style: 'input', prop: 'bodyStateDes', label: '体况描述：', place: '请输入体况描述' },
        { style: 'date', prop: 'createTime', label: '创建时间：', place: '请选择创建时间' },
        { style: 'date', prop: 'updateTime', label: '更新时间：', place: '请选择更新时间' },
        { style: 'input', prop: 'weightStart', label: '体重起始值（kg）：', place: '请输入体重起始值' },
        { style: 'input', prop: 'weightEnd', label: '体重结束值（kg）：', place: '请输入体重结束值' }
      ],
      rules1: {
        id: [{ required: true, message: '还未输入主键', trigger: 'blur' }],
        bodyStateCode: [{ required: true, message: '还未输入体况代码', trigger: 'blur' }],
        bodyStateDes: [{ required: true, message: '还未输入体况描述', trigger: 'blur' }],
        createTime: [{ required: true, message: '还未选择创建时间', trigger: 'blur' }],
        updateTime: [{ required: true, message: '还未选择更新时间', trigger: 'blur' }],
        weightStart: [{ required: true, message: '还未输入体重起始值', trigger: 'blur' }],
        weightEnd: [{ required: true, message: '还未输入体重结束值', trigger: 'blur' }]
      },

      addTitle2: '添加因素调节信息',
      updateTitle2: '修改因素调节信息',
      dialogWidth2: '30%',
      layout2: { column: 1 },
      dialog2: [
        { style: 'input', prop: 'id', label: '主键：', place: '请输入主键' },
        { style: 'input', prop: 'causationCode', label: '因素代码：', place: '请输入因素代码' },
        { style: 'input', prop: 'causationExplain', label: '体况描述：', place: '请输入具体因素描述' },
        { style: 'date', prop: 'createTime', label: '创建时间：', place: '请选择创建时间' },
        { style: 'date', prop: 'updateTime', label: '更新时间：', place: '请选择更新时间' }
      ],
      rules2: {
        id: [{ required: true, message: '还未输入主键', trigger: 'blur' }],
        causationCode: [{ required: true, message: '还未输入体况代码', trigger: 'blur' }],
        causationExplain: [{ required: true, message: '还未输入体况描述', trigger: 'blur' }],
        createTime: [{ required: true, message: '还未选择创建时间', trigger: 'blur' }],
        updateTime: [{ required: true, message: '还未选择更新时间', trigger: 'blur' }]
      },

      addTitle3: '添加部件异常信息',
      updateTitle3: '修改部件异常信息',
      dialog3: [
        { style: 'input', prop: 'id', label: '主键：', place: '请输入主键' },
        { style: 'input', prop: 'partCode', label: '部件编码：', place: '请输入部件编码' },
        { style: 'input', prop: 'partDes', label: '部件描述：', place: '请输入部件描述' },
        { style: 'input', prop: 'statusCode', label: '执行状态：', place: '请输入执行状态' },
        { style: 'input', prop: 'description', label: '执行状态描述：', place: '请输入执行状态描述' },
        { style: 'input', prop: 'createUser', label: '创建人：', place: '请输入创建人' },
        { style: 'date', prop: 'createTime', label: '创建时间：', place: '请选择创建时间' },
        { style: 'date', prop: 'updateTime', label: '更新时间：', place: '请选择更新时间' },
        { style: 'input', prop: 'flag', label: '保留字段：', place: '请输入保留字段' }
      ],
      rules3: {
        id: [{ required: true, message: '还未输入主键', trigger: 'blur' }],
        partCode: [{ required: true, message: '还未输入部件编码', trigger: 'blur' }],
        partDes: [{ required: true, message: '还未输入部件描述', trigger: 'blur' }],
        statusCode: [{ required: true, message: '还未输入执行状态', trigger: 'blur' }],
        description: [{ required: true, message: '还未输入执行状态描述', trigger: 'blur' }],
        createUser: [{ required: true, message: '还未输入创建人', trigger: 'blur' }],
        createTime: [{ required: true, message: '还未选择创建时间', trigger: 'blur' }],
        updateTime: [{ required: true, message: '还未选择更新时间', trigger: 'blur' }],
        flag: [{ required: true, message: '还未输入保留字段', trigger: 'blur' }]
      },

      addTitle4: '添加生产阶段信息',
      updateTitle4: '修改生产阶段信息',
      dialog4: [
        { style: 'input', prop: 'id', label: '主键：', place: '请输入主键' },
        { style: 'input', prop: 'phaseCode', label: '生成阶段code：', place: '请输入生成阶段code' },
        { style: 'input', prop: 'phaseDes', label: '映射阶段中文：', place: '请输入映射阶段中文' },
        { style: 'input', prop: 'createUser', label: '创建人：', place: '请输入创建人' },
        { style: 'date', prop: 'createTime', label: '创建时间：', place: '请选择创建时间' },
        { style: 'date', prop: 'updateTime', label: '更新时间：', place: '请选择更新时间' },
        { style: 'input', prop: 'flag', label: '保留字段：', place: '请输入保留字段' }
      ],
      rules4: {
        id: [{ required: true, message: '还未输入主键', trigger: 'blur' }],
        phaseCode: [{ required: true, message: '还未输入生成阶段code', trigger: 'blur' }],
        phaseDes: [{ required: true, message: '还未输入映射阶段', trigger: 'blur' }],
        createTime: [{ required: true, message: '还未选择创建时间', trigger: 'blur' }],
        updateTime: [{ required: true, message: '还未选择更新时间', trigger: 'blur' }],
        createUser: [{ required: true, message: '还未输入创建人', trigger: 'blur' }],
        flag: [{ required: true, message: '还未输入保留字段', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // visible (dialogVisible) {
    //   console.log('父组件1' + dialogVisible)
    //   dialogVisible = false
    //   this.addVisible1 = false
    //   console.log('父组件1' + dialogVisible)
    // },
    // 显示添加对话框
    show1 () {
      this.body = {}
      this.addVisible1 = true
    },
    show2 () {
      this.causation = {}
      this.addVisible2 = true
    },
    show3 () {
      this.part = {}
      this.addVisible3 = true
    },
    show4 () {
      this.phase = {}
      this.addVisible4 = true
    },
    // 显示修改对话框
    showBody () {
      this.updateVisible1 = true
      // this.body = Object.assign({}, row)// 将数据传入dialog页面
    },
    showCausation () {
      this.updateVisible2 = true
    },
    showPart () {
      this.updateVisible3 = true
    },
    showPhase () {
      this.updateVisible4 = true
    },
    // 获取后端数据 搜索
    getBodyList ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      // this.stationPageIndex = pageIndex
      // this.stationPageSize = pageSize
      // const reqParams = {}
      // reqParams.page = this.stationPageIndex
      // reqParams.rows = this.stationPageSize
      // reqParams.pigHouseName = this.houseName
      // pigHouseApi.pigHouseStationList(reqParams)
      //   .then((res) => {
      //     this.loading = false
      //     this.stationData = res.page.rows
      //     this.stationTotal = res.page.total
      //   })
      //   .catch(() => {
      //     this.loading = false
      //   })
    },
    getCausationList () {

    },
    getPartList () {

    },
    getPhaseList () {

    },
    // 添加
    addBody () {
      this.addVisible1 = false
      alert('提交成功')
    },
    addCausation () {
      this.addVisible2 = false
      alert('提交成功')
    },
    addPart () {
      this.addVisible3 = false
      alert('提交成功')
    },
    addPhase () {
      this.addVisible4 = false
      alert('提交成功')
    },

    // 修改
    updateBody () {
      this.updateVisible1 = false
    },
    updateCausation () {
      this.updateVisible2 = false
    },
    updatePart () {
      this.updateVisible3 = false
    },
    updatePhase () {
      this.updateVisible4 = false
    },
    // 删除
    delBody () {

    },
    delCausation () {

    },
    delPart () {

    },
    delPhase () {

    },
    handleClick (tab, event) {
    }
  },
  created () {

  }
}
</script>
<style scoped>
</style>
