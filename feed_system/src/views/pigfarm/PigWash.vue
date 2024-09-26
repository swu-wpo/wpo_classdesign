<template>
  <div>
    <el-row><el-button @click="showpigWashInfoAddModel">添加猪饲料品种</el-button></el-row>
    <el-row >
    <el-table
      :data="pigWashData"
      style="width: 100%"
      :stripe="true"
      :border="true"
      v-loading="loading"
      >
      <el-table-column prop="pigwashName" label="饲料名称"></el-table-column>
      <el-table-column prop="manufacturer" label="厂家"></el-table-column>
      <el-table-column prop="unitPrice" label="单价"></el-table-column>
      <el-table-column prop="nutrient" label="营养元素"></el-table-column>
      <el-table-column label="创建时间" >
        <template slot-scope="scope">
          <span >{{scope.row.createTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          <span >{{scope.row.updateTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              type="text"
              @click="showPigWashInfoUpdateModel(scope.row)"
            >修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <UucPagination :total="total" @pagination="getPigWashList" />
  </el-row>
    <el-dialog title="添加饲料种类" :visible.sync="addVisible" width="40%">
      <el-form label-width="120px">
        <el-form-item label="饲料名称：" prop="pigwashName">
          <el-input v-model="pigWashInfo.pigwashName"></el-input>
        </el-form-item>
         <el-form-item label="生产厂家：" prop="manufacturer">
          <el-input v-model="pigWashInfo.manufacturer"></el-input>
        </el-form-item>
        <el-form-item label="单价：" prop="unitPrice">
          <el-input v-model="pigWashInfo.unitPrice"></el-input>
        </el-form-item>
        <el-form-item label="营养元素：" prop="nutrient">
          <el-input v-model="pigWashInfo.nutrient"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="pigWashInfoAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改饲料种类" :visible.sync="addVisible2" width="40%">
      <el-form label-width="120px">
        <el-form-item label="饲料名称：" prop="pigwashName">
          <el-input v-model="pigWashInfo.pigwashName"></el-input>
        </el-form-item>
         <el-form-item label="生产厂家：" prop="manufacturer">
          <el-input v-model="pigWashInfo.manufacturer"></el-input>
        </el-form-item>
        <el-form-item label="单价：" prop="unitPrice">
          <el-input v-model="pigWashInfo.unitPrice"></el-input>
        </el-form-item>
        <el-form-item label="营养元素：" prop="nutrient">
          <el-input v-model="pigWashInfo.nutrient"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="pigWashInfoUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import pigWashApi from '@/apis/pigfarm/pigWash'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      pigWashData: [],
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      addVisible: false,
      addVisible2: false,
      pigWashInfo: {
        pigwashId: '',
        pigwashName: '',
        manufacturer: '',
        unitPrice: '',
        nutrient: ''
      }
    }
  },
  methods: {
    getPigWashList ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const reqParams = {}
      reqParams.page = this.pageIndex
      reqParams.size = this.pageSize
      pigWashApi.pigWashList(reqParams)
        .then((res) => {
          this.loading = false
          this.pigWashData = res.page.rows
          this.total = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    showPigWashInfoUpdateModel (row) {
      this.pigWashInfo.pigwashId = row.pigwashId
      this.pigWashInfo.pigwashName = row.pigwashName
      this.pigWashInfo.manufacturer = row.manufacturer
      this.pigWashInfo.unitPrice = row.unitPrice
      this.pigWashInfo.nutrient = row.nutrient
      this.addVisible2 = true
    },
    pigWashInfoUpdate () {
      const req = {}
      req.pigwashId = this.pigWashInfo.pigwashId
      req.pigwashName = this.pigWashInfo.pigwashName
      req.manufacturer = this.pigWashInfo.manufacturer
      req.unitPrice = this.pigWashInfo.unitPrice
      req.nutrient = this.pigWashInfo.nutrient
      pigWashApi.pigWashUpdate(req)
        .then((res) => {
          this.loading = false
          this.getPigWashList(this.pageIndex, this.pageSize, false)
          this.addVisible2 = false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        })
        .catch(() => {
          this.loading = false
          Message.error('更新失败！')
        })
    },
    showpigWashInfoAddModel () {
      this.pigWashInfo = {}
      this.addVisible = true
    },
    pigWashInfoAdd () {
      const req = {}
      req.pigwashName = this.pigWashInfo.pigwashName
      req.manufacturer = this.pigWashInfo.manufacturer
      req.unitPrice = this.pigWashInfo.unitPrice
      req.nutrient = this.pigWashInfo.nutrient
      pigWashApi.pigWashAdd(req)
        .then((res) => {
          this.loading = false
          this.getPigWashList(this.pageIndex, this.pageSize, false)
          this.addVisible = false
          Message.success('添加饲料种类成功！')
        })
        .catch(() => {
          this.loading = false
          Message.error('新增饲料失败！')
        })
    }
  },
  mounted () {
  },
  created () {
    this.getPigWashList(1, 10, false)
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
