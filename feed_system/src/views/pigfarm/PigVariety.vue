<template>
  <div>
    <el-row>
      <el-button @click="showPigVarietyInfoAddModel">添加品种</el-button>
    </el-row>
    <el-row>
      <el-table :data="pigVarietyData"
                style="width: 100%"
                :stripe="true"
                :border="true"
                v-loading="loading">
        <el-table-column prop="varietyName"
                         label="猪品种"
                         align="center"></el-table-column>
        <el-table-column prop="appearance"
                         label="猪外形"
                         align="center"></el-table-column>
        <el-table-column prop="feature"
                         label="猪特征"
                         align="center"></el-table-column>
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
                       @click="showPigVarietyInfoUpdateModel(scope.row)">修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <UucPagination :total="total"
                     @pagination="getPigVarietyList" />
    </el-row>
    <el-dialog title="添加猪品种"
               :visible.sync="addVisible"
               width="40%">
      <el-form label-width="120px">
        <el-form-item label="猪品种："
                      prop="describe">
          <el-input v-model="pigVarietyInfo.varietyName"></el-input>
        </el-form-item>
        <el-form-item label="猪外形："
                      prop="describe">
          <el-input v-model="pigVarietyInfo.appearance"></el-input>
        </el-form-item>
        <el-form-item label="猪特征："
                      prop="describe：">
          <el-input v-model="pigVarietyInfo.feature"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="pigVarietyInfoAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改猪品种"
               :visible.sync="addVisible2"
               width="40%">
      <el-form label-width="120px">
        <el-form-item label="猪品种："
                      prop="describe">
          <el-input v-model="pigVarietyInfo.varietyName"></el-input>
        </el-form-item>
        <el-form-item label="猪外形："
                      prop="describe">
          <el-input v-model="pigVarietyInfo.appearance"></el-input>
        </el-form-item>
        <el-form-item label="猪特征："
                      prop="describe">
          <el-input v-model="pigVarietyInfo.feature"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addVisible2 = false">取 消</el-button>
        <el-button type="primary"
                   @click="pigVarietyInfoUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import pigVarietyApi from '@/apis/pigfarm/pigVariety'
export default {
  data () {
    return {
      pigVarietyData: [],
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      addVisible: false,
      addVisible2: false,
      pigVarietyInfo: {
        pkId: '',
        varietyName: '',
        appearance: '',
        feature: ''
      }
    }
  },
  methods: {
    getPigVarietyList ({ pageIndex = 1, pageSize = 10, refresh = false }) {
      this.pageIndex = pageIndex
      this.pageSize = pageSize
      const reqParams = {}
      reqParams.page = this.pageIndex
      reqParams.rows = this.pageSize
      pigVarietyApi.pigVarietyList(reqParams)
        .then((res) => {
          this.loading = false
          this.pigVarietyData = res.page.rows
          this.total = res.page.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    showPigVarietyInfoUpdateModel (row) {
      this.pigVarietyInfo.pkId = row.pkId
      this.pigVarietyInfo.varietyName = row.varietyName
      this.pigVarietyInfo.feature = row.feature
      this.pigVarietyInfo.appearance = row.appearance
      this.addVisible2 = true
    },
    pigVarietyInfoUpdate () {
      const req = {}
      req.varietyName = this.pigVarietyInfo.varietyName
      req.feature = this.pigVarietyInfo.feature
      req.appearance = this.pigVarietyInfo.appearance
      req.pkId = this.pigVarietyInfo.pkId
      pigVarietyApi.pigVarietyUpdate(req)
        .then((res) => {
          this.loading = false
          this.getPigVarietyList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
          this.addVisible2 = false
          this.$message({
            type: 'success',
            message: '修改母猪品种信息成功！'
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    showPigVarietyInfoAddModel () {
      this.pigVarietyInfo = {}
      this.addVisible = true
    },
    pigVarietyInfoAdd () {
      const req = {}
      req.varietyName = this.pigVarietyInfo.varietyName
      req.feature = this.pigVarietyInfo.feature
      req.appearance = this.pigVarietyInfo.appearance
      pigVarietyApi.pigVarietyAdd(req)
        .then((res) => {
          this.loading = false
          this.getPigVarietyList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
          this.addVisible = false
          this.$message({
            type: 'success',
            message: '添加母猪品种信息成功！'
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
    this.getPigVarietyList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
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
