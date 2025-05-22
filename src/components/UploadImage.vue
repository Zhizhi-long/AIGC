<template>
  <div class="image-upload-container">
    <div
      class="upload-area"
      :style="{ width: size, height: size }"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="handleFileChange"
        style="display: none"
      />
      
      <template v-if="imageUrl">
        <div class="image-preview">
          <img :src="imageUrl" alt="Uploaded preview" />
          <div class="delete-overlay" @click.stop="deleteImage">
            <span class="delete-icon">×</span>
          </div>
        </div>
      </template>
      
      <template v-else>
        <div class="upload-placeholder">
          <svg class="upload-icon" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          <p class="upload-text">{{ placeholderText }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: '150px'
  },
  placeholderText: {
    type: String,
    default: '点击上传图片'
  }
})

const emit = defineEmits(['update:modelValue', 'upload-success', 'upload-error'])

const fileInput = ref(null)
const imageUrl = ref('')

const triggerFileInput = () => {
  if (imageUrl.value) return // 如果已有图片，点击不触发上传
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 验证文件类型
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!validTypes.includes(file.type)) {
    alert('请上传有效的图片文件 (JPEG, PNG, GIF, WEBP)')
    return
  }

  // 验证文件大小 (2MB限制)
  if (file.size > 2 * 1024 * 1024) {
    alert('图片大小不能超过2MB')
    return
  }

  // 创建预览URL
  const reader = new FileReader()
  reader.onload = (e) => {
    imageUrl.value = e.target.result
    emit('update:modelValue', imageUrl.value)
    emit('upload-success', {
      url: imageUrl.value,
      file: file
    })
  }
  reader.readAsDataURL(file)
}

const deleteImage = () => {
  imageUrl.value = ''
  fileInput.value.value = '' // 重置input
  emit('update:modelValue', '')
}
</script>

<style scoped>
.image-upload-container {
  display: inline-block;
}

.upload-placeholder {
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.upload-icon {
  width: 48px;
  height: 48px;
  fill: #999;
  margin-bottom: 8px;
}

.upload-text {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.image-preview {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-preview:hover .delete-overlay {
  opacity: 1;
}

.delete-icon {
  color: white;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  background-color: #ff4d4f;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
</style>