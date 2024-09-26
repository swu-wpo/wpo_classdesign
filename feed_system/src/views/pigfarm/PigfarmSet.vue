<template>
  <div>
    <el-row>
      <el-button @click="showhouseInfoAddModel">添加猪舍</el-button>
    </el-row>
    <el-row>
      <el-table :data="pigHouseData"
                style="width: 100%"
                :stripe="true"
                :border="true"
                v-loading="loading">
        <el-table-column prop="pigHouseName"
                         align="center"
                         label="猪舍名"></el-table-column>
        <el-table-column prop="feedingStationNum"
                         align="center"
                         label="饲喂站数量"></el-table-column>
        <el-table-column label="创建时间"
                         align="center">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间"
                         align="center">
          <template slot-scope="scope">
            <span>{{scope.row.updateTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="showhouseInfoUpdateModel(scope.row)">修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <UucPagination :total="houseTotal"
                     @pagination="getHouseList" />
    </el-row>
    <el-dialog title="添加猪舍"
               :visible.sync="addVisible"
               width="40%">
      <el-form label-width="120px">
        <el-form-item label="猪舍名称："
                      prop="describe">
          <el-input v-model="houseInfo.pigHouseName"></el-input>
        </el-form-item>
        <el-form-item label="饲喂站数目："
                      prop="describe">
          <el-input v-model="houseInfo.feedingStationNum"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="houseInfoAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改猪舍"
               :visible.sync="addVisible2"
               width="40%">
      <el-form label-width="120px">
        <el-form-item label="猪舍名："
                      prop="describe">
          <el-input v-model="houseInfo.pigHouseName"></el-input>
        </el-form-item>
        <el-form-item label="饲喂站数目："
                      prop="describe">
          <el-input v-model="houseInfo.feedingStationNum"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addVisible2 = false">取 消</el-button>
        <el-button type="primary"
                   @click="houseInfoUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import pigHouseApi from '@/apis/pigfarm/pigfarmSet'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      pigHouseData: [],
      houseOptions: [],
      houseName: '',
      loading: false,
      houseTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      addVisible: false,
      addVisible2: false,
      addVisible3: false,
      addVisible4: false,
      houseInfo: {
        pigHouseName: '',
        feedingStationNum: '',
        id: ''
      }
    }
  },
  methods: {
    getHouseList ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const reqParams = {}
      reqParams.page = this.pageIndex
      reqParams.rows = this.pageSize
      pigHouseApi.pigHouseList(reqParams)
        .then((res) => {
          // console.log(res)
          this.loading = false
          this.pigHouseData = res.page.rows
          this.houseTotal = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
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
    showhouseInfoUpdateModel (row) {
      this.houseInfo.pigHouseName = row.pigHouseName
      this.houseInfo.id = row.id
      this.houseInfo.feedingStationNum = row.feedingStationNum
      this.addVisible2 = true
    },
    houseInfoUpdate () {
      const req = {}
      req.pigHouseName = this.houseInfo.pigHouseName
      req.id = this.houseInfo.id
      req.feedingStationNum = this.houseInfo.feedingStationNum
      pigHouseApi.houseInfoUpdate(req)
        .then((res) => {
          Message.success('猪舍信息修改成功')
          this.loading = false
          this.getHouseList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
          this.addVisible2 = false
        })
        .catch(() => {
          this.loading = false
          Message.success('猪舍信息修改失败')
        })
    },
    showhouseInfoAddModel () {
      this.houseInfo = {}
      this.addVisible = true
    },
    houseInfoAdd () {
      const req = {}
      req.pigHouseName = this.houseInfo.pigHouseName
      req.feedingStationNum = this.houseInfo.feedingStationNum
      req.id = this.houseInfo.id
      pigHouseApi.houseInfoAdd(req)
        .then((res) => {
          this.loading = false
          this.getHouseList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
          this.addVisible = false
          this.$message({
            type: 'success',
            message: '添加猪舍成功！'
          })
        })
        .catch(() => {
          this.loading = false
        })
    }

  },
  mounted () {
  },
  created () {
    this.getHouseList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    this.getHouseSelectorAll()
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
