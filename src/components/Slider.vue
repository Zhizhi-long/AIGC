<template>
  <div class="fullscreen-comparison-carousel">
    <!-- 轮播容器 -->
    <div class="carousel-container" ref="carousel">
      <!-- 每组对比图片 -->
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="comparison-item"
        :class="{ active: currentIndex === index }"
      >
        <!-- 对比组件 -->
        <div class="comparison-container" ref="container">
          <div class="image-wrapper" :style="wrapperStyle">
            <!-- Before 图片 -->
            <img 
              class="image-before" 
              :src="item.before" 
              :style="getBeforeStyle(index)"
              @load="handleImageLoad"
            />
            
            <!-- After 图片 -->
            <img 
              class="image-after" 
              :src="item.after"
              @load="handleImageLoad"
            />
            
            <!-- 可拖动的分割线 -->
            <div 
              class="divider" 
              :style="getDividerStyle(index)"
              @mousedown="(e) => startDrag(e, index)"
              @touchstart="(e) => startDrag(e, index)"
            >
              <div class="divider-handle">
                <span class="handle-label label-before">Before&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <img src="../assets/Eyes.png" />
                <span class="handle-label label-after">After&nbsp;&nbsp;&nbsp;</span>
              </div>
            </div>

            <!-- 轮播导航 - 放在图片内部下方 -->
            <div class="carousel-nav">
              <button @click="prev" :disabled="currentIndex === 0">‹</button>
              <div class="nav-dots">
                <button
                  v-for="(_, idx) in items"
                  :key="idx"
                  @click="goTo(idx)"
                  :class="{ active: currentIndex === idx }"
                ></button>
              </div>
              <button @click="next" :disabled="currentIndex === items.length - 1">›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: value => value.every(item => item.before && item.after)
  },
  initialPosition: {
    type: Number,
    default: 50
  },
  autoPlayInterval: {
    type: Number,
    default: 5000 // 默认5秒自动切换
  }
})

const currentIndex = ref(0)
const carousel = ref(null)
const imageRatio = ref(16/9) // 默认16:9比例
const dividerPositions = ref([0])
const autoPlayTimer = ref(null)
const isHovered = ref(false)

// 初始化分割线位置和动画
onMounted(() => {
  // 初始所有分割线在100%位置(最右边)
  dividerPositions.value = props.items.map(() => 100)
  
  // 启动分割线动画
  setTimeout(() => {
    dividerPositions.value = props.items.map(() => 25) // 移动到25%位置(左边1/4处)
  }, 100)
  
  // 启动自动轮播
  startAutoPlay()
})

// 自动轮播控制
const startAutoPlay = () => {
  stopAutoPlay() // 先停止现有的
  
  autoPlayTimer.value = setInterval(() => {
    if (!isHovered.value) {
      next()
    }
  }, props.autoPlayInterval)
}

const stopAutoPlay = () => {
  if (autoPlayTimer.value) {
    clearInterval(autoPlayTimer.value)
    autoPlayTimer.value = null
  }
}

// 鼠标悬停暂停自动轮播
const pauseAutoPlay = () => {
  isHovered.value = true
}

const resumeAutoPlay = () => {
  isHovered.value = false
}

// 计算样式
const wrapperStyle = computed(() => {
  return {
    paddingBottom: `${imageRatio.value * 100}%`,
    transition: 'padding-bottom 0.3s ease'
  }
})

const getBeforeStyle = (index) => ({
  clipPath: `inset(0 ${100 - dividerPositions.value[index]}% 0 0)`,
  transition: 'clip-path 0.5s ease'
})

const getDividerStyle = (index) => ({
  left: `${dividerPositions.value[index]}%`,
  transition: 'left 0.5s ease'
})

// 图片加载处理
const handleImageLoad = (e) => {
  const img = e.target
  imageRatio.value = img.naturalHeight / img.naturalWidth
}

// 轮播导航
const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    resetDividerAnimation()
  }
}

const next = () => {
  if (currentIndex.value < props.items.length - 1) {
    currentIndex.value++
    resetDividerAnimation()
  } else {
    currentIndex.value = 0 // 循环轮播
    resetDividerAnimation()
  }
}

const goTo = (index) => {
  currentIndex.value = index
  resetDividerAnimation()
}

// 重置分割线动画
const resetDividerAnimation = () => {
  // 先将当前项的分割线重置到最右
  dividerPositions.value[currentIndex.value] = 100
  
  // 然后动画移动到25%位置
  setTimeout(() => {
    dividerPositions.value[currentIndex.value] = 25
  }, 50)
}

// 拖动逻辑
let isDragging = false
let currentDragIndex = 0

const startDrag = (e, index) => {
  isDragging = true
  currentDragIndex = index
  e.preventDefault()
  
  // 拖动时暂停自动轮播
  pauseAutoPlay()
  
  window.addEventListener('mousemove', handleDrag)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', handleDrag, { passive: false })
  window.addEventListener('touchend', stopDrag)
}

const handleDrag = (e) => {
  if (!isDragging || !carousel.value) return
  
  const container = carousel.value.querySelectorAll('.comparison-container')[currentDragIndex]
  const containerRect = container.getBoundingClientRect()
  const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX
  let pos = ((clientX - containerRect.left) / containerRect.width) * 100
  
  pos = Math.max(0, Math.min(100, pos))
  
  // 拖动时临时移除过渡效果
  dividerPositions.value[currentDragIndex] = pos
  e.preventDefault()
}

const stopDrag = () => {
  isDragging = false
  window.removeEventListener('mousemove', handleDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', handleDrag)
  window.removeEventListener('touchend', stopDrag)
  
  // 拖动结束后恢复自动轮播
  resumeAutoPlay()
}

// 监听currentIndex变化，确保分割线动画
watch(currentIndex, () => {
  resetDividerAnimation()
})

// 组件卸载时清理
onUnmounted(() => {
  stopAutoPlay()
  stopDrag()
})
</script>

<style scoped>
.fullscreen-comparison-carousel {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-height: calc(100vh - 80px);
  height: auto;
  margin-left: calc(-50vw + 50%);
  overflow: hidden; /* 为导航栏留出空间 */
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.comparison-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.comparison-item.active {
  position: relative;
  opacity: 1;
}

.comparison-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}

.image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.image-before {
  z-index: 2;
}

.divider {
  position: absolute;
  top: 0;
  height: 100%;
  width: 4px;
  background: white;
  z-index: 10;
  cursor: ew-resize;
  transform: translateX(-50%);
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

.divider-handle {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.handle-label {
  font-size: 14px;
  font-weight: bold;
  color: white;
  padding: 0 8px;
  white-space: nowrap;
}

.label-before {
  margin-right: 16px;
  text-align: right;
}

.label-after {
  margin-left: auto;
  text-align: left;
}

/* 轮播导航 - 放在图片内部下方 */
.carousel-nav {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  z-index: 20;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 30px;
}

.carousel-nav button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #333;
}

.carousel-nav button:hover:not(:disabled) {
  background: white;
}

.carousel-nav button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-dots {
  display: flex;
  gap: 10px;
}

.nav-dots button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}

.nav-dots button.active {
  background: white;
  transform: scale(1.2);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .carousel-nav {
    bottom: 20px;
    padding: 8px 15px;
  }
  
  .carousel-nav button {
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
  
  .nav-dots button {
    width: 10px;
    height: 10px;
  }
  
  .handle-label {
    font-size: 12px;
    padding: 0 4px;
  }
  
  .divider-handle {
    width: 30px;
    height: 30px;
  }
}
</style>