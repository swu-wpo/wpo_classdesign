<template>
  <div>
    <div style="text-align: center">
      <h3>已有饲喂计划</h3>
    </div>
    <div style="margin-bottom: 20px">
      <el-button type="primary"
                 @click="showEdit">修改</el-button>
      <el-button type="danger"
                 @click="deleteItem">删除</el-button>
    </div>
    <el-table ref="table"
              v-loading="loading"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column align="center"
                       type="selection"
                       width="55"> </el-table-column>
      <el-table-column prop="planName"
                       align="center"
                       label="饲喂计划名称"> </el-table-column>
      <el-table-column prop="birthParity"
                       align="center"
                       label="胎次"> </el-table-column>
      <el-table-column prop="pigVariety"
                       align="center"
                       label="品种"
                       :formatter="formatVariety">
      </el-table-column>
      <!--       <el-table-column label="品种">
          <template slot-scope="scope">
            <span >{{scope.row.pigVariety | formatVariety}}</span>
          </template>
      </el-table-column> -->
      <el-table-column align="center"
                       label="配种前基本饲喂量">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="showUpdate(scope.row.id, '1')">
            查看详情
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="配种后基本饲喂量">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="showUpdate(scope.row.id, '2')">
            查看详情
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="产仔后基本饲喂量">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="showUpdate(scope.row.id, '4')">
            查看详情
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="断奶后基本饲喂量"
                       align="center">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="showUpdate(scope.row.id, '5')">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <UucPagination :total="total"
                   @pagination="getList" />
    <el-dialog title="修改饲喂计划"
               :visible.sync="updateVisible"
               width="350px">
      <el-form :model="form"
               ref="form"
               label-width="120px">
        <el-form-item label="饲喂计划名称"
                      prop="planName"
                      :rules="[{ required: true, message: '请输入饲喂计划名称' }]">
          <el-input v-model="form.planName"></el-input>
        </el-form-item>
        <el-form-item label="胎次"
                      prop="birthParity"
                      :rules="[{ required: true, message: '请输入胎次', trigger: 'blur' }]">
          <el-input v-model="form.birthParity"></el-input>
        </el-form-item>
        <el-form-item label="母猪品种">
          <!-- :rules="[
              { required: true, message: '请选择母猪品种', trigger: 'blur' }
            ]" -->
          <el-select v-model="form.pigVariety"
                     style="width:100%"
                     placeholder="请选择">
            <el-option v-for="item in pigVarietyList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submit('form')"
                   :loading="loading1">确 定</el-button>
      </div>

    </el-dialog>

    <el-dialog :title="title"
               :visible.sync="updateAllVisible">
      <div style="margin-bottom: 20px">
        <el-button type="primary"
                   @click="addLine">新增</el-button>
      </div>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px">
        <el-table :data="ruleForm.list"
                  stripe
                  border
                  style="width: 100%"
                  size="mini">
          <el-table-column type="index"
                           label="序号"
                           min-width="20"
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
                           align="center"
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
      </el-form>
      <div slot="footer">
        <el-button @click="updateAllVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitAll('ruleForm')"
                   :loading="loading2">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import feedApi from '../../apis/feed'
import { Message } from 'element-ui'
export default {
  name: 'have',
  data () {
    return {
      ruleForm: {
        list: []
      },
      loading: false,
      loading1: false,
      loading2: false,
      clickPhase: '',
      clickId: '',
      updateAllVisible: false,
      title: '',
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      selected: [],
      updateVisible: false,
      form: {
        planName: '',
        birthParity: '',
        pigVariety: '',
        id: ''
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
      pigVarietyList: []
    }
  },
  created () {
    this.getKind()
    this.getList({})
  },
  methods: {
    getUpdatePigVariety: function () {
      var selectItem = {}
      selectItem = this.pigVarietyList.find(item => {
        return item.value === this.form.pigVetariety
      })
      return selectItem
    },
    formatVariety: function (row) {
      var selectItem = {}
      selectItem = this.pigVarietyList[row.pigVariety - 1]
      return selectItem.label
    },
    getKind () {
      feedApi.getKind().then((res) => {
        this.pigVarietyList = res.data
      })
    },
    submitAll (formName) {
      const formData = this.ruleForm.list
      const realData = formData.map((item) => {
        item.feedingPlanId = this.clickId
        return item
      })
      if (realData.length === 0) {
        Message.error('请确认至少有一条详细饲喂计划！')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading2 = true
          feedApi
            .update(realData)
            .then(() => {
              Message.success('操作成功')
              this.loading2 = false
              this.updateAllVisible = false
              this.getList({})
            })
            .catch(() => {
              this.loading2 = false
            })
        } else {
          return false
        }
      })
    },
    showUpdate (id, index) {
      this.clickPhase = index
      this.clickId = id
      feedApi
        .getDetail({
          feedingPlanId: id,
          startPhase: index,
          page: 1,
          rows: 100
        })
        .then((res) => {
          this.ruleForm.list = res.page.rows
          this.updateAllVisible = true
        })
    },
    BChange (a, b, index) {
      this.ruleForm.list[index].pigwashAbQuality = Number(a) + Number(b)
    },
    AChange (a, b, index) {
      this.ruleForm.list[index].pigwashAbQuality = Number(a) + Number(b)
    },
    deleteRow (index) {
      this.ruleForm.list.splice(index, 1)
    },
    // 当上一行终止天数变化时，下一行起始天数跟着变化
    lastMaxChange (value, index) {
      if (this.ruleForm.list[index + 1]) {
        this.ruleForm.list[index + 1].startTime = Number(value) + 1
      }
    },
    // 校验起始天数
    // 如果不是第0行，起始天数要大于上一行的终止天数
    validateStart (rule, value, callback) {
      const str = 'list.'
      const list = 'list'
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
      const str = 'list.'
      const list = 'list'
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
      const str = 'list'
      const num = this.clickPhase
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
    getList ({ pageIndex = 1, pageSize = 10 }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const param = {}
      param.page = this.pageIndex
      param.rows = this.pageSize
      this.loading = true
      feedApi
        .getList(param)
        .then((res) => {
          this.loading = false
          this.total = res.page.total
          this.tableData = res.page.rows
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleSelectionChange (val) {
      this.selected = val
    },
    showEdit () {
      if (this.selected.length === 0) {
        Message.error('请选择修改条目')
      } else if (this.selected.length > 1) {
        Message.error('一次只能修改一条数据')
      } else {
        this.updateVisible = true
        this.form.planName = this.selected[0].planName
        this.form.birthParity = this.selected[0].birthParity
        /* var selectItem = {}
        selectItem = this.pigVarietyList[this.selected[0].pigVariety - 1] */
        this.form.pigVariety = '' + this.selected[0].pigVariety
        this.form.id = this.selected[0].id
      }
    },
    deleteItem () {
      if (this.selected.length === 0) {
        Message.error('请选择删除条目')
      } else {
        const ids = this.selected.map((item) => item.id)
        feedApi.delete(ids).then(() => {
          Message.success('删除成功')
          this.getList({})
        })
      }
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading1 = true
          feedApi
            .dosubmit({ ...this.form })
            .then(() => {
              Message.success('操作成功')
              this.loading1 = false
              this.updateVisible = false
              this.getList({})
            })
            .catch(() => {
              this.loading1 = false
            })
        } else {
          return false
        }
      })
    }
  },
  filters: {
  }
}
</script>
