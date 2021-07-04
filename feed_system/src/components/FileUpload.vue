<template>
  <el-upload
  class="upload-demo"
  ref="upload"
  :action="baseURL+uploadUrl"
  :headers="headers"
  :multiple="false"
  :limit="1"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="handleSuccess"
  :on-error="handleError"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
  <div slot="tip" class="el-upload__tip">不超过500kb</div>
</el-upload>
</template>

<script>
import { baseURL } from '@/utils/request'
import { getToken } from '@/utils/token'
export default {
  name: 'FileUpload',
  props: {
    uploadUrl: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      fileList: [],
      baseURL: baseURL,
      headers: {
        Authorization: getToken()
      }
    }
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    handlePreview () {},
    handleRemove () {},
    handleSuccess () {},
    handleError: function (err) {
      this.$message.error(JSON.parse(err.message).msg)
      this.fileList = []
    }
  }
}
</script>
