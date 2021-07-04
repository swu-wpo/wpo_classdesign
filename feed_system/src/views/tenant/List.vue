<template>
  <div>
    <h4>基础饲养计划</h4>
    <el-form :model="ruleForm"
             :inline="false"
             :rules="rules"
             ref="ruleForm"
             label-width="auto">
      <el-row>
        <el-col :span="7">
          <el-form-item label="饲喂计划名称"
                        prop="planName"
                        :rules="[{ required: true, message: '请输入饲喂计划名称' }]">
            <el-input v-model="ruleForm.planName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="胎次"
                        prop="birthParity"
                        :rules="[
              { required: true, message: '请选择胎次', trigger: 'blur' }
            ]">
            <el-select v-model="ruleForm.birthParity"
                       style="wdith:100%;"
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
        <el-col :span="7">
          <el-form-item label="母猪品种"
                        prop="pigVariety"
                        :rules="[
            { required: true, message: '请选择母猪品种', trigger: 'blur' }
            ]">
            <el-select v-model="ruleForm.pigVariety"
                       style="width:100%;"
                       :clearable="true"
                       placeholder="请选择品种">
              <el-option v-for="item in kind"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="配种前A饲喂量"
                        prop="A"
                        :rules="[
              {
                required: true,
                message: '请输入配种前A饲喂量',
                trigger: 'blur'
              }
            ]">
            <el-input v-model="ruleForm.A"
                      @change="getTotal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="配种前B饲喂量"
                        prop="B"
                        :rules="[
              {
                required: true,
                message: '请输入配种前B饲喂量',
                trigger: 'blur'
              }
            ]">
            <el-input v-model="ruleForm.B"
                      @change="getTotal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="配种前总量"
                        prop="totalAB">
            <el-input v-model="ruleForm.totalAB"
                      readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="display: flex; align-items: center; margin-top:20px;">
        <h4>请选择阶段配置详细饲喂计划：</h4>
        <el-radio-group v-model="radio"
                        @change="radioChange">
          <el-radio label="2">配种后</el-radio>
          <el-radio label="4">产仔后</el-radio>
          <el-radio label="5">断奶后</el-radio>
        </el-radio-group>
      </div>
      <div style="margin-bottom: 20px">
        <el-button type="primary"
                   @click="addLine">新增</el-button>
      </div>

      <el-table v-if="radio === '2'"
                :data="ruleForm.list"
                stripe
                border
                style="width: 100%"
                size="">
        <el-table-column type="index"
                         label="序号"
                         width="60"
                         align="center"></el-table-column>
        <el-table-column label="起始天数"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item :prop="'list.' + scope.$index + '.startTime'"
                          :rules="rules.startTime"
                          style="margin:10px 10px 10px -100px">
              <el-input v-model="scope.row.startTime"
                        size="small"
                        :maxlength="30"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="终止天数"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item style="margin:10px 10px 10px -100px"
                          :prop="'list.' + scope.$index + '.endTime'"
                          :rules="rules.endTime">
              <el-input v-model="scope.row.endTime"
                        size="small"
                        :maxlength="30"
                        @change="lastMaxChange(scope.row.endTime, scope.$index)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="饲料A量"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item :prop="'list.' + scope.$index + '.pigwashAQuality'"
                          :rules="rules.pigwashAQuality"
                          style="margin:10px 10px 10px -100px">
              <el-input v-model="scope.row.pigwashAQuality"
                        size="small"
                        :maxlength="30"
                        @change="
                  AChange(
                    scope.row.pigwashAQuality,
                    scope.row.pigwashBQuality,
                    scope.$index
                  )
                "></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="饲料B量"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item :prop="'list.' + scope.$index + '.pigwashBQuality'"
                          :rules="rules.pigwashBQuality"
                          style="margin:10px 10px 10px -100px">
              <el-input v-model="scope.row.pigwashBQuality"
                        size="small"
                        :maxlength="30"
                        @change="
                  BChange(
                    scope.row.pigwashAQuality,
                    scope.row.pigwashBQuality,
                    scope.$index
                  )
                "></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="饲料AB量"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item :prop="'list.' + scope.$index + '.pigwashAbQuality'"
                          style="margin:10px 10px 10px -100px">
              <el-input v-model="scope.row.pigwashAbQuality"
                        readonly></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index)"
                       type="text"
                       size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table v-if="radio === '4'"
                :data="ruleForm.list4"
                stripe
                border
                style="width: 100%">
        <el-table-column type="index"
                         label="序号"
                         width="60"
                         align="center"></el-table-column>
        <el-table-column label="起始天数"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item :prop="'list4.' + scope.$index + '.startTime'"
                          :rules="rules.startTime"
                          style="margin:10px 10px 10px -100px">
              <el-input v-model="scope.row.startTime"
                        size="small"
                        :maxlength="30"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="终止天数"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item :prop="'list4.' + scope.$index + '.endTime'"
                          :rules="rules.endTime"
                          style="margin:10px 10px 10px -100px">
              <el-input v-model="scope.row.endTime"
                        size="small"
                        :maxlength="30"
                        @change="lastMaxChange(scope.row.endTime, scope.$index)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="饲料A量"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item :prop="'list4.' + scope.$index + '.pigwashAQuality'"
                          :rules="rules.pigwashAQuality"
                          style="margin:10px 10px 10px -100px">
              <el-input v-model="scope.row.pigwashAQuality"
                        size="small"
                        :maxlength="30"
                        @change="
                  AChange(
                    scope.row.pigwashAQuality,
                    scope.row.pigwashBQuality,
                    scope.$index
                  )
                "></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="饲料B量"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item :prop="'list4.' + scope.$index + '.pigwashBQuality'"
                          :rules="rules.pigwashBQuality"
                          style="margin:10px 10px 10px -100px">
              <el-input v-model="scope.row.pigwashBQuality"
                        size="small"
                        :maxlength="30"
                        @change="
                  BChange(
                    scope.row.pigwashAQuality,
                    scope.row.pigwashBQuality,
                    scope.$index
                  )
                "></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="饲料AB量"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item :prop="'list4.' + scope.$index + '.pigwashAbQuality'"
                          style="margin:10px 10px 10px -100px">
              <el-input v-model="scope.row.pigwashAbQuality"
                        readonly></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index)"
                       type="text"
                       size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="radio === '5'"
                :data="ruleForm.list5"
                stripe
                border
                style="width: 100%">
        <el-table-column type="index"
                         label="序号"
                         width="60"
                         align="center"></el-table-column>
        <el-table-column label="起始天数"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item :prop="'list5.' + scope.$index + '.startTime'"
                          :rules="rules.startTime"
                          style="margin:10px 10px 10px -100px">
              <el-input v-model="scope.row.startTime"
                        size="small"
                        :maxlength="30"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="终止天数"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item :prop="'list5.' + scope.$index + '.endTime'"
                          :rules="rules.endTime"
                          style="margin:10px 10px 10px -100px">
              <el-input v-model="scope.row.endTime"
                        size="small"
                        :maxlength="30"
                        @change="lastMaxChange(scope.row.endTime, scope.$index)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="饲料A量"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item :prop="'list5.' + scope.$index + '.pigwashAQuality'"
                          :rules="rules.pigwashAQuality"
                          style="margin:10px 10px 10px -100px">
              <el-input v-model="scope.row.pigwashAQuality"
                        size="small"
                        :maxlength="30"
                        @change="
                  AChange(
                    scope.row.pigwashAQuality,
                    scope.row.pigwashBQuality,
                    scope.$index
                  )
                "></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="饲料B量"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item :prop="'list5.' + scope.$index + '.pigwashBQuality'"
                          :rules="rules.pigwashBQuality"
                          style="margin:10px 10px 10px -100px">
              <el-input v-model="scope.row.pigwashBQuality"
                        size="small"
                        :maxlength="30"
                        @change="
                  BChange(
                    scope.row.pigwashAQuality,
                    scope.row.pigwashBQuality,
                    scope.$index
                  )
                "></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="饲料AB量"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-form-item :prop="'list5.' + scope.$index + '.pigwashAbQuality'"
                          style="margin:10px 10px 10px -100px">
              <el-input v-model="scope.row.pigwashAbQuality"
                        readonly></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index)"
                       type="text"
                       size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary"
                 @click="submitForm('ruleForm')"
                 style="float: left; margin-top: 20px">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import feedApi from '../../apis/feed'
