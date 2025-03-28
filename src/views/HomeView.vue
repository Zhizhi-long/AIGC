<script setup>
import { ref, onMounted } from 'vue';
import FeatureShowcase from '@/components/FeatureShowcase.vue';

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
  <div class="relative h-screen overflow-hidden">
    <!-- 科技感视频背景 -->
    <video
      ref="videoBg"
      autoplay
      muted
      loop
      class="absolute inset-0 w-full h-full object-cover scale-110 animate-zoomIn"
    >
      <source src="@/assets/bg.mp4" type="video/mp4" />
    </video>

    <!-- 内容层（置于视频上方） -->
    <div class="relative z-10 flex flex-col justify-center items-center h-full text-white">
      <h1 class="text-5xl font-bold mb-4">title</h1>
      <p class="text-xl max-w-2xl text-center">subtitle</p>
    </div>
  </div>
  <!-- 功能模块 -->
  <FeatureShowcase />
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
