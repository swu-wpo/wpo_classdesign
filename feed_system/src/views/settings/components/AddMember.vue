<template>
  <div>
    <el-button type="text" @click="visible = true">添加角色成员</el-button>
    <el-dialog
      title="添加角色成员"
      :visible.sync="visible"
      width="40%"
      :destroy-on-close="true"
      :before-close="beforeClose"
    >
      <h3>已选成员</h3>
      <div class="content">
        <el-tag
          v-for="tag in showContent"
          :key="tag.id"
          closable
          type="info"
          style="margin-right: 15px;margin-bottom:10px"
          @close="closeTag(tag.id)"
        >{{tag.userName}}</el-tag>
      </div>
      <h3>选择成员</h3>
      <el-checkbox-group v-model="checkedMembers" @change="handleChecked">
        <el-row>
          <el-col
            v-for="member in allMembers"
            :key="member.id"
            :span="6"
            style="margin-bottom: 15px"
          >
            <el-checkbox :label="member.id">{{member.userName}}</el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import settingApi from '@/apis/setting'
import { Message } from 'element-ui'
export default {
  name: 'AddMember',
  props: {
    roleId: {
      type: Number,
      required: false
    },
    type: { required: true }
  },
  data () {
    return {
      visible: false,
      form: {
        name: '',
        describe: ''
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        describe: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      checkedMembers: [], // 默认选中的人员
      allMembers: [], // 全部人员
      cacheChecked: [], // 缓存默认选中人员,下次打开模态框默认显示,
      showContent: [] // 上方div展示内容
    }
  },
  methods: {
    getList () {
      settingApi
        .getMembers({
          roleId: this.roleId
        })
        .then(res => {
          this.allMembers = res.data
          const checked = res.data.map(item => {
            if (item.roleChecked) {
              return item.id
            }
          })
          this.checkedMembers = checked
          this.cacheChecked = checked
          console.log(this.checkedMembers)
        })
    },
    handleChecked (val) {
      console.log(val)
    },
    handleCancel () {
      this.visible = false
      this.checkedMembers = this.cacheChecked
    },

    handleOk () {
      settingApi
        .addMembers({
          adminIds: this.checkedMembers.filter(Boolean),
          roleId: this.roleId
        })
        .then(() => {
          Message.success('添加角色成员成功')
          this.visible = false
          this.$emit('refreshPage', this.type)
        })
    },
    closeTag (val) {
      this.showContent.map((item, index) => {
        if (item.id === val) {
          this.showContent.splice(index, 1)
          const position = this.checkedMembers.indexOf(val)
          this.checkedMembers.splice(position, 1)
        }
      })
    },
    beforeClose () {
      this.visible = false
      this.checkedMembers = this.cacheChecked
    }
  },
  watch: {
    roleId () {
      this.getList()
    },
    checkedMembers () {
      const res = this.allMembers.map(item => {
        return this.checkedMembers.map(checked => {
          if (checked === item.id) {
            return item
          }
        })
      })
      const filterRes = res.flat(Infinity).filter(Boolean)
      this.showContent = filterRes
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 150px;
  border: 1px solid rgba(212, 212, 212, 1);
}
</style>
