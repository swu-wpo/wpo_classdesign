<template>
  <div>
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="饲喂站统一参数设置"
                   name="first">
        <div class="feedStationParameter">
          <el-form label-width="220px">
            <el-form-item label="无饲料等待时间："
                          prop="fodderlessWaitingtime">
              <el-input v-model="feedStationParameter.fodderlessWaitingtime"
                        :disabled.sync="addVisible"></el-input>
            </el-form-item>
            <el-form-item label="末次投料等待时间："
                          prop="lastfeedWaitingtime">
              <el-input v-model="feedStationParameter.lastfeedWaitingtime"
                        :disabled.sync="addVisible"></el-input>
            </el-form-item>
            <el-form-item label="有效识别时间："
                          prop="identificationValidtime">
              <el-input v-model="feedStationParameter.identificationValidtime"
                        :disabled.sync="addVisible"></el-input>
            </el-form-item>
            <el-form-item label="开门及进入最长时间："
                          prop="maximumAccesstime">
              <el-input v-model="feedStationParameter.maximumAccesstime"
                        :disabled.sync="addVisible"></el-input>
            </el-form-item>
            <el-form-item label="报警前等待时间："
                          prop="alertWaitingtime">
              <el-input v-model="feedStationParameter.alertWaitingtime"
                        :disabled.sync="addVisible"></el-input>
            </el-form-item>
            <el-form-item label="母猪体温异常阈值"
                          prop="temperatureMax">
              <el-input v-model="feedStationParameter.temperatureMax"
                        :disabled.sync="addVisible"></el-input>
            </el-form-item>
            <div style="text-align:center">
              <el-button v-if="editDisplay"
                         @click="feedStationParametersInfoEdit">修改</el-button>
              <div v-bind:style="divDisplay">
                <el-button @click="feedStationParametersInfoUpdate">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="饲喂站信息管理"
                   name="second">
        <el-row>
          <el-col :span="4">
            <el-button @click="showStationInfoAddModel">绑定饲喂站</el-button>
          </el-col>
          <el-col :span="4">
            <el-input v-model="houseName"
                      placeholder="猪舍名"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-search"
                       type="primary"
                       @click="getHouseStationList"></el-button>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-table :data="stationData"
                    style="width: 100%"
                    :stripe="true"
                    :border="true"
                    v-loading="loading">
            <el-table-column prop="feedingStationNumber"
                             align="center"
                             label="饲喂站出厂编号"></el-table-column>
            <el-table-column prop="pigHouseName"
                             align="center"
                             label="饲喂站所属猪舍"></el-table-column>
            <el-table-column prop="location"
                             align="center"
                             label="饲喂站设置于猪舍位置"></el-table-column>
            <el-table-column label="创建时间"
                             align="center">
              <template slot-scope="scope">
                <span>{{scope.row.createTime | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             align="center">
              <template slot-scope="scope">
                <el-button type="text"
                           @click="showStationnfoUpdateModel(scope.row)">修改
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <UucPagination :total="stationTotal"
                         @pagination="getHouseStationList" />
        </el-row>
        <!-- 绑定饲喂站 -->
        <el-dialog title="绑定饲喂站"
                   :visible.sync="addStationVisible"
                   width="40%">
          <el-form label-width="120px">
            <el-form-item label="饲喂站编号："
                          prop="describe">
              <el-input v-model="stationInfo.feedingStationNumber"></el-input>
            </el-form-item>
            <el-form-item label="所属猪舍："
                          prop="describe">
              <el-select v-model="stationInfo.pigHouseId"
                         style="width:100%"
                         filterable
                         placeholder="请选择"
                         @change="houseChanged">
                <el-option v-for="item in houseOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="置于猪舍位置："
                          prop="describe">
              <el-select v-model="stationInfo.id"
                         style="width:100%"
                         filterable
                         placeholder="请选择">
                <el-option v-for="item in stationOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="addStationVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="stationInfoAdd">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 修改饲喂站 -->
        <el-dialog title="修改饲喂站信息"
                   :visible.sync="updateStationVisible"
                   width="40%">
          <el-form label-width="120px">
            <el-form-item label="饲喂站编号："
                          prop="describe">
              <el-input v-model="stationInfo.feedingStationNumber"></el-input>
            </el-form-item>
            <el-form-item label="所属猪舍："
                          prop="describe">
              <el-select v-model="stationInfo.pigHouseId"
                         style="width:100%"
                         filterable
                         placeholder="请选择">
                <el-option v-for="item in houseOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="置于猪舍位置："
                          prop="describe">
              <el-input v-model="stationInfo.location"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="updateStationVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="stationInfoUpdate">确 定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
    <el-divider></el-divider>

  </div>
</template>

<script>
import pigHouseApi from '@/apis/pigfarm/pigfarmSet'
import feedStationApi from '@/apis/pigfarm/feedStationSet'
export default {
  data () {
    return {
      houseName: '', // 搜索内容
      activeName: 'first',
      loading: false,
      addVisible: false,
      editDisplay: true,
      addStationVisible: false,
      updateStationVisible: false,
      stationTotal: 0,
      stationPageIndex: 1,
      stationPageSize: 10,
      divDisplay: {
        display: 'none'
      },
      stationInfo: {
        feedingStationId: '',
        pigHouseId: '',
        pigHouseName: '',
        id: '',
        feedingStationNumber: '',
        location: ''
      },
      stationData: [],
      houseOptions: [],
      stationOptions: [],
      feedStationParameter: {
        pkId: '',
        fodderlessWaitingtime: '',
        lastfeedWaitingtime: '',
        identificationValidtime: '',
        maximumAccesstime: '',
        alertWaitingtime: '',
        initializationTime: '',
        fsId: '',
        temperatureMax: ''
      }
    }
  },
  methods: {
    getHouseStationList ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.stationPageIndex = pageIndex
      this.stationPageSize = pageSize
      const reqParams = {}
      reqParams.page = this.stationPageIndex
      reqParams.rows = this.stationPageSize
      reqParams.pigHouseName = this.houseName
      pigHouseApi.pigHouseStationList(reqParams)
        .then((res) => {
          this.loading = false
          this.stationData = res.page.rows
          this.stationTotal = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    showStationInfoAddModel () {
      this.stationInfo = {}
      this.addStationVisible = true
    },
    showStationnfoUpdateModel (row) {
      this.stationInfo.feedingStationNumber = row.feedingStationNumber
      this.stationInfo.id = row.id
      this.stationInfo.pigHouseName = row.pigHouseName
      this.stationInfo.location = row.location
      this.stationInfo.feedingStationId = row.feedingStationId
      this.stationInfo.pigHouseId = '' + row.pigHouseId
      this.updateStationVisible = true
    },
    getHouseSelectorAll () {
      pigHouseApi.getHouseSelector()
        .then((res) => {
          this.loading = false
          this.houseOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
    },
    stationInfoUpdate () {
      const req = {}
      req.id = this.stationInfo.id
      req.feedingStationNumber = this.stationInfo.feedingStationNumber
      req.location = this.stationInfo.location
      req.feedingStationId = this.stationInfo.feedingStationId
      req.pigHouseId = this.stationInfo.pigHouseId
      pigHouseApi.stationInfoUpdate(req)
        .then((res) => {
          this.loading = false
          this.getHouseStationList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
          this.updateStationVisible = false
          this.$message({
            type: 'success',
            message: '修改饲喂站成功！'
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    stationInfoAdd () {
      const req = {}
      req.id = this.stationInfo.id
      req.pigHouseId = this.stationInfo.pigHouseId
      req.feedingStationNumber = this.stationInfo.feedingStationNumber
      req.location = this.stationInfo.location
      pigHouseApi.stationInfoAdd(req)
        .then((res) => {
          this.loading = false
          this.getHouseStationList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
          this.addStationVisible = false
          this.$message({
            type: 'success',
            message: '绑定饲喂站成功！'
          })
          this.stationInfo = null
        })
        .catch(() => {
          this.loading = false
        })
    },
    stationParametersInfoGet () {
      const req = {}
      feedStationApi.feedStationParameterInfoGet(req)
        .then((res) => {
          this.loading = false
          // this.addVisible4 = false
          this.feedStationParameter = res.feedingStationParameters
          this.addVisible = true
          const divDisplayStyle = {
            display: 'none'
          }
          this.divDisplay = divDisplayStyle
          this.editDisplay = true
        })
        .catch(() => {
          this.loading = false
        })
    },
    feedStationParametersInfoEdit () {
      this.editDisplay = false
      this.addVisible = false
      const divDisplayStyle = {
        display: 'block'
      }
      this.divDisplay = divDisplayStyle
    },
    feedStationParametersInfoUpdate () {
      const req = this.feedStationParameter
      feedStationApi.feedStationParameterInfoUpdate(req)
        .then((res) => {
          this.loading = false
          this.stationParametersInfoGet()
          this.$message({
            type: 'success',
            message: '修改饲喂站参数成功'
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleClick (tab, event) {
    },
    houseChanged (value) {
      const req = { pigHouseId: value }
      // 跟据猪舍id 获取 未被绑定的饲喂站列表
      feedStationApi.locationSelector(req)
        .then((res) => {
          this.loading = false
          this.stationOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  mounted () {
  },
  created () {
    this.stationParametersInfoGet()
    this.getHouseSelectorAll()
    this.getHouseStationList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
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
<style scoped>
.feedStationParameter {
  margin-top: 30px;
}
</style>
