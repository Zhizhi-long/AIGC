<script setup>
import { ref, onMounted } from 'vue';
import FeatureShowcase from '@/components/FeatureShowcase.vue';
import ImageComparisonSlider from '@/components/Slider.vue'

const comparisonImages = [
  {
    before: 'https://img2.baidu.com/it/u=2814325636,3580236249&fm=253&fmt=auto&app=120&f=JPEG?w=1067&h=800',
    after: 'https://pic.rmb.bdstatic.com/bjh/250307/dump/d53268dcfaeb945795a38be340098c8c.jpeg'
  },
  {
    before: '@/assets/feature-image.webp',
    after: '@/assets/feature-image.webp'
  },
  {
    before: 'https://img2.baidu.com/it/u=2814325636,3580236249&fm=253&fmt=auto&app=120&f=JPEG?w=1067&h=800',
    after: 'https://pic.rmb.bdstatic.com/bjh/250307/dump/d53268dcfaeb945795a38be340098c8c.jpeg'
  },
  {
    before: '@/assets/feature-image.webp',
    after: '@/assets/feature-image.webp'
  },
]

const videoBg = ref(null);

onMounted(() => {
  // 确保视频自动播放（解决浏览器限制）
  if (videoBg.value) {
    videoBg.value.play().catch(e => {
      console.log("自动播放被阻止:", e);
    });
  }
});
</script>

<template>
  <div class="bg-[#E3E3E3] pt-20">
    <ImageComparisonSlider :items="comparisonImages" />
    <!-- 功能模块 -->
    <FeatureShowcase />
  </div>
  
</template>

<style scoped>
/* 关键帧：从 110% 放大到 100% */
@keyframes zoomIn {
  from {
    transform: scale(1.1);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-zoomIn {
  animation: zoomIn 5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
