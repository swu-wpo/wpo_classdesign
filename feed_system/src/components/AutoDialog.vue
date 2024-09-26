<template>
  <el-dialog :title="dialogTitle"
             :visible.sync="dialogVisible"
             :width="dialogWidth">
    <el-form label-position="right"
             class="demo-ruleForm"
             :inline="false"
             :label-width="label"
             :model="form"
             :rules="rules"
             ref='dialogCom'>
      <el-row v-for="(page, index) in pages"
              :key="index">
        <el-col :span="layout.span"
                v-for="(item,index) in page"
                :key="index">
          <el-form-item :key="index"
                        :label="item.label"
                        :prop="item.prop">
            <div v-if="item.style==='input'">
              <el-input v-model="form[item.prop]"
                        :clearable="true"
                        :placeholder="item.place">></el-input>
            </div>
            <div v-else-if="item.style==='select'">
              <el-select v-model="form[item.prop]"
                         filterable
                         :clearable="true"
                         :placeholder="item.place">
                <el-option v-for="i in item.options"
                           :key="i.value"
                           :label="i.label"
                           :value="i.label">
                </el-option>
              </el-select>
            </div>
            <div v-else-if="item.style==='date'">
              <el-date-picker v-model="form[item.prop]"
                              style="width:100%"
                              :clearable="true"
                              type="date"
                              :placeholder="item.place"
                              value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <!-- <el-button @click="visible(dialogVisible)">取 消</el-button> -->
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary"
                 @click="submitForm">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'AutoDialog',
  // 传入的数据
  props: {
    layout: {
      type: Object,
      default: function () {
        return { column: 3, span: 7 }
      }
    },
    visible: {
      type: Boolean,
      default: false
    },
    data: { // 对话框内容
      type: Array,
      default: function () {
        return []
      }
    },
    dialogTitle: { // 对话框标题
      type: String,
      default: '对话框标题'
    },
    dialogWidth: { // 对话框宽度
      type: String,
      default: '79%'
    },
    form: { // 表单model
      type: Object,
      default: function () {
        return {}
      }
    },
    rules: { // 表单验证
      type: Object,
      default: function () {
        return {}
      }
    },
    label: { // 表单标签宽度
      type: String,
      default: 'auto'
    },
    submitForm: { // 提交按键
      type: Function,
      default: function () {

      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.dialogCom.resetFields()
    }
  },
  computed: {
    dialogVisible: {
      get () {
        return this.visible
      },
      set (val) {
        // console.log(val)
        this.$emit('update:visible', val) // dialogVisible改变的时候通知父组件
      }
    },
    pages () {
      const pages = []
      this.data.forEach((item, index) => {
        const page = Math.floor(index / this.layout.column)// 4代表4条为一行，随意更改
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      // for (const i in pages) {
      //   console.log(pages[i])
      //   for (const j in pages[i]) {
      //     console.log(pages[i][j])
      //   }
      // }

      return pages
    }
  },
  mounted () {

  }

}

</script>
