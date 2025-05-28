<template>
    <div class="feature-section py-20 ">
      <!-- 容器（用于触发动画） -->
      <div 
        ref="featureContainer"
        class="container mx-auto px-4 flex items-center justify-between"
      >
        <!-- 左侧内容（从左边滑入） -->
        <div 
          class="feature-left flex flex-col"
          :class="{ 'animate-slideInLeft': isVisible }"
        >
          <div class="text-4xl text-white">titile title title title</div>
          <div class="text-xl mt-4 mb-4 text-white">titile title title title titile title title title titile title title title titile title title title titile title title title Online photo editor for everyone,Online photo editor for everyone,Online photo editor
            for everyone,Online photo editor for everyone Online photo editor for everyone,Online photo editor for everyone,Online photo editor
            for everyone,Online photo editor for everyone Online photo editor for everyone,Online photo editor for everyone,Online photo editor
            for everyone,Online photo editor for everyone Online photo editor for everyone,Online photo editor for everyone,Online photo editor
            for everyone,Online photo editor for everyone</div>
          <button class="py-2 text-lg font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <div>
              click it to explore more
            </div>
          </button>
        </div>
        
        <!-- 右侧内容（从右边滑入） -->
        <div 
          class="feature-right items-center"
          :class="{ 'animate-slideInRight': isVisible }"
        >
          <img 
            src="@/assets/feature-image.webp" 
            alt="功能图片"
            class="rounded-lg shadow-xl"
          >
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const featureContainer = ref(null);
  const isVisible = ref(false);
  
  // 检测元素是否进入视口
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.unobserve(entry.target); // 动画触发后停止观察
        }
      });
    },
    { threshold: 0.1 } // 当元素 10% 进入视口时触发
  );
  
  onMounted(() => {
    if (featureContainer.value) {
      observer.observe(featureContainer.value);
    }
  });
  
  onUnmounted(() => {
    if (featureContainer.value) {
      observer.unobserve(featureContainer.value);
    }
  });
  </script>
  
  <style scoped>
  /* 布局样式 */
  
  .feature-left, .feature-right {
    width: 48%;
  }
  
  .feature-left {
    float: left;
  }
  
  .feature-right {
    float: right;
  }
  
  /* 清除浮动 */
  .container::after {
    content: "";
    display: table;
    clear: both;
  }
  
  /* 动画关键帧 */
  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  /* 应用动画 */
  .animate-slideInLeft {
    animation: slideInLeft 1s ease-out forwards;
  }
  
  .animate-slideInRight {
    animation: slideInRight 1s ease-out forwards;
  }
  </style>