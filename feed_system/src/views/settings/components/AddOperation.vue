<template>
  <div>
    <el-button type="primary" plain @click="visible = true">添加用户</el-button>
    <el-dialog title="添加用户" :visible.sync="visible" width="40%">
      <el-form :model="form" :rules="rules" ref="addAdminForm" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="chname">
          <el-input v-model="form.chname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleIdList">
          <el-select v-model="form.roleIdList" placeholder="请下拉选择角色" multiple>
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible=false">取 消</el-button>
        <el-button type="primary" @click="handleOk('addAdminForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import settingApi from '@/apis/setting'
export default {
  name: 'AddOperation',
  data () {
    return {
      visible: false,
      form: {
        chname: '',
        username: '',
        email: '',
        mobile: '',
        roleIdList: ''
      },
      roles: [],
      rules: {
        chname: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        roleIdList: [{ required: true, message: '请选择角色', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleOk (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          settingApi.addSysUser(this.form)
            .then(res => {
              if (res.code === 0) {
                this.visible = false
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                })
                this.$emit('listenChildEvent', 'child is me')
              } else {
                this.$message({
                  type: 'error',
                  message: '添加失败，错误信息：' + res.msg
                })
              }
            })
        } else {

        }
      })
    }
  },
  created () {
    settingApi.getAllRoles()
      .then(res => {
        const tempRoles = []
        res.rows.forEach(function (item) {
          tempRoles.push({
            label: item.roleName,
            value: item.roleId
          })
        })
        this.roles = tempRoles
      })
  }
}
</script>

<style>
</style>
