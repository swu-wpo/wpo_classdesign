<template>
  <div>
    <router-view />
    <el-row>
      <!-- <el-button @click="showAddEating">添加进食记录</el-button> -->
      <el-form :inline="true"
               :model="form"
               ref="form"
               class="demo-form-inline">

        <el-form-item prop="pigSerialNum"
                      label="根据关键字筛选：">
          <el-input v-model="form.pigSerialNum"
                    placeholder="请输入母猪编号"></el-input>
        </el-form-item>
        <el-form-item prop="startTime">
          <el-date-picker v-model="form.startTime"
                          type="date"
                          value-format="yyyy-MM-dd HH:mm"
                          placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endTime">
          <el-date-picker v-model="form.endTime"
                          type="date"
                          value-format="yyyy-MM-dd HH:mm"
                          placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type='primary'
                     @click="getEatingList">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-table :data="tableCoreData"
                border
                stripe
                :show-overflow-tooltip="true"
                v-loading="loading"
                style="width: 100%">
        <el-table-column align="center"
                         label="母猪编号">
          <template slot-scope="scope">
            <span>{{scope.row.pigSerialNum}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="所在猪舍">
          <template slot-scope="scope">
            <span>{{scope.row.pigHouseName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="猪栏位置">
          <template slot-scope="scope">
            <span>{{scope.row.location}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="进食量">
          <template slot-scope="scope">
            <span>{{scope.row.appetite}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始进食时间"
                         align="center">
          <template slot-scope="scope">
            <span>{{scope.row.startTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束进食时间"
                         align="center">
          <template slot-scope="scope">
            <span>{{scope.row.endTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       style="display:none"
                       @click="showUpdateEating(scope.row)">修改</el-button>
            <el-popconfirm confirmButtonText="确定"
                           cancelButtonText="取消"
                           icon="el-icon-info"
                           iconColor="red"
                           title="确定删除吗？"
                           @confirm="deleteRow(scope.row)">
              <el-button slot="reference"
                         type="text"
                         style="margin-left:10px">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <UucPagination :total="eatingTotal"
                     @pagination="getEatingList" />
    </el-row>

    <!-- 添加进食记录对话框 -->
    <el-dialog title="添加进食记录"
               :visible.sync="addEatingVisible"
               width="40%">
      <div style="text-align:center">
        <el-form status-icon
                 :inline="true"
                 :model="eating"
                 :rules="rules"
                 ref="eating"
                 label-width="120px"
                 label-position="left"
                 class="demo-ruleForm">
          <el-form-item label="耳标号："
                        prop="pigEarTag">
            <el-input v-model="eating.pigEarTag"></el-input>
          </el-form-item>
          <el-form-item label="进食量："
                        prop="appetite">
            <el-input v-model="eating.appetite"></el-input>
          </el-form-item>
          <el-form-item label="开始进食时间："
                        prop="startTime">
            <el-date-picker v-model="eating.startTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束进食时间："
                        prop="endTime">
            <el-date-picker v-model="eating.endTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addEatingVisible = false">取 消</el-button>
        <el-button @click="resetForm('eating')">重置</el-button>
        <el-button type="primary"
                   @click="submitAddEating('eating')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改进食记录对话框 -->
    <el-dialog title="修改进食信息"
               :visible.sync="updateEatingVisible"
               width="40%">
      <div style="text-align:center">
        <el-form status-icon
                 :inline="true"
                 :model="eating"
                 :rules="rules"
                 ref="eating"
                 label-width="120px"
                 label-position="left"
                 class="demo-ruleForm">
          <el-form-item label="耳标号："
                        prop="pigEarTag">
            <el-input v-model="eating.pigEarTag"></el-input>
          </el-form-item>
          <el-form-item label="进食量："
                        prop="appetite">
            <el-input v-model="eating.appetite"></el-input>
          </el-form-item>
          <el-form-item label="开始进食时间："
                        prop="startTime">
            <el-date-picker v-model="eating.startTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束进食时间："
                        prop="endTime">
            <el-date-picker v-model="eating.endTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="updateEatingVisible = false">取 消</el-button>
        <el-button @click="resetForm('eating')">重置</el-button>
        <el-button type="primary"
                   @click="submitUpdateEating('eating')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import eatRecordApi from '@/apis/statistics/eatrecord'
export default {
  data () {
    return {
      tableCoreData: [],
      eatingTotal: 0,
      pageIndex: 1,
      pageSize: 10, // 每页的数据条数
      searchTableInfo: '', // 搜索框中内容默认为空
      getSearchInfo: [], // 搜索后表格中显示的内容
      loading: false,
      addEatingVisible: false, // 注册对话框显示
      updateEatingVisible: false, // 修改对话框显示
      bbtoday: new Date() - 1000 * 24 * 3600 * 2,
      today: new Date(),
      form: {
        endTime: '', // 开始进食时间
        startTime: '', // 结束进食时间
        pigSerialNum: ''// 耳标号
      },
      eating: {
        appetite: 0, // 进食量
        endTime: '', // 开始进食时间
        startTime: '', // 结束进食时间
        pigEarTag: ''// 耳标号
      },
      // 输入提示
      rules: {
        appetite: [{ required: true, message: '请输入进食量', trigger: 'blur' }],
        startTime: [{ required: true, message: '请选择开始进食时间', trigger: 'blur' }],
        endTime: [{ required: true, message: '请选择结束进食时间', trigger: 'blur' }],
        pigEarTag: [{ required: true, message: '请输入耳标号', trigger: 'blur' }]
      },
      // 选择日期
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            // 默认为当天的日期
            picker.$emit('pick', new Date())
          }
        }, {
          text: '前天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 2)
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
      }
    }
  },
  computed: {
    // 根据计算属性模糊搜索
    tableData () {
      return this.getSearchInfo
    }
  },
  created () {
    this.getEatingList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
  },
  methods: {
    format (value) {
      const date = new Date(value)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + MM + '-' + d
    },
    // 是否为空
    isEmpty (arr) {
      if (arr.length === 0) {
        return true // 空
      } else {
        return false // 不为空
      }
    },
    getEatingList ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const reqParams = {}
      reqParams.page = this.pageIndex
      reqParams.rows = this.pageSize
      reqParams.pigSerialNum = this.form.pigSerialNum
      reqParams.startTime = this.form.startTime
      reqParams.endTime = this.form.endTime
      eatRecordApi.pigEatingList(reqParams)
        .then((res) => {
          this.loading = false
          this.tableCoreData = res.page.rows
          this.eatingTotal = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 显示注册界面
    showAddEating () {
      this.eating = {}
      this.addEatingVisible = true
    },
    // 提交注册信息
    submitAddEating (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const req = {}
          req.appetite = this.eating.appetite
          req.pigEarTag = this.eating.pigEarTag
          req.startTime = this.eating.startTime
          req.endTime = this.eating.endTime
          eatRecordApi.pigEatingAdd(req)
            .then((res) => {
              this.loading = false
              this.getEatingList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
              this.addEatingVisible = false
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
    showUpdateEating (row) {
      // 显示该行信息
      this.updateEatingVisible = true
      this.eating = Object.assign({}, row)// 将数据传入dialog页面
    },
    // 提交修改信息
    submitUpdateEating (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const req = this.eating
          eatRecordApi.pigEatingUpdate(req)
            .then((res) => {
              this.loading = false
              this.getEatingList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
              this.updateEatingVisible = false
            })
            .catch(() => {
              this.loading = false
            })
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        } else {
          this.$message.error('添加成功')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    deleteRow (row) {
      const reqParams = []
      reqParams.push(row.id)
      eatRecordApi.recordDeleteByIds(reqParams)
        .then((res) => {
          this.loading = false
          this.getEatingList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  filters: {
    formatDate: function (value) {
      const date = new Date(value)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    }
  }
}
</script>

<style>
</style>
