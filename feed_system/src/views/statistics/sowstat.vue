<template>
  <div>
    <router-view />

    <el-form ref="form"
             :model="form"
             label-width="auto">
      <el-form-item style="width:50%;">
        <el-input v-model="form.searchTableInfo"
                  prefix-icon="el-icon-search"
                  placeholder="请输入内容自动搜索" />
      </el-form-item>
      <el-form-item label="选择关键字搜索：">
        <el-radio-group v-model="form.keySelect">
          <el-radio label="pigSerialNum"
                    @click.native.prevent="onRadioChange('pigSerialNum')">母猪编号</el-radio>
          <el-radio label="pigEarTag"
                    @click.native.prevent="onRadioChange('pigEarTag')">耳标号</el-radio>
          <el-radio label="pigHouseID"
                    @click.native.prevent="onRadioChange('pigHouseID')">猪舍编号</el-radio>
          <el-radio label="feedingStationID"
                    @click.native.prevent="onRadioChange('feedingStationID')">饲喂站编号</el-radio>
          <el-radio label="pigCircleID"
                    @click.native.prevent="onRadioChange('pigCircleID')">猪圈编号</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-row>
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
                         prop='pigHouseID'>
          <template slot-scope="scope">
            <span>{{scope.row.pigHouseID}}</span>
          </template>
        </el-table-column>
        <el-table-column label="饲喂站编号"
                         align="center"
                         width="70"
                         prop='feedingStationID'>
          <template slot-scope="scope">
            <span>{{scope.row.feedingStationID}}</span>
          </template>
        </el-table-column>
        <el-table-column label="猪圈编号"
                         align="center"
                         prop='pigCircleID'>
          <template slot-scope="scope">
            <span>{{scope.row.pigCircleID}}</span>
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
                         prop='pigVariety'>
          <template slot-scope="scope">
            <span>{{scope.row.pigVariety}}</span>
          </template>
        </el-table-column>
        <el-table-column label="体况"
                         align="center"
                         prop='bodyState'>
          <template slot-scope="scope">
            <span>{{scope.row.bodyState}}</span>
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
        <el-table-column label="健康记录"
                         align="center"
                         width="100"
                         prop='health'>
          <template slot-scope="scope">
            <span>{{scope.row.health}}</span>
          </template>
        </el-table-column>
        <el-table-column label="饲喂计划"
                         align="center"
                         prop='feedingPlanID'>
          <template slot-scope="scope">
            <span>{{scope.row.feedingPlanID}}</span>
          </template>
        </el-table-column>
        <el-table-column label="生产计划"
                         align="center"
                         prop='productionPlanID'>
          <template slot-scope="scope">
            <span>{{scope.row.productionPlanID}}</span>
          </template>
        </el-table-column>
        <el-table-column label="进站生产阶段"
                         align="center"
                         prop='productionStage'>
          <template slot-scope="scope">
            <span>{{scope.row.productionStage}}</span>
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
                           @onConfirm="deleteRow(scope.$index,tableData)">
              <el-button slot="reference"
                         type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-pagination align="center"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10,15,20]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="tableData.length"></el-pagination>

    <!-- 修改母猪信息对话框 -->
    <el-dialog title="修改母猪信息"
               :visible.sync="updateSowVisible"
               width="80%">
      <div style="text-align:center">
        <el-form status-icon
                 :inline="true"
                 :model="sow"
                 :rules="srule"
                 ref="sow"
                 label-width="120px"
                 label-position="left"
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
                            prop="pigHouseID">
                <el-select v-model="sow.pigHouseID"
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
              <el-form-item label="猪圈编号："
                            prop="pigCircleID">
                <el-select v-model="sow.pigCircleID"
                           placeholder="请选择猪圈编号">
                  <el-option v-for="item in pigCircleOptions"
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
              <el-form-item label="饲喂站编号："
                            prop="feedingStationID">
                <el-select v-model="sow.feedingStationID"
                           placeholder="请选择饲喂站编号">
                  <el-option v-for="item in stationOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="品种："
                            prop="pigVariety">
                <el-select v-model="sow.pigVariety"
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
                                type="date"
                                placeholder="选择出生日期"
                                :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="进站日期："
                            prop="arrivalTime">
                <el-date-picker v-model="sow.arrivalTime"
                                type="date"
                                placeholder="选择进站日期"
                                :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="体况："
                            prop="bodyState">
                <el-select v-model="sow.bodyState"
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
                <el-input v-model="sow.weight"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="健康记录："
                            prop="health">
                <el-input v-model="sow.health"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="生产计划："
                            prop="productionPlanID">
                <el-select v-model="sow.productionPlanID"
                           placeholder="请选择生产计划">
                  <el-option v-for="item in productionPlanIDOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="进站生产阶段："
                            prop="productionStage">
                <el-select v-model="sow.productionStage"
                           placeholder="请选择生产阶段">
                  <el-option v-for="item in productionStageOptions"
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
              <el-form-item label="饲喂计划："
                            prop="feedingPlanID">
                <el-select v-model="sow.feedingPlanID"
                           placeholder="请选择饲喂计划">
                  <el-option v-for="item in feedingPlanIDOptions"
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
        <el-button @click="resetForm('sow')">重置</el-button>
        <el-button type="primary"
                   @click="submitUpdateSow('sow')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      updateSowVisible: false, // 修改对话框显示
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
        productionPlanID: '', // 生产计划
        pigCircleID: '', // 猪圈编号 未找到
        weight: '', // 体重 未找到
        health: '', // 健康记录 未找到
        productionStage: '' // 进站生产阶段 未找到
      },
      // 表单信息
      form: {
        searchTableInfo: '', // 搜索框中内容默认为空
        keySelect: ''// 单选框
      },
      // 输入提示
      srule: {
        health: [{ required: true, message: '请输入健康记录', trigger: 'blur' }],
        pigSerialNum: [{ required: true, message: '请输入母猪编号', trigger: 'blur' }], // 母猪编号
        pigEarTag: [{ required: true, message: '请输入耳标号', trigger: 'blur' }], // 耳标号
        pigHouseID: [{ required: true, message: '请输入猪舍号', trigger: 'blur' }], // 猪舍号
        pigCircleID: [{ required: true, message: '请输入猪圈编号', trigger: 'blur' }], // 猪圈编号 未找到
        feedingStationID: [{ required: true, message: '请输入饲喂站编号', trigger: 'blur' }], // 饲喂站号
        motherSerialNum: [{ required: true, message: '请输入母系编号', trigger: 'blur' }], // 母系编号
        fatherSerialNum: [{ required: true, message: '请输入父系编号', trigger: 'blur' }], // 父系编号
        pigBirthday: [{ required: true, message: '请选择出生日期', trigger: 'blur' }], // 出生日期
        arrivalTime: [{ required: true, message: '请选择进站日期', trigger: 'blur' }], // 进站日期
        pigVariety: [{ required: true, message: '请输入品种', trigger: 'blur' }], // 品种
        weight: [{ required: true, message: '请输入体重', trigger: 'blur' }], // 体重
        bodyState: [{ required: true, message: '请输入体况', trigger: 'blur' }], // 体况
        feedingPlanID: [{ required: true, message: '请选择饲喂计划', trigger: 'blur' }], // 饲喂计划
        productionPlanID: [{ required: true, message: '请选择生产计划', trigger: 'blur' }], // 生产计划
        productionStage: [{ required: true, message: '请选择进展生产阶段', trigger: 'blur' }]// 进站生产阶段
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
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 5, // 每页的数据条数
      currpage: 1, // 默认当前页面
      getSearchInfo: [], // 搜索后表格中显示的内容

      stationOptions: [], // 饲喂站选择
      houseOptions: [], // 猪舍选择
      pigCircleOptions: [], // 猪圈选择
      pigVarietyOptions: [], // 品种
      bodyStateOptions: [], // 体况
      feedingPlanIDOptions: [], // 饲喂计划
      productionPlanIDOptions: [], // 生产计划
      productionStageOptions: [] // 进站生产阶段
    }
  },
  computed: {
    // 根据计算属性模糊搜索 返回数组
    tableData () {
      const keySelect = this.form.keySelect
      // console.log(keySelect)
      const searchTableInfo = this.form.searchTableInfo
      // console.log(searchTableInfo)
      if (searchTableInfo) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 不会对空数组进行检测,不会改变原始数组。
        return this.getSearchInfo.filter(data => {
          // some() 方法用于检测数组中的元素是否满足指定条件;会依次执行数组的每个元素：
          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;如果没有满足条件的元素，则返回false。
          // Object.keys()---如果处理对象，将返回一个可进行枚举的属性数组，注意，是返回一个数组，是通过属性名组成的数组
          // Object.keys()---参数：要返回其枚举自身属性的对象；  返回值：一个表示给定对象的所有可枚举属性的字符串数组
          return Object.keys(data).some(key => {
            if (keySelect) {
              // 如果有关键字，那么应该在该列中匹配
              return String(data[keySelect]).toLowerCase().indexOf(searchTableInfo.toString().toLowerCase()) > -1
            } else {
              // console.log(key)
              // indexOf的意思是判断一个字符或者字符串在不在另外一个字符串中，如果在，返回大于等于0的数字，若不在，返回小于0的数字
              return String(data[key]).toLowerCase().indexOf(searchTableInfo.toString().toLowerCase()) > -1
              // return String(data[key]).indexOf(searchTableInfo) > -1
            }
          })
        })
      }
      return this.getSearchInfo
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    // labelHead (h, { column, index }) {
    //   const l = column.label.length
    //   const f = 16 // 每个字大小，其实是每个字的比例值，大概会比字体大小差不多大一点，
    //   column.minWidth = f * (l + 2)// 字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度
    //   // 然后将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
    //   return h('div', { class: 'table-head', style: { width: '100%' } }, [column.label])
    // },

    // 从后台获取信息
    getInfo () {
      const Data = [
        // {
        //   pigSerialNum: 'sdsdsdsd', // 母猪编号
        //   pigEarTag: '222', // 耳标号
        //   pigHouseID: 'sds', // 猪舍号
        //   pigCircleID: '0', // 猪圈编号 未找到
        //   feedingStationID: '1', // 饲喂站号
        //   motherSerialNum: '1', // 母系编号
        //   fatherSerialNum: '1', // 父系编号
        //   pigBirthday: '1', // 出生日期
        //   arrivalTime: '1', // 进站日期
        //   pigVariety: '1', // 品种
        //   weight: '1', // 体重
        //   bodyState: '1', // 体况
        //   feedingPlanID: '1', // 饲喂计划
        //   productionPlanID: '1', // 生产计划
        //   productionStage: '1', // 进站生产阶段
        //   health: '健康'
        // },
        // {
        //   pigSerialNum: 'sdsdsdsd', // 母猪编号
        //   pigEarTag: '222', // 耳标号
        //   pigHouseID: 'sds', // 猪舍号
        //   pigCircleID: '0', // 猪圈编号 未找到
        //   feedingStationID: '1', // 饲喂站号
        //   motherSerialNum: '1', // 母系编号
        //   fatherSerialNum: '1', // 父系编号
        //   pigBirthday: '1', // 出生日期
        //   arrivalTime: '1', // 进站日期
        //   pigVariety: '1', // 品种
        //   weight: '1', // 体重
        //   bodyState: '1', // 体况
        //   feedingPlanID: '1', // 饲喂计划
        //   productionPlanID: '1', // 生产计划
        //   productionStage: '1', // 进站生产阶段
        //   health: '健康'
        // }
      ]
      this.getSearchInfo = Data
    },
    // 取消单选框
    onRadioChange (e) {
      // 当点击已经选中的把 activeModel 置空，就是取消选中，并返回
      if (this.form.keySelect === e) {
        this.form.keySelect = ''
        return
      }
      // 不是选中，选中当前点击 Radio
      this.form.keySelect = e
      // 选中操作
    },
    // 显示修改信息界面
    showUpdateSow (row) {
      // 显示该行信息
      this.updateSowVisible = true
      this.sow = Object.assign({}, row)// 将数据传入dialog页面
    },
    // 提交修改信息
    submitUpdateSow (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('修改成功!')
          this.updateSowVisible = false
        } else {
          console.log('修改失败!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
  }
}
</script>

<style scoped>
</style>
