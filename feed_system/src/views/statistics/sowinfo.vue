<template>
  <div>
    <router-view />
    <el-form ref="queryForm"
             :model="queryForm">
      <el-form-item style="width:40%;">
        <el-input placeholder="请输入内容"
                  v-model="queryForm.searchTableInfo"
                  class="input-with-select">
          <el-select v-model="queryForm.keySelect"
                     style="width: 130px;"
                     slot="prepend"
                     placeholder="请选择">
            <el-option label="母猪编号"
                       value="pigSerialNum"
                       @click.native.prevent="onRadioChange('pigSerialNum')"></el-option>
            <el-option label="母猪耳标号"
                       value="pigEarTag"
                       @click.native.prevent="onRadioChange('pigEarTag')"></el-option>
            <el-option label="猪舍名"
                       value="pigHouseName"
                       @click.native.prevent="onRadioChange('pigHouseName')"></el-option>
          </el-select>
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="doQuery"></el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-row>
      <el-table :data="tableCoreData"
                border
                stripe
                :show-overflow-tooltip="true"
                v-loading="loading"
                style="width: 100%">
        <el-table-column align="center"
                         label="母猪编号"
                         prop='pigSerialNum'>
          <template slot-scope="scope">
            <span>{{scope.row.pigSerialNum}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="耳标编号"
                         prop='pigEarTag'>
          <template slot-scope="scope">
            <span>{{scope.row.pigEarTag}}</span>
          </template>
        </el-table-column>
        <el-table-column label="猪舍编号"
                         align="center"
                         prop='pigHouseName'>
          <template slot-scope="scope">
            <span>{{scope.row.pigHouseName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="猪栏编号"
                         align="center"
                         prop='location'>
          <template slot-scope="scope">
            <span>{{scope.row.location}}</span>
          </template>
        </el-table-column>
        <el-table-column label="母系编号"
                         align="center"
                         prop='motherSerialNum'>
          <template slot-scope="scope">
            <span>{{scope.row.motherSerialNum}}</span>
          </template>
        </el-table-column>
        <el-table-column label="父系编号"
                         align="center"
                         prop='fatherSerialNum'>
          <template slot-scope="scope">
            <span>{{scope.row.fatherSerialNum}}</span>
          </template>
        </el-table-column>
        <el-table-column label="出生日期"
                         align="center"
                         prop='pigBirthday'>
          <template slot-scope="scope">
            <span>{{scope.row.pigBirthday}}</span>
          </template>
        </el-table-column>
        <el-table-column label="进站日期"
                         align="center"
                         prop="arrivalTime">
          <template slot-scope="scope">
            <span>{{scope.row.arrivalTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="品种"
                         align="center"
                         prop='varietyName'>
          <template slot-scope="scope">
            <span>{{scope.row.varietyName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="体况"
                         align="center"
                         prop='bodyStateDes'>
          <template slot-scope="scope">
            <span>{{scope.row.bodyStateDes}}</span>
          </template>
        </el-table-column>
        <el-table-column label="体重（kg）"
                         align="center"
                         width="100"
                         prop='weight'>
          <template slot-scope="scope">
            <span>{{scope.row.weight}}</span>
          </template>
        </el-table-column>
        <el-table-column label="体检记录"
                         align="center"
                         width="100"
                         prop='health'>
          <template slot-scope="scope">
            <el-button type="text"
                       @click="showPhysicalCheck(scope.row.id)">查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="饲喂计划"
                         align="center"
                         prop='feedPlanName'>
          <template slot-scope="scope">
            <span>{{scope.row.feedPlanName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产计划"
                         align="center"
                         prop='productionPlanName'>
          <template slot-scope="scope">
            <span>{{scope.row.productionPlanName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产阶段"
                         align="center"
                         prop='phaseCode'>
          <template slot-scope="scope">
            <span>{{scope.row.phaseCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="showUpdateSow(scope.row)">修改</el-button>
            <el-popconfirm confirmButtonText="确定"
                           cancelButtonText="取消"
                           icon="el-icon-info"
                           iconColor="red"
                           title="确定删除吗？"
                           @confirm="deleteRow(scope.row)">
              <el-button slot="reference"
                         type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <UucPagination :total="pigTotal"
                   @pagination="getPigInfo" />

    <!-- 修改母猪信息对话框 -->
    <el-dialog title="修改母猪信息"
               :visible.sync="updateSowVisible"
               width="80%">
      <div style="text-align:center">
        <el-form status-icon
                 :inline="false"
                 :model="sow"
                 :rules="srule"
                 ref="sow"
                 label-width="auto"
                 label-position="right"
                 class="demo-ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="母猪编号："
                            prop="pigSerialNum">
                <el-input v-model="sow.pigSerialNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="耳标号："
                            prop="pigEarTag">
                <el-input v-model="sow.pigEarTag"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="父系编号："
                            prop="fatherSerialNum">
                <el-input v-model="sow.fatherSerialNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="母系编号："
                            prop="motherSerialNum">
                <el-input v-model="sow.motherSerialNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="猪舍编号："
                            prop="pigHouseId">
                <el-select v-model="sow.pigHouseId"
                           @change="getFeedingStation($event)"
                           style="width:100%"
                           placeholder="请选择猪舍编号">
                  <el-option v-for="item in houseOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="猪栏编号："
                            prop="feedingStationId">
                <el-select v-model="sow.feedingStationId"
                           style="width:100%"
                           placeholder="请选择猪栏编号">
                  <el-option v-for="item in locationOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="品种："
                            prop="pigVariety">
                <el-select v-model="sow.pigVariety"
                           style="width:100%;"
                           popper-class="s"
                           :popper-append-to-body="false"
                           placeholder="请选择品种">
                  <el-option v-for="item in pigVarietyOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生日期："
                            prop="pigBirthday">
                <el-date-picker v-model="sow.pigBirthday"
                                style="width:100%"
                                type="date"
                                placeholder="选择出生日期"
                                value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="体温（℃）："
                            prop="temperature">
                <el-input v-model="sow.temperature"
                          :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="进站日期："
                            prop="arrivalTime">
                <el-date-picker v-model="sow.arrivalTime"
                                style="width:100%"
                                type="date"
                                placeholder="选择进站日期"
                                value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="体况："
                            prop="bodyState">
                <el-select v-model="sow.bodyState"
                           style="width:100%"
                           placeholder="请选择体况">
                  <el-option v-for="item in bodyStateOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="体重（kg）："
                            prop="weight">
                <el-input v-model="sow.weight"
                          :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="饲喂计划："
                            prop="feedingPlanId">
                <el-select v-model="sow.feedingPlanId"
                           style="width:100%"
                           placeholder="请选择饲喂计划">
                  <el-option v-for="item in feedingPlanIdOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="生产计划："
                            prop="productionPlanId">
                <el-select v-model="sow.productionPlanId"
                           style="width:100%"
                           placeholder="请选择生产计划">
                  <el-option v-for="item in productionPlanIdOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="进站生产阶段："
                            prop="productionPhaseId">
                <el-select v-model="sow.productionPhaseId"
                           style="width:100%"
                           placeholder="请选择生产阶段">
                  <el-option v-for="item in productionPhaseIdOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="updateSowVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitUpdateSow('sow')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看体检记录 -->
    <el-dialog title="体检记录"
               :visible.sync="physicalCheckVisible"
               width="70%"
               @close='closeCheckDialog'>
      <div style="text-align:center">
        <el-table :data="physicalCheckData"
                  border
                  stripe
                  :show-overflow-tooltip="true"
                  v-loading="loading"
                  style="width: 100%">
          <el-table-column align="center"
                           label="耳标编号"
                           prop='pigEarTag'>
            <template slot-scope="scope">
              <span>{{scope.row.pigEarTag}}</span>
            </template>
          </el-table-column>
          <el-table-column label="体重（KG）"
                           align="center"
                           prop='weight'>
            <template slot-scope="scope">
              <span>{{scope.row.weight}}</span>
            </template>
          </el-table-column>
          <el-table-column label="体温（℃）"
                           align="center"
                           prop='temperature'>
            <template slot-scope="scope">
              <span>{{scope.row.temperature}}</span>
            </template>
          </el-table-column>
          <el-table-column label="体检时间"
                           align="center"
                           prop='checkTime'>
            <template slot-scope="scope">
              <span>{{scope.row.checkTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="体检人"
                           align="center"
                           prop='pigBirthday'>
            <template slot-scope="scope">
              <span>{{scope.row.pigBirthday}}</span>
            </template>
          </el-table-column>
        </el-table>
        <UucPagination :total="physicalCheckTotal"
                       @pagination="getPhysicalCheckData" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sowInfoApi from '@/apis/statistics/sowinfo'
export default {
  data() {
    return {
      loading: false,
      updateSowVisible: false, // 修改对话框显示
      physicalCheckVisible: false, // 体检记录显示
      checkPigId: '',
      sow: {
        pigSerialNum: '', // 母猪编号
        pigEarTag: '', // 耳标号
        pigHouseID: '', // 猪舍号
        feedingStationID: '', // 饲喂站号
        motherSerialNum: '', // 母系编号
        fatherSerialNum: '', // 父系编号
        pigBirthday: '', // 出生日期
        arrivalTime: '', // 进站日期
        pigVariety: '', // 品种
        bodyState: '', // 体况
        feedingPlanID: '', // 饲喂计划
        productionPlanId: '', // 生产计划
        pigCircleID: '', // 猪圈编号 未找到
        weight: '', // 体重 未找到
        health: '', // 健康记录 未找到
        productionStage: '' // 生产阶段
      },
      // 表单信息
      queryForm: {
        searchTableInfo: '', // 搜索框中内容默认为空
        keySelect: 'pigSerialNum', // 单选框
        pigSerialNum: '',
        pigEarTag: '',
        pigHouseName: ''
      },
      // 输入提示
      srule: {
        pigSerialNum: [{ required: true, message: '请输入母猪编号', trigger: 'blur' }], // 母猪编号
        pigEarTag: [{ required: true, message: '请输入耳标号', trigger: 'blur' }], // 耳标号
        pigHouseId: [{ required: true, message: '请输入猪舍号', trigger: 'blur' }], // 猪舍号
        feedingStationId: [{ required: true, message: '请选择猪栏编号', trigger: 'blur' }], // 猪栏编号
        motherSerialNum: [{ required: true, message: '请输入母系编号', trigger: 'blur' }], // 母系编号
        fatherSerialNum: [{ required: true, message: '请输入父系编号', trigger: 'blur' }], // 父系编号
        pigBirthday: [{ required: true, message: '请选择出生日期', trigger: 'blur' }], // 出生日期
        arrivalTime: [{ required: true, message: '请选择进站日期', trigger: 'blur' }], // 进站日期
        pigVariety: [{ required: true, message: '请选择品种', trigger: 'blur' }], // 品种
        weight: [{ required: true, message: '请输入体重', trigger: 'blur' }], // 体重
        temperature: [{ required: true, message: '请输入体温', trigger: 'blur' }], // 体温
        bodyState: [{ required: true, message: '请输入体况', trigger: 'blur' }], // 体况
        feedingPlanId: [{ required: true, message: '请选择饲喂计划', trigger: 'blur' }], // 饲喂计划
        productionPlanId: [{ required: true, message: '请选择生产计划', trigger: 'blur' }], // 生产计划
        productionPhaseId: [{ required: true, message: '请选择进展生产阶段', trigger: 'blur' }]// 进站生产阶段
      },
      // 选择日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      tableCoreData: [],
      physicalCheckData: [],
      pigTotal: 0, // 总条数
      physicalCheckTotal: 0,
      pageIndex: 1, // 默认当前页面
      pageSize: 10, // 每页的数据条数
      defaultQueryBody: {
        pageIndex: 1, // 默认当前页面
        pageSize: 10, // 每页的数据条数
        refresh: false
      },
      checkPageIndex: 1, // 默认当前页面
      checkPageSize: 10, // 每页的数据条数
      houseOptions: [], // 猪舍选择
      locationOptions: [], // 猪栏选择
      pigVarietyOptions: [], // 品种
      bodyStateOptions: [], // 体况
      feedingPlanIdOptions: [], // 饲喂计划
      productionPlanIdOptions: [], // 生产计划
      productionPhaseIdOptions: [] // 进站生产阶段
    }
  },
  methods: {
    closeCheckDialog() {
      this.physicalCheckData = []
    },
    showPhysicalCheck(pigId) {
      this.checkPigId = pigId
      this.physicalCheckVisible = true
      this.getPhysicalCheckData({ pageIndex: 1, pageSize: 10, pigId: this.checkPigId })
    },
    // 从后台获取信息
    getPhysicalCheckData({ pageIndex = 1, pageSize = 10, pigId = null }) {
      this.checkPageIndex = pageIndex
      this.checkPageSize = pageSize
      const reqParams = {
        page: this.checkPageIndex,
        rows: this.checkPageSize,
        pigId: this.checkPigId
      }
      sowInfoApi.pigPhysicalCheckInfoList(reqParams)
        .then((res) => {
          this.loading = false
          this.physicalCheckData = res.page.rows
          this.physicalCheckTotal = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 从后台获取信息
    getPigInfo(queryBody) {
      this.pageIndex = queryBody.pageIndex
      this.pageSize = queryBody.pageSize
      const reqParams = {
        page: queryBody.pageIndex,
        rows: queryBody.pageSize
      }
      if (this.queryForm.keySelect === 'pigSerialNum') {
        reqParams.pigSerialNum = this.queryForm.searchTableInfo
      } else if (this.queryForm.keySelect === 'pigHouseName') {
        reqParams.pigHouseName = this.queryForm.searchTableInfo
      } else {
        reqParams.pigEarTag = this.queryForm.searchTableInfo
      }
      sowInfoApi.pigInfoList(reqParams)
        .then((res) => {
          this.loading = false
          this.tableCoreData = res.page.rows
          this.pigTotal = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 取消单选框
    onRadioChange(e) {
      this.queryForm.keySelect = e
    },
    // 显示修改信息界面
    showUpdateSow(row) {
      this.updateSowVisible = true
      // this.sow = Object.assign({}, row)// 将数据传入dialog页面
      this.sow = row
      this.sow.pigVariety = '' + row.pigVariety
      this.sow.pigHouseId = '' + row.pigHouseId
      this.sow.feedingStationId = '' + row.feedingStationId
      this.sow.productionPlanId = '' + row.productionPlanId
      this.sow.productionPhaseId = '' + row.productionPhaseId
      this.sow.feedingPlanId = '' + row.feedingPlanId
    },
    // 提交修改信息
    submitUpdateSow(formName) {
      const reqParams = {}
      reqParams.pageIndex = this.pageIndex
      reqParams.pageSize = this.pageSize
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message({
            type: 'error',
            message: '请检查pig信息是否合法!'
          })
          return false
        }
      })
      sowInfoApi.pigUpdate(this.sow)
        .then((res) => {
          this.loading = false
          this.getPigInfo({ pageIndex: this.pageIndex, pageSize: this.pageSize })
        })
        .catch(() => {
          this.loading = false
        })
      this.updateSowVisible = false
      this.$message({
        type: 'success',
        message: '修改成功!'
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    deleteRow(row) {
      const reqParams = []
      reqParams.push(row.id)
      sowInfoApi.pigDeleteByIds(reqParams)
        .then((res) => {
          this.loading = false
          this.getPigInfo({ pageIndex: this.pageIndex, pageSize: this.pageSize })
        })
        .catch(() => {
          this.loading = false
        })
    },
    getSelector() {
      // variety selector
      sowInfoApi.pigVarietySelector()
        .then((res) => {
          this.loading = false
          this.pigVarietyOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
      // 猪舍
      sowInfoApi.pigHouseSelector()
        .then((res) => {
          this.loading = false
          this.houseOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
      // // 猪栏
      // sowInfoApi.feedingStationSelector()
      //   .then((res) => {
      //     this.loading = false
      //     this.locationOptions = res.data
      //   })
      //   .catch(() => {
      //     this.loading = false
      //   })
      // 饲喂计划
      sowInfoApi.feedingPlanSelector()
        .then((res) => {
          this.loading = false
          this.feedingPlanIdOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
      // 生产计划
      sowInfoApi.productionPlanSelector()
        .then((res) => {
          this.loading = false
          this.productionPlanIdOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
      // 生产阶段
      sowInfoApi.productionPhaseSelector()
        .then((res) => {
          this.loading = false
          this.productionPhaseIdOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
      // 体况
      sowInfoApi.bodyStateSelector()
        .then((res) => {
          this.loading = false
          this.bodyStateOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
    },
    doQuery() {
      this.getPigInfo(this.defaultQueryBody)
    },
    getFeedingStation(val) {
      // 猪栏
      let obj = {}
      obj = this.houseOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.value === val// 筛选出匹配数据
      })
      const req = {}
      req.pigHouseId = val
      req.pigHouseName = obj.label
      // console.log(obj.label)
      sowInfoApi.feedingStationSelector(req)
        .then((res) => {
          this.loading = false
          this.locationOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  created() {
    this.getPigInfo(this.defaultQueryBody)
    this.getSelector()
  },
  computed: {
  }
}
</script>

<style scoped>
.s {
  width: 100% !important;
}
</style>
