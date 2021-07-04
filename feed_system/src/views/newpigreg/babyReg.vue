<template>
  <div>
    <router-view />
    <el-row>
      <el-button @click="showAddbaby">注册产仔信息</el-button>
    </el-row>
    <br>
    <!-- 表格 -->
    <el-row>
      <el-table :data="tableData"
                border
                stripe
                v-loading="loading"
                style="width: 100%">
        <el-table-column align="center"
                         label="母猪编号">
          <template slot-scope="scope">
            <span>{{scope.row.pigSerialNum}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="配种公猪编号">
          <template slot-scope="scope">
            <span>{{scope.row.boarSerialNum}}</span>
          </template>
        </el-table-column>
        <!--
        <el-table-column label="猪舍编号"
                         align="center">
          <template slot-scope="scope">
            <span>{{scope.row.pigHouseName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="饲喂站编号"
                         align="center">
          <template slot-scope="scope">
            <span>{{scope.row.location}}</span>
          </template>
        </el-table-column>
        -->
        <el-table-column label="胎次"
                         align="center">
          <template slot-scope="scope">
            <span>{{scope.row.birthParity | birthParityFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产仔时间"
                         align="center">
          <template slot-scope="scope">
            <span>{{scope.row.farrowingTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产仔数量"
                         align="center">
          <template slot-scope="scope">
            <span>{{scope.row.farrowingNum}}</span>
          </template>
        </el-table-column>
        <el-table-column label="成活数量"
                         align="center">
          <template slot-scope="scope">
            <span>{{scope.row.survivalNum}}</span>
          </template>
        </el-table-column>
        <el-table-column label="平均体重（kg）"
                         align="center">
          <template slot-scope="scope">
            <span>{{scope.row.avgWeight}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="showUpdatebaby(scope.row)">修改</el-button>
            <el-popconfirm confirmButtonText="确定"
                           cancelButtonText="取消"
                           icon="el-icon-info"
                           iconColor="red"
                           title="确定删除吗？"
                           @confirm="deleteRow(scope.row.id)">
              <el-button slot="reference"
                         type="text"
                         style="margin-left:10px">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <UucPagination :total="total"
                     @pagination="getFarrowingInfo" />
    </el-row>

    <!-- 产仔注册对话框 -->
    <el-dialog title="产仔信息注册"
               :visible.sync="addbabyVisible"
               width="75%">
      <div style="text-align:center">
        <el-form status-icon
                 :inline="false"
                 :model="baby"
                 :rules="srule"
                 ref="baby"
                 label-width="auto"
                 label-position="right"
                 class="demo-ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="母猪编号："
                            prop="pigSerialNum">
                <el-input v-model="baby.pigSerialNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配种公猪编号："
                            prop="boarSerialNum">
                <el-input v-model="baby.boarSerialNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="胎次"
                            prop="birthParity"
                            :rules="[
                  { required: true, message: '请选择胎次', trigger: 'blur' }
                ]">
                <el-select v-model="baby.birthParity"
                           style="width:100%"
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
            <!--
            <el-col :span="8">
              <el-form-item label="猪舍编号："
                            prop="pigHouseId">
                <el-select v-model="baby.pigHouseId"
                           placeholder="请选择猪舍编号"
                           style="width:100%">
                  <el-option v-for="item in houseOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="猪舍位置："
                            prop="feedingStationId">
                <el-select v-model="baby.feedingStationId"
                           style="width:100%"
                           placeholder="请选择饲喂站编号">
                  <el-option v-for="item in stationOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            -->
            <el-col :span="8">
              <el-form-item label="平均体重（kg）："
                            prop="avgWeight">
                <el-input v-model="baby.avgWeight"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产仔时间："
                            prop="farrowingTime">
                <el-date-picker v-model="baby.farrowingTime"
                                style="width:100%"
                                type="date"
                                placeholder="选择出生日期"
                                value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="产仔数量："
                            prop="farrowingNum">
                <el-input v-model="baby.farrowingNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成活数量："
                            prop="survivalNum">
                <el-input v-model="baby.survivalNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addbabyVisible = false">取 消</el-button>
        <el-button @click="resetForm('baby')">重置</el-button>
        <el-button type="primary"
                   @click="submitAddbaby('baby')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改产仔信息对话框 -->
    <el-dialog title="修改产仔信息"
               :visible.sync="updatebabyVisible"
               width="75%">
      <div style="text-align:center">
        <el-form status-icon
                 :inline="false"
                 :model="baby"
                 :rules="srule"
                 ref="baby"
                 label-width="auto"
                 label-position="right"
                 class="demo-ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="母猪编号："
                            prop="pigSerialNum">
                <el-input v-model="baby.pigSerialNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配种公猪编号："
                            prop="boarSerialNum">
                <el-input v-model="baby.boarSerialNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="胎次"
                            prop="birthParity"
                            :rules="[
                  { required: true, message: '请选择胎次', trigger: 'blur' }
                ]">
                <el-select v-model="baby.birthParity"
                           style="width:100%"
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
            <!--
            <el-col :span="8">
              <el-form-item label="猪舍编号："
                            prop="pigHouseId">
                <el-select v-model="baby.pigHouseId"
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
              <el-form-item label="饲喂站编号："
                            prop="feedingStationId">
                <el-select v-model="baby.feedingStationId"
                           style="width:100%"
                           placeholder="请选择饲喂站编号">
                  <el-option v-for="item in stationOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            -->
            <el-col :span="8">
              <el-form-item label="平均体重（kg）："
                            prop="avgWeight">
                <el-input v-model="baby.avgWeight"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产仔时间："
                            prop="pigBirthday">
                <el-date-picker v-model="baby.farrowingTime"
                                style="width:100%"
                                type="date"
                                placeholder="选择出生日期"
                                value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="产仔数量："
                            prop="farrowingNum">
                <el-input v-model="baby.farrowingNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成活数量："
                            prop="survivalNum">
                <el-input v-model="baby.survivalNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="updatebabyVisible = false">取 消</el-button>
        <el-button @click="resetForm('baby')">重置</el-button>
        <el-button type="primary"
                   @click="submitUpdatebaby('baby')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import babyRegApi from '@/apis/newpigreg/BabyReg'
export default {
  data () {
    return {
      loading: false,
      addbabyVisible: false, // 注册对话框显示
      updatebabyVisible: false, // 修改对话框显示
      tableData: [],
      total: 0,
      houseOptions: [],
      stationOptions: [],
      baby: {
        id: '',
        pigSerialNum: '', // 母猪编号
        boarSerialNum: '', // 配种公猪编号
        pigHouseId: '',
        pigHouseName: '', // 猪舍编号
        feedingStationId: '',
        location: '', // 猪栏编号
        birthParity: '', // 胎次
        farrowingTime: '', // 产仔时间
        farrowingNum: '', // 产仔数量
        survivalNum: '', // 成活数量
        avgWeight: '' // 平均体重（kg）
      },
      // 输入提示
      srule: {
        pigSerialNum: [{ required: true, message: '请输入母猪编号', trigger: 'blur' }], // 母猪编号
        boarSerialNum: [{ required: true, message: '请输入配种公猪编号', trigger: 'blur' }], // 配种公猪编号
        pigHouseId: [{ required: true, message: '请选择猪舍', trigger: 'blur' }], // 猪舍
        feedingStationId: [{ required: true, message: '请选择猪栏', trigger: 'blur' }], // 猪栏
        birthParity: [{ required: true, message: '请输入胎次', trigger: 'blur' }], // 胎次
        farrowingTime: [{ required: true, message: '请输入产仔时间', trigger: 'blur' }], // 产仔时间
        farrowingNum: [{ required: true, message: '请输入产仔数量', trigger: 'blur' }], // 产仔数量
        survivalNum: [{ required: true, message: '请输入成活数量', trigger: 'blur' }], // 成活数量
        avgWeight: [{ required: true, message: '请输入平均体重', trigger: 'blur' }] // 平均体重
      }
    }
  },
  computed: {
  },
  methods: {
    getFarrowingInfo ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const reqParams = {}
      reqParams.page = this.pageIndex
      reqParams.rows = this.pageSize
      babyRegApi.farrowingInfoList(reqParams)
        .then((res) => {
          this.loading = false
          this.tableData = res.page.rows
          this.total = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    getSelector () {
      // 猪舍
      babyRegApi.pigHouseSelector()
        .then((res) => {
          this.loading = false
          this.houseOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
      // 猪栏
      babyRegApi.feedingStationSelector()
        .then((res) => {
          this.loading = false
          this.stationOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 显示注册界面
    showAddbaby () {
      this.baby = {}
      this.addbabyVisible = true
    },
    // 提交注册信息
    submitAddbaby (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          babyRegApi.farrowingSave(this.baby)
            .then((res) => {
              if (res.code === 0) {
                this.$message.success('信息录入成功！')
                this.getFarrowingInfo({ pageIndex: this.pageIndex, pageSize: this.pageSize })
                this.baby = {}
              } else {
                this.$message.error('信息录入失败！')
              }
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
          this.addbabyVisible = false
        } else {
          console.log('添加失败!')
          return false
        }
      })
    },
    // 显示修改信息界面
    showUpdatebaby (row) {
      // 显示该行信息
      this.updatebabyVisible = true
      this.baby = row
      this.baby.birthParity = '' + this.baby.birthParity
      this.baby.pigHouseId = '' + this.baby.pigHouseId
      this.baby.feedingStationId = '' + this.baby.feedingStationId
    },
    // 提交修改信息
    submitUpdatebaby (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          babyRegApi.farrowingUpdate(this.baby)
            .then((res) => {
              if (res.code === 0) {
                this.$message.success('修改成功！')
                this.getFarrowingInfo({ pageIndex: this.pageIndex, pageSize: this.pageSize })
                this.baby = {}
              } else {
                this.$message.error('修改失败！')
              }
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
          this.updatebabyVisible = false
        } else {
          console.log('添加失败!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.baby = {}
    },
    deleteRow (id) {
      babyRegApi.farrowingDelete([id])
        .then((res) => {
          if (res.code === 0) {
            this.$message.success('删除成功！')
            this.getFarrowingInfo({ pageIndex: this.pageIndex, pageSize: this.pageSize })
            this.baby = {}
          } else {
            this.$message.error('删除失败！')
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
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
  created () {
    this.getFarrowingInfo({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    this.getSelector()
  },
  filters: {
    birthParityFormat: function (value) {
      const birthArr = ['', '一胎', '二胎', '三胎', '四胎', '四胎及以上']
      return birthArr[value]
    }
  }
}
</script>

<style>
</style>
