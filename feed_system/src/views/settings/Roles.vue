<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="left-content" v-loading="leftLoading">
          <el-card class="card">
            <div slot="header" class="clearfix">
              <span>所有角色</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="showAddModal">
                <i class="el-icon-plus" /> 添加角色
              </el-button>
            </div>
            <div class="content">
              <el-menu :default-active="String(selectedKey)">
                <el-menu-item
                  v-for="(item,index) in treeData"
                  :index="String(index)"
                  :key="item.roleId"
                  @click="hanldeSelect(item,index)"
                >{{ item.roleName }}
                  <div style="display: inline-block;float:right;width: 60px;height: 56px;">
                    <i v-show="index===selectedKey" @click="showUpdateModal" class="el-icon-setting"></i>
                    <i v-show="index===selectedKey" @click="deleteRole" class="el-icon-delete"></i>
                  </div>
                </el-menu-item>
              </el-menu>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="right-card" v-loading="menuLoading">
          <el-row type="flex" style="margin: 10px 0">
              <el-select
                v-model="value"
                placeholder="请选择"
                style="margin: 0 10px"
                @change="hanldeSelectChange">
                <el-option :key="2" :value=" '' " label="全部"></el-option>
                <el-option :key="0" :value="0" label="管理员"></el-option>
                <el-option :key="1" :value="1" label="自定义角色"></el-option>
              </el-select>
          </el-row>

          <el-tabs type="border-card">
            <el-tab-pane label="权限">
              <div style="height:700px;overflow-y:auto;overflow-x:hidden;">
                <div v-for="(item,index) in menuData" :key="item.menuId" class="right-container">
                  <div class="right-header">
                    <el-checkbox
                      v-model="defaultCheck[index]"
                      @change="handleCheckAllChange(index,arguments)"
                      :label="item.menuId"
                      :key="item.menuId"
                      >{{menuData[index].name}}</el-checkbox>
                  </div>
                  <div class="right-content" >
                    <el-checkbox-group
                      v-model="defaultCheck[index]"
                      @change="handleGroupChange(index,arguments)">
                      <div v-if="defaultCheck.length > 0">
                        <el-checkbox
                          v-for="menus in menuData[index].list"
                          :label="menus.menuId"
                          :key="menus.menuId"
                        >{{menus.name}}</el-checkbox>
                      </div>
                    </el-checkbox-group>
                  </div>
              </div>
            </div>
            <el-button type="primary" style="margin-left: 20px;margin-top:5px" @click="doUpdate">保存</el-button>
          </el-tab-pane>
        </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="添加角色" :visible.sync="addVisible" width="30%">
      <el-form :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="remark">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑角色" :visible.sync="updateVisible" width="30%">
      <el-form :model="updateForm" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="updateForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="remark">
          <el-input v-model="updateForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import settingApi from '@/apis/setting'
