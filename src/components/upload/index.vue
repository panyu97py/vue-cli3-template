<template>
  <div class="components_upload">
    <el-upload action="https://jsonplaceholder.typicode.com/posts/"
               :class="(displayFileList.length>=limit) && 'components_upload_hiddenUploadIcon'"
               :http-request="uploadImg"
               list-type="picture-card"
               :limit="limit"
               :file-list="displayFileList"
               :on-success="handleSuccess"
               :on-preview="handlePictureCardPreview"
               :on-remove="handleRemove">
      <div class="components_upload_icon">
        <i class="el-icon-plus components_upload_iconPlus"></i>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: ['limit', 'value'],
  computed: {
    displayFileList () {
      if (!this.value) {
        return []
      }
      return this.value.map(url => {
        return {url}
      })
    }
  },
  methods: {
    async uploadImg (item) {
      let formData = new FormData()
      formData.append('uploadFile', item.file)
      console.log(formData)
      const url = await this.$api.bot.fileUpload(formData)
      return url
    },
    handleRemove (file, fileList) {
      this.$emit('input', fileList.map(file => (file.response)))
    },
    handleSuccess (response, file, fileList) {
      this.$emit('input', fileList.map(file => (file.response)))
    },
    handlePictureCardPreview (file) {
      this.$emit('preview', file.url)
    }
  }
}
</script>
<style lang="scss">
@import "index";
</style>
