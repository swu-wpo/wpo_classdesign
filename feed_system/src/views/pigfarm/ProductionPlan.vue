<template>
  <div>
    <router-view />
    <el-row>
      <el-button @click="showAddPlan">新建生产计划</el-button>
      <el-input v-model="searchTableInfo"
                prefix-icon="el-icon-search"
                placeholder="输入内容自动搜索"
                style="width:20%; margin-left:10px; float:right" />
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-table :data="tableData"
                border
                stripe
                :show-overflow-tooltip="true"
                v-loading="loading"
                style="width: 100%">
        <el-table-column align="center"
                         label="生产计划名称"
                         prop="planName">
          <template slot-scope="scope">
            <span>{{scope.row.planName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="胎次"
                         prop="birthParity">
          <template slot-scope="scope">
            <span>{{scope.row.birthParity | formatBirth}}</span>
          </template>
        </el-table-column>
        <el-table-column label="品种"
                         align="center">
          <template slot-scope="scope">
            <span>{{scope.row.varietyName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注"
                         align="center"
                         prop="description">
          <template slot-scope="scope">
            <span>{{scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发情检查周期"
                         align="center"
                         prop='estrusDetectionCycle'>
          <template slot-scope="scope">
            <span>{{scope.row.estrusDetectionCycle}}</span>
          </template>
        </el-table-column>
        <el-table-column label="孕检预测天数"
                         align="center"
                         prop='predictedPregnancyInterval'>
          <template slot-scope="scope">
            <span>{{scope.row.predictedPregnancyInterval}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产仔预测天数"
                         align="center"
                         prop='predictiveBirthInterval'>
          <template slot-scope="scope">
            <span>{{scope.row.predictiveBirthInterval}}</span>
          </template>
        </el-table-column>
        <el-table-column label="断奶预测天数"
                         align="center"
                         prop='predictedWeaningInterval'>
          <template slot-scope="scope">
            <span>{{scope.row.predictedWeaningInterval}}</span>
          </template>
        </el-table-column>
        <el-table-column label="接种疫苗预测天数"
                         align="center"
                         prop='vaccinationInterval'>
          <template slot-scope="scope">
            <span>{{scope.row.vaccinationInterval}}</span>
          </template>
        </el-table-column>
        <el-table-column label="体检预测天数"
                         align="center"
                         prop='physicalExaminationInterval'>
          <template slot-scope="scope">
            <span>{{scope.row.physicalExaminationInterval}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="showUpdatePlan(scope.row)">修改</el-button>
            <el-popconfirm confirmButtonText="确定"
                           cancelButtonText="取消"
                           icon="el-icon-info"
                           iconColor="red"
                           title="确定删除吗？"
                           @onConfirm="deleteRow(scope.$index,tableData)">
              <el-button slot="reference"
                         type="text"
                         style="margin-left:10px">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <UucPagination :total="total"
                   @pagination="getProductionPlanList" />

    <!-- 新建对话框 -->
    <el-dialog title="新建生产计划"
               :visible.sync="addPlanVisible"
               width="60%">
      <div style="text-align:center">
        <el-form status-icon
                 :inline="false"
                 :model="plan"
                 :rules="prule"
                 ref="plan"
                 label-width="auto"
                 label-position="right"
                 class="demo-ruleForm">
          <el-row>
            <el-col :span="10">
              <el-form-item label="生产计划名称："
                            prop="planName">
                <el-input v-model="plan.planName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="胎次："
                            prop="birthParity"
                            :rules="[
                { required: true, message: '请选择胎次', trigger: 'blur' }
              ]">
                <el-select v-model="plan.birthParity"
                           placeholder="请选择胎次">
                  <el-option label="一胎"
                             value="1"></el-option>
                  <el-option label="二胎"
                             value="2"></el-option>
                  <el-option label="三胎"
                             value="3"></el-option>
                  <el-option label="四胎"
                             value="4"></el-option>
                  <el-option label="四胎以上"
                             value="5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="品种："
                            prop="pigVarietyId">
                <el-select v-model="plan.pigVarietyId"
                           placeholder="请选择品种">
                  <el-option v-for="item in varietyOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="发情检查周期："
                            prop="estrusDetectionCycle">
                <el-input v-model="plan.estrusDetectionCycle"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="孕检预测天数："
                            prop="predictedPregnancyInterval">
                <el-input v-model="plan.predictedPregnancyInterval"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="产仔预测天数："
                            prop="predictiveBirthInterval">
                <el-input v-model="plan.predictiveBirthInterval"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="断奶预测天数："
                            prop="predictedWeaningInterval">
                <el-input v-model="plan.predictedWeaningInterval"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="接种疫苗预测天数："
                            prop="vaccinationInterval">
                <el-input v-model="plan.vaccinationInterval"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="体检预测天数："
                            prop="physicalExaminationInterval">
                <el-input v-model="plan.physicalExaminationInterval"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="备注："
                            prop="description">
                <el-input v-model="plan.description"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addPlanVisible = false">取 消</el-button>
        <el-button @click="resetForm('plan')">重置</el-button>
        <el-button type="primary"
                   @click="submitAddPlan('plan')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改生产计划对话框 -->
    <el-dialog title="修改生产计划"
               :visible.sync="updatePlanVisible"
               width="60%">
      <div style="text-align:center">
        <el-form status-icon
                 :inline="false"
                 :model="plan1"
                 :rules="prule"
                 ref="plan1"
                 label-width="auto"
                 label-position="right"
                 class="demo-ruleForm">
          <el-row>
            <el-col :span="10">
              <el-form-item label="生产计划名称："
                            prop="planName">
                <el-input v-model="plan1.planName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="胎次："
                            prop="birthParity"
                            :rules="[
                  { required: true, message: '请选择胎次', trigger: 'blur' }
                ]">
                <el-select v-model="plan1.birthParity"
                           placeholder="请选择胎次">
                  <el-option label="一胎"
                             value="1"></el-option>
                  <el-option label="二胎"
                             value="2"></el-option>
                  <el-option label="三胎"
                             value="3"></el-option>
                  <el-option label="四胎"
                             value="4"></el-option>
                  <el-option label="四胎以上"
                             value="5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="品种："
                            prop="pigVarietyId">
                <el-select v-model="plan1.pigVarietyId"
                           placeholder="请选择品种">
                  <el-option v-for="item in varietyOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="发情检查周期："
                            prop="estrusDetectionCycle">
                <el-input v-model="plan1.estrusDetectionCycle"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="孕检预测天数："
                            prop="predictedPregnancyInterval">
                <el-input v-model="plan1.predictedPregnancyInterval"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="产仔预测天数："
                            prop="predictiveBirthInterval">
                <el-input v-model="plan1.predictiveBirthInterval"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="断奶预测天数："
                            prop="predictedWeaningInterval">
                <el-input v-model="plan1.predictedWeaningInterval"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="接种疫苗预测天数："
                            prop="vaccinationInterval">
                <el-input v-model="plan1.vaccinationInterval"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="体检预测天数："
                            prop="physicalExaminationInterval">
                <el-input v-model="plan1.physicalExaminationInterval"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="备注："
                            prop="description">
                <el-input v-model="plan1.description"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="updatePlanVisible = false">取 消</el-button>
        <el-button @click="resetForm('plan1')">重置</el-button>
        <el-button type="primary"
                   @click="submitUpdatePlan('plan1')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import productionPlanApi from '@/apis/pigfarm/productionPlan'
export default {
  data () {
    return {
      varietyOptions: [],
      parityOptions: [],
      loading: false,
      addPlanVisible: false, // 注册对话框显示
      updatePlanVisible: false, // 修改对话框显示
      plan: {
        taici: '', // 胎次
        birthParity: '', // 胎次~
        varietyName: '', // 品种
        pigVarietyId: '', // 品种id
        planName: '', // 生产计划名称
        description: '', // 备注
        estrusDetectionCycle: '', // 发情检测周期
        predictedPregnancyInterval: '', // 孕检预测天数
        predictiveBirthInterval: '', // 产仔预测天数
        predictedWeaningInterval: '', // 断奶预测天数
        physicalExaminationInterval: '', // 体检预测天数
        vaccinationInterval: '' // 接种疫苗天数
      },
      plan1: {
        taici: '', // 胎次
        birthParity: '', // 胎次
        varietyName: '', // 品种
        pigVarietyId: '', // 品种id
        planName: '', // 生产计划名称
        description: '', // 备注
        estrusDetectionCycle: '', // 发情检测周期
        predictedPregnancyInterval: '', // 孕检预测天数
        predictiveBirthInterval: '', // 产仔预测天数
        predictedWeaningInterval: '', // 断奶预测天数
        physicalExaminationInterval: '', // 体检预测天数
        vaccinationInterval: '' // 接种疫苗天数
      },
      // 输入提示
      prule: {
        taici: [{ required: true, message: '请选择胎次', trigger: 'blur' }], // 胎次
        pigVarietyId: [{ required: true, message: '请选择品种', trigger: 'blur' }], // 品种
        planName: [{ required: true, message: '请输入生产计划名称', trigger: 'blur' }], // 生产计划名称
        description: [{ required: false, message: '请输入备注', trigger: 'blur' }], // 备注
        estrusDetectionCycle: [{ required: true, message: '请输入发情检测周期', trigger: 'blur' }], // 发情检测周期
        predictedPregnancyInterval: [{ required: true, message: '请输入孕检预测天数', trigger: 'blur' }], // 孕检预测天数
        predictiveBirthInterval: [{ required: true, message: '请输入产仔预测天数', trigger: 'blur' }], // 产仔预测天数
        predictedWeaningInterval: [{ required: true, message: '请输入断奶预测天数', trigger: 'blur' }], // 断奶预测天数
        physicalExaminationInterval: [{ required: true, message: '请输入体检预测天数', trigger: 'blur' }], // 体检预测天数
        vaccinationInterval: [{ required: true, message: '请输入接种疫苗天数', trigger: 'blur' }] // 接种疫苗天数
      },
      // 选择日期
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      searchTableInfo: '', // 搜索框中内容默认为空
      getSearchInfo: [] // 搜索后表格中显示的内容
    }
  },
  computed: {
    // 根据计算属性模糊搜索
    tableData () {
      const searchTableInfo = this.searchTableInfo
      if (searchTableInfo) {
        return this.getSearchInfo.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(searchTableInfo.toString().toLowerCase()) > -1
          })
        })
      }
      return this.getSearchInfo
    }
  },
  created () {
    this.getProductionPlanList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    this.getVarietyNameAll()
  },
  methods: {
    getVarietyNameAll () {
      productionPlanApi.getVarietySelector()
        .then((res) => {
          // console.log(res)
          this.loading = false
          this.varietyOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
    },
    getProductionPlanList ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const reqParams = {}
      reqParams.page = this.pageIndex
      reqParams.rows = this.pageSize
      productionPlanApi.productionPlanGet(reqParams)
        .then((res) => {
          // console.log(res)
          this.loading = false
          this.getSearchInfo = res.page.rows
          this.total = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 显示注册界面
    showAddPlan () {
      this.plan = {}
      this.addPlanVisible = true
    },
    // 提交注册信息
    submitAddPlan (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const req = {}
          req.birthParity = this.plan.birthParity
          req.pigVarietyId = this.plan.pigVarietyId
          req.planName = this.plan.planName
          req.description = this.plan.description
          req.estrusDetectionCycle = this.plan.estrusDetectionCycle
          req.predictedPregnancyInterval = this.plan.predictedPregnancyInterval
          req.predictiveBirthInterval = this.plan.predictiveBirthInterval
          req.predictedWeaningInterval = this.plan.predictedWeaningInterval
          req.physicalExaminationInterval = this.plan.physicalExaminationInterval
          req.vaccinationInterval = this.plan.vaccinationInterval

          productionPlanApi.productionPlanAdd(req)
            .then((res) => {
              this.loading = false
              this.addPlanVisible = false
              this.getProductionPlanList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
            })
            .catch(() => {
              this.loading = false
            })
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        } else {
          this.$message.error('添加失败')
          return false
        }
      })
    },
    // 显示修改信息界面
    showUpdatePlan (row) {
      // 显示该行信息
      this.updatePlanVisible = true
      // this.plan1 = Object.assign({}, row)// 将数据传入dialog页面
      this.plan1 = row
      // 渲染select 的label
      this.plan1.birthParity = '' + row.birthParity
      this.plan1.pigVarietyId = '' + row.pigVarietyId
    },
    // 提交修改信息
    submitUpdatePlan (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          productionPlanApi.productionPlanUpdate(this.plan1)
            .then((res) => {
              this.loading = false
              this.updatePlanVisible = false
              this.getProductionPlanList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
            })
            .catch(() => {
              this.loading = false
            })
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        } else {
          this.$message.error('请求数据校验不通过')
          return false
        }
      })
    },
    resetForm (formName) {
      // 如果未绑定可以使用如下注释语句
      // this.$refs[formName].resetFields()
      this.plan1 = {}
      this.plan = {}
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    }
  },
  filters: {
    formatBirth: function (value) {
      var birthArray = ['', '一胎', '二胎', '三胎', '四胎', '四胎及以上']
      return birthArray[value]
    }
  }
}
</script>

<style>
</style>
