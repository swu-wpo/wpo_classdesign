<template>
  <div>
    <router-view />
    <el-form :inline="false"
             :model="queryFormInfo"
             label-width="120px"
             ref="pigTransInfo">
      <el-row>
        <el-col :span="7">
          <el-form-item prop="pigSerialNum"
                        label="母猪编号：">
            <el-input v-model="queryFormInfo.pigSerialNum"
                      :clearable="true"
                      placeholder="请输入母猪编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item prop="pigEarTag"
                        label="耳标号：">
            <el-input v-model="queryFormInfo.pigEarTag"
                      :clearable="true"
                      placeholder="请输入耳标号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item prop="pigVariety"
                        label="品种：">
            <el-select v-model="queryFormInfo.pigVariety"
                       style="width: 100%"
                       :clearable="true"
                       placeholder="请选择品种">
              <el-option v-for="item in varietyOptions"
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
          <el-form-item prop="pigHouseName"
                        label="所在猪舍：">
            <el-select v-model="queryFormInfo.pigHouseName"
                       @change="getFeedingStation($event)"
                       style="width: 100%"
                       :clearable="true"
                       placeholder="请选择猪舍编号">
              <el-option v-for="item in houseOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item prop="location"
                        label="猪栏编号：">
            <el-select v-model="queryFormInfo.feedingStationId"
                       style="width: 100%"
                       :clearable="true"
                       placeholder="请选择猪栏编号">
              <el-option v-for="item in locationOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item style='text-align:center;'>
            <el-button type="primary"
                       @click="queryForm">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <el-row>
      <el-table :data="tableData"
                border
                stripe
                :show-overflow-tooltip="true"
                v-loading="loading"
                style="width: 100%">
        <el-table-column label="母猪编号"
                         align="center"
                         prop='pigSerialNum'>
          <template slot-scope="scope">
            <span>{{scope.row.pigSerialNum}}</span>
          </template>
        </el-table-column>
        <el-table-column label="耳标号"
                         align="center"
                         prop='pigEarTag'>
          <template slot-scope="scope">
            <span>{{scope.row.pigEarTag}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="品种"
                         prop='varietyName'>
          <template slot-scope="scope">
            <span>{{scope.row.varietyName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="猪舍编号"
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
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="showUpdate(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <UucPagination :total="pigTransTotal"
                     @pagination="getPigTransList" />
    </el-row>
    <!-- 修改 -->
    <el-dialog title="母猪猪舍信息修改"
               :visible.sync="updateVisible"
               width="40%">
      <el-form label-width="120px"
               :model="pigTransInfo">
        <el-form-item label="母猪编号："
                      prop="pigSerialNum">
          <el-input v-model="pigTransInfo.pigSerialNum"
                    v-bind:disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="耳标号："
                      prop="pigEarTag">
          <el-input v-model="pigTransInfo.pigEarTag"
                    v-bind:disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="pigHouseName"
                      label="所在猪舍：">
          <el-select v-model="pigTransInfo.pigHouseName"
                     @change="getFeedingStation"
                     style="width: 100%"
                     :clearable="true"
                     placeholder="请选择猪舍编号">
            <el-option v-for="item in houseOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="feedingStationId"
                      label="猪栏编号：">
          <el-select v-model="pigTransInfo.feedingStationId"
                     style="width: 100%"
                     :clearable="true"
                     placeholder="请选择猪栏编号">
            <el-option v-for="item in locationOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转栏原因"
                      prop="transferDes">
          <el-input v-model="pigTransInfo.transferDes"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="pigStyInfoUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pigTransApi from '@/apis/businesstodeal/pigtrans'
export default {
  data() {
    return {
      loading: false, // 加载
      locationOptions: [], // 猪栏
      houseOptions: [], // 猪舍选择
      varietyOptions: [], // 品种
      pigTransTotal: 0, // 记录条数
      pageIndex: 1,
      pageSize: 10,
      pigTransInfo: {
        id: '',
        pigHouseName: '', // 所在猪舍
        location: '', // 饲喂站位置
        pigVariety: '',
        pigSerialNum: '',
        pigEarTag: '',
        pigHouseId: '', // 所在猪舍
        feedingStationId: '', // 饲喂站位置
        transferDes: ''
      },
      queryFormInfo: {
        pigHouseName: '', // 所在猪舍
        feedingStationId: '', // 饲喂站位置
        pigVariety: '',
        pigSerialNum: '',
        pigEarTag: ''
      },
      tableData: [],
      updateVisible: false
    }
  },
  computed: {
  },
  methods: {
    getPigTransList({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const reqParams = {
        pigHouseId: this.queryFormInfo.pigHouseName,
        feedingStationId: this.queryFormInfo.feedingStationId,
        pigVariety: this.queryFormInfo.pigVariety,
        pigSerialNum: this.queryFormInfo.pigSerialNum,
        pigEarTag: this.queryFormInfo.pigEarTag,
        page: this.pageIndex,
        rows: this.pageSize
      }
      pigTransApi.pigInfoList(reqParams)
        .then((res) => {
          this.loading = false
          this.tableData = res.page.rows
          this.pigTransTotal = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 是否为空
    isEmpty(arr) {
      if (arr.length === 0) {
        return true
      } else {
        return false
      }
    },
    getSelectorAll() {
      // variety selector
      pigTransApi.pigVarietySelector()
        .then((res) => {
          this.loading = false
          this.varietyOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
      // 猪舍
      pigTransApi.pigHouseSelector()
        .then((res) => {
          this.loading = false
          this.houseOptions = res.data
        })
        .catch(() => {
          this.loading = false
        })
      // // 猪栏
      // pigTransApi.feedingStationSelector()
      //   .then((res) => {
      //     this.loading = false
      //     this.locationOptions = res.data
      //   })
      //   .catch(() => {
      //     this.loading = false
      //   })
    },
    resetForm() {
      this.queryFormInfo = {}
    },
    queryForm() {
      this.getPigTransList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    },
    showUpdate(row) {
      this.updateVisible = true
      this.pigTransInfo = row
      this.pigTransInfo.feedingStationId = this.pigTransInfo.feedingStationId + ''
      this.pigTransInfo.pigHouseId = this.pigTransInfo.pigHouseId + ''
    },
    pigStyInfoUpdate() {
      console.log(this.pigTransInfo)
      pigTransApi.pigStyInfoUpdate(this.pigTransInfo)
        .then((res) => {
          if (res.code === 0) {
            this.$message.success('更新成功！')
            this.updateVisible = false
            this.getPigTransList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
          } else {
            this.$message.error('更新失败！')
          }
        })
        .catch(() => {
          this.loading = false
        })
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
      pigTransApi.feedingStationSelector(req)
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
    this.getPigTransList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    this.getSelectorAll()
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