import { Message } from 'element-ui'

export default {
  name: 'Dashboard',
  data () {
    return {
      radio: '2',
      ruleForm: {
        list: [
          {
            startTime: 1,
            endTime: '',
            index: 0,
            startPhase: '2',
            pigwashAbQuality: 0,
            pigwashBQuality: 0,
            pigwashAQuality: 0
          }
        ],
        list4: [
          {
            startTime: 1,
            endTime: '',
            index: 0,
            startPhase: '4',
            pigwashAbQuality: 0,
            pigwashBQuality: 0,
            pigwashAQuality: 0
          }
        ],
        list5: [
          {
            startTime: 1,
            endTime: '',
            index: 0,
            startPhase: '5',
            pigwashAbQuality: 0,
            pigwashBQuality: 0,
            pigwashAQuality: 0
          }
        ],

        planName: '',
        birthParity: '',
        pigVariety: '',
        A: '',
        B: '',
        totalAB: ''
      },
      rules: {
        startTime: [
          { required: true, message: '请输入起始天数' },
          { pattern: /^[1-9][0-9]*$/, message: '请输入正整数' },
          { validator: this.validateStart }
        ],

        endTime: [
          { required: true, message: '请输入终止天数' },
          { pattern: /^[1-9][0-9]*$/, message: '请输入正整数' },
          { validator: this.validateEnd }
        ],
        pigwashAQuality: [{ required: true, message: '请输入饲料A量' }],
        pigwashBQuality: [{ required: true, message: '请输入饲料B量' }]
      },
      removeArray: [],
      kind: []
    }
  },
  created () {
    this.getKind()
  },
  methods: {
    BChange (a, b, index) {
      const str = this.getList()
      this.ruleForm[str][index].pigwashAbQuality = Number(a) + Number(b)
    },
    AChange (a, b, index) {
      const str = this.getList()
      this.ruleForm[str][index].pigwashAbQuality = Number(a) + Number(b)
    },
    deleteRow (index) {
      const str = this.getList()

      this.ruleForm[str].splice(index, 1)
    },
    isEmpty (arr) {
      if (arr.length === 0) {
        return true
      }
      return false
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          // 先构造基础数据
          const basicplan = {}
          basicplan.planName = this.ruleForm.planName
          basicplan.birthParity = this.ruleForm.birthParity
          basicplan.pigVariety = this.ruleForm.pigVariety

          // 构造startPhase为1的item数据
          const temp = {}
          temp.startPhase = 1
          temp.startTime = '0'
          temp.endTime = '999'
          temp.pigwashAQuality = this.ruleForm.A
          temp.pigwashBQuality = this.ruleForm.B
          temp.pigwashAbQuality = this.ruleForm.totalAB
          const items = []
          items.push(temp)
          const data = [
            ...items,
            ...this.ruleForm.list,
            ...this.ruleForm.list4,
            ...this.ruleForm.list5
          ]
          if (!this.isEmpty(this.ruleForm.list) && !this.isEmpty(this.ruleForm.list4) && !this.isEmpty(this.ruleForm.list5)) {
            feedApi.add({ items: data, basicplan }).then((res) => {
              Message.success('添加成功')
              this.$router.push({
                path: '/chStaff/list'
              })
            })
          } else {
            Message.error('添加失败')
          }
        } else {
          return false
        }
      })
    }, // 获取母猪品种
    getKind () {
      feedApi.getKind().then((res) => {
        this.kind = res.data
      })
    },
    // 当上一行终止天数变化时，下一行起始天数跟着变化
    lastMaxChange (value, index) {
      const str = this.getList()

      if (this.ruleForm[str][index + 1]) {
        this.ruleForm[str][index + 1].startTime = Number(value) + 1
      }
    },
    getStr () {
      if (this.radio === '2') {
        return 'list.'
      }
      if (this.radio === '4') {
        return 'list4.'
      }
      if (this.radio === '5') {
        return 'list5.'
      }
    },
    getList () {
      if (this.radio === '2') {
        return 'list'
      }
      if (this.radio === '4') {
        return 'list4'
      }
      if (this.radio === '5') {
        return 'list5'
      }
    },
    // 校验起始天数
    // 如果不是第0行，起始天数要大于上一行的终止天数
    validateStart (rule, value, callback) {
      const str = this.getStr()
      const list = this.getList()
      const index = Number(rule.field.split('.')[1])
      // 如果当前行终止天数存在，需再次校验，符合校验移除终止天数的错误提示
      if (this.ruleForm[list][index].endTime) {
        if (Number(value) < Number(this.ruleForm[list][index].endTime)) {
          this.$refs.ruleForm.clearValidate(str + index + '.endTime')
        }
        if (Number(value) > Number(this.ruleForm[list][index].endTime)) {
          callback(new Error('起始天数应小于终止天数'))
        }
        if (
          Number(value) <
          (Number(this.ruleForm[list][index - 1]?.endTime) || -1)
        ) {
          callback(
            new Error(
              `第${Number(index) + 1}行起始天数应大于第${index}行终止天数`
            )
          )
        } else {
          callback()
        }
      } else {
        if (
          Number(value) <
          (Number(this.ruleForm[list][index - 1]?.endTime) || -1)
        ) {
          callback(
            new Error(
              `第${Number(index) + 1}行起始天数应大于第${index}行终止天数`
            )
          )
        } else {
          callback()
        }
      }
    },
    // 校验终止天数
    // 终止大于起始
    validateEnd (rule, value, callback) {
      const str = this.getStr()
      const list = this.getList()
      const index = Number(rule.field.split('.')[1])
      if (this.ruleForm[list][index].startTime) {
        if (Number(value) < Number(this.ruleForm[list][index].startTime)) {
          callback(new Error('终止天数需大于起始天数'))
        } else {
          this.$refs.ruleForm.clearValidate(str + index + '.startTime')
          callback()
        }
      }
    },
    // 新增一行表单
    addLine () {
      const str = this.getList()
      let num = ''
      if (str === 'list') {
        num = '2'
      }
      if (str === 'list4') {
        num = '4'
      }
      if (str === 'list5') {
        num = '5'
      }
      const length = this.ruleForm[str].length
      // 下一行的其实默认为上一行的终止+1
      const lastMax = this.ruleForm[str][length - 1]?.endTime || 0
      const temp = {
        startTime: Number(lastMax) + 1,
        endTime: '',
        index: length,
        startPhase: num,
        pigwashAQuality: 0,
        pigwashBQuality: 0,
        pigwashAbQuality: 0
      }
      this.ruleForm[str].push(temp)
    },
    // 获取总量
    getTotal (value) {
      this.ruleForm.totalAB = Number(this.ruleForm.A) + Number(this.ruleForm.B)
    },
    // 切换表格radio
    radioChange (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>
</style>
