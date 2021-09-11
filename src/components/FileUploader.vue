<template>
  <div class="upload-container">
    <input type="file" ref="input" class="upload-input" @change="handleFileChange" :multiple="multiple">
    <div class="upload-prompt" @click="$refs.input.click()">
      <span class="upload-label">选择文件</span>
      <span class="upload-text" v-if="!uploaded.length">
        未选择任何文件
      </span>
      <el-tooltip :content="uploadedFileNames" placement="top" class="upload-text" v-else>
        <span>{{uploadedFileNames}}</span>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    uploaded: {
      type: Array,
      default: () => []
    }, // 已上传文件列表
    multiple: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    uploaded(val) {
      if(!val || !val.length) {
        this.$refs.input.value = '';
      }
    }
  },
  computed: {
    uploadedFileNames() {
      let nameList = this.uploaded.map(file => {
        return file.name
      })
      return nameList.join('，')
    }
  },
  methods: {
    handleFileChange(e) {
      let files = e.target.files;
      this.$emit('update:uploaded', [...files]);
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-container {
  border: 1px solid rgba(0, 0, 0, .15);
  padding: 0 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all linear .3s;
  &:hover {
    border: 1px solid $themeColor;
  }
  .upload-prompt {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .upload-input {
    display: none;
  }
  .upload-label {
    color: $themeColor;
    margin-right: 20px;
  }
  .upload-text {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(110, 110, 110, 1);
  }
}
</style>