import { Message } from 'element-ui'
export default {
  name: 'Roles',
  data () {
    return {
      value: '',
      treeData: [],
      leftLoading: false,
      menuData: [],
      menuLoading: false,
      defaultCheck: [], // 初始选中的数据
      defaultAllData: [], // 初始所有数据
      selectedKey: 0,
      checkAll: [], // 菜单参数
      allMenus: [], // 菜单
      selectedMenu: {}, // 当前选中的menu
      addVisible: false, // 添加角色成员
      updateVisible: false, // 编辑角色
      form: {
        roleName: '',
        remark: ''
      },
      updateForm: {
        roleId: '',
        roleName: '',
        remark: '',
        menuIdList: []
      },
      allAdmins: [],
      adminIdChecked: [],
      rules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getAllAdmins (roleId) {
      settingApi
        .allAdminWithRoleChecked({ roleId: roleId })
        .then(res => {
          const tempAdminIdChecked = []
          res.data.forEach(function (item) {
            if (item.roleChecked === 1) {
              tempAdminIdChecked.push(item.id)
            }
          })
          this.adminIdChecked = tempAdminIdChecked
          this.allAdmins = res.data
        })
    },
    hanldeSelectChange (val) {
      this.getRoles(val)
    },
    getRoles (type) {
      this.leftLoading = true
      settingApi.getAllRoles({ type })
        .then(res => {
          this.treeData = res.rows
          this.leftLoading = false
          this.getMenus(res.rows[0].roleId)
          this.selectedMenu = res.rows[0]
          // this.getAllAdmins(res.rows[0].roleId)
          this.selectedKey = 0
        }).catch(() => {
          this.leftLoading = false
        })
      this.$forceUpdate()
    },
    // 点击左侧菜单刷新右侧数据
    hanldeSelect (item, index) {
      // 切换菜单，全选按钮全部置为false
      this.checkAll = []
      this.defaultCheck = []
      for (let i = 0; i < 7; i++) {
        this.defaultCheck[i] = []
      }
      this.$forceUpdate()
      if (index !== this.selectedKey) {
        this.selectedKey = index
        this.getMenus(item.roleId)
      }
      this.selectedMenu = item
      this.$forceUpdate()
    },
    async getMenus (roleId) {
      this.menuLoading = true
      try {
        settingApi.getMenus({ roleId }).then(res => {
          const checkedData = []
          let flag = true
          // TODO 菜单遍历 整理顺序
          for (let i = 0; i < this.defaultAllData.length; i++) {
            res.data.forEach(function(item) {
              if (item.menuId.substr(1, 1) === i + '') {
                flag = false
                const data = item.list.map(item => {
                  return item.menuId
                })
                data.push(item.menuId)
                checkedData.push(data)
              }
            })
            if (flag) {
              checkedData.push([])
            }
            // 必须复位 不然数组长度 和 渲染的菜单长度不一致
            flag = true
          }
          this.defaultCheck = checkedData
          this.menuLoading = false
        })
      } catch (err) {
        this.menuLoading = false
      }
    },
    async getAllMenus () {
      try {
        settingApi.getAllMenus().then(res => {
          this.menuData = res.data
          const allData = res.data.map(item => {
            if (item.list) {
              this.checkAll.push(false)
              const data = item.list.map(item => {
                return item.menuId
              })
              data.push(item.menuId)
              return data
            }
          })
          this.defaultAllData = allData
          this.menuLoading = false
        }).catch(() => {
          this.leftLoading = false
        })
      } catch (err) {
        this.menuLoading = false
      }
    },
    handleCheckAllChange (index, args) {
      this.defaultCheck[index] = args[0] ? this.defaultAllData[index] : []
    },
    handleGroupChange (index, value) {
      // 如果元素个数 是 1 并且 截取之后 等于 本身 说明是 取消 了所有的子选项的勾选
      if (value[0].length === 1 && value[0][0].substr(0, 2) === value[0][0]) {
        this.defaultCheck[index] = []
        this.$forceUpdate()
      } else {
        // 否则执行添加操作 添加前判断父选项是否已经被勾选，如果没有 则把 父选项加进数组
        if (value[0].indexOf(value[0][0].substr(0, 2)) === -1) {
          this.defaultCheck[index].push(value[0][0].substr(0, 2))
        }
      }
    },
    doUpdate () {
      const newArr = this.defaultCheck.flat(Infinity).filter(Boolean)
      if (this.selectedMenu.roleId === 1) {
        Message.warning('超级管理员角色禁止修改！')
        return
      }
      this.menuLoading = true
      settingApi
        .updateRole({
          remark: this.selectedMenu.remark,
          roleId: this.selectedMenu.roleId,
          roleName: this.selectedMenu.roleName,
          menuIdList: newArr
        })
        .then(() => {
          this.menuLoading = false
          Message.success('更新角色成功')
        })
        .catch(() => {
          this.menuLoading = false
        })
    },
    upsertAdminsRoleRef () {
      settingApi.upsertAdminsRoleRef({ roleId: this.selectedMenu.id, adminIds: this.adminIdChecked })
        .then(() => {
          this.menuLoading = false
          Message.success('更新用户成功')
        })
    },
    deleteRole () {
      this.$confirm('是否删除当前角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.selectedMenu.roleId === 1) {
            this.getMenus(this.selectedMenu.roleId)
            Message.warning('超级管理员角色禁止修改！')
            return
          }
          const req = []
          req.push(this.selectedMenu.roleId)
          settingApi.deleteRole(req).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.value = ''
              this.getRoles()
            }
          })
        })
        .catch(() => {
          this.getMenus(this.selectedMenu.roleId)
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    showAddModal () {
      this.addVisible = true
    },
    showUpdateModal () {
      this.updateVisible = true
    },
    handleOk () {
      settingApi.addRole({ ...this.form })
        .then(res => {
          Message.success('角色添加成功')
          // 关闭模态框,刷新左侧数据
          this.addVisible = false
          this.value = ''
          this.getRoles()
        })
        .catch(() => {
          this.leftLoading = false
        })
    },
    handleUpdateOk () {
      settingApi
        .updateRoleBasic(this.updateForm)
        .then(res => {
          Message.success('更新角色成功')
          this.updateVisible = false
          this.value = ''
          this.getRoles()
        })
        .catch(() => {
          this.leftLoading = false
        })
    },
    closeAdd () {
      this.addVisible = false
    }
  },
  created () {
    this.getAllMenus()
    this.getRoles()
  },
  watch: {
    updateVisible: function (newVal, oldVal) {
      if (newVal) {
        // 不用对象赋值，可以消除updateForm和selectedMenu引用关系
        this.updateForm.roleId = this.selectedMenu.roleId
        this.updateForm.roleName = this.selectedMenu.roleName
        this.updateForm.remark = this.selectedMenu.remark
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  min-height: 100vh;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
.right-card {
  border: 1px solid #ebeef5;
  background: #fff;
  color: #303133;
  // padding: 0 20px;
  border-radius: 2px;
  min-height: 100vh;
  padding-bottom: 20px;
}
.right-container {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccccd4;
}
.right-header {
  background: rgba(40, 132, 248, 0.2);
  padding: 20px 10px;
}
.right-content {
  padding: 20px 10px;
  margin-top: 10px;
}
.content {
  text-align: center;
  .el-menu {
    width: auto;
  }
}

  /deep/.el-tabs__nav {
    white-space: nowrap;
    position: relative;
    transition: transform .3s;
    z-index: 2;
    float: right;
  }
</style>
