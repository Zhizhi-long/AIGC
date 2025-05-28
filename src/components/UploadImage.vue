<template>
  <div class="image-upload-container">
    <div
      class="upload-area"
      :class="{ 'drag-over': isDragOver }"
      :style="{ width: size, height: size }"
      @click="triggerFileInput"
      @dragover.prevent="handleDragOver"
      @dragenter.prevent="handleDragEnter"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="handleFileChange"
        style="display: none"
      />
      
      <div 
        class="content-wrapper"
        @dragover.stop
        @dragenter.stop
        @dragleave.stop
        @drop.stop
      >
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
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

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
const isDragOver = ref(false)

// 全局防护
const preventGlobalDrag = (e) => {
  if (!e.target.closest('.upload-area')) {
    e.preventDefault();
    e.stopPropagation();
  }
}

onMounted(() => {
  window.addEventListener('dragover', preventGlobalDrag, true)
  window.addEventListener('drop', preventGlobalDrag, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('dragover', preventGlobalDrag, true)
  window.removeEventListener('drop', preventGlobalDrag, true)
})

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

  processImageFile(file)
}

const handleDragEnter = (e) => {
  console.log('Drag enter');
  isDragOver.value = true;
};

const handleDragOver = (e) => {
  // 必须保留这个空函数，即使不做任何操作
  // 这是为了确保drop事件能触发
  e.preventDefault();
  console.log('Drag over');
};

const handleDragLeave = (e) => {
  console.log('Drag leave');
  // 只有当鼠标离开上传区域边界时才取消高亮
  if (!e.currentTarget.contains(e.relatedTarget)) {
    isDragOver.value = false;
  }
};

const handleDrop = (e) => {
  console.log('Drop event', e.dataTransfer.files);
  isDragOver.value = false;
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      processImageFile(file);
    } else {
      emit('upload-error', new Error('请拖拽有效的图片文件'));
    }
  }
};

const processImageFile = (file) => {
  const reader = new FileReader()
  
  reader.onload = (e) => {
    imageUrl.value = e.target.result
    emit('update:modelValue', imageUrl.value)
    emit('upload-success', {
      file,
      url: e.target.result
    })
  }
  
  reader.onerror = () => {
    emit('upload-error', new Error('图片读取失败'))
  }
  
  reader.readAsDataURL(file)
}

const deleteImage = () => {
  imageUrl.value = ''
  fileInput.value.value = ''
  emit('update:modelValue', '')
}
</script>

<style scoped>
.image-upload-container {
  display: inline-block;
}

.upload-area {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

/* 防止内部元素干扰拖拽 */
.upload-area * {
  pointer-events: none;
}

/* 允许删除按钮接收点击事件 */
.delete-overlay, .delete-icon {
  pointer-events: auto;
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