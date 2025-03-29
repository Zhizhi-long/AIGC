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
    <video ref="videoBg" autoplay muted loop
      class="absolute inset-0 w-full h-full object-cover scale-110 animate-zoomIn">
      <source src="@/assets/bg.mp4" type="video/mp4" />
    </video>

    <!-- 内容层（置于视频上方） -->
    <div class="relative p-10 z-10 flex flex-col w-full justify-center items-center h-full text-white">
      <div class="p-10 gap-[60px] flex items-center">
        <div class="flex flex-col gap-2">
          <div class="text-4xl font-bold flex flex-col">
            <div>Online photo</div>
            <div>editor for everyone</div>
          </div>
          <div class="w-[350px]">Online photo editor for everyone,Online photo editor for everyone,Online photo editor
            for everyone,Online photo editor for everyone</div>
          <button class="py-2 text-lg font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <div>
              click it to explore more
            </div>
          </button>
        </div>
        <div class="w-[600px]">
          <img class="w-full h-full" src="https://imgv3.fotor.com/images/videoImage/Fotor-free-online-photo-editor.png"
            alt="">
        </div>
      </div>
      <div class="items-center">
        <div class="text-xl mb-1">Discover popular features</div>
        <div class="flex gap-5">
          <button class="
            flex items-center justify-center gap-2
            px-6 py-3
            bg-gradient-to-r from-blue-100 to-blue-200
            font-medium
            rounded-lg
            shadow-md
            hover:from-blue-200 hover:to-blue-300
            hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-blue-200
            active:from-blue-300 active:to-blue-400
            transition-all
            duration-300
          ">
            <!-- 图标（使用 Heroicons 的示例） -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd" />
            </svg>
            <span>create a picture</span>
          </button>
          <button class="
            flex items-center justify-center gap-2
            px-6 py-3
            bg-gradient-to-r from-blue-100 to-blue-200
            font-medium
            rounded-lg
            shadow-md
            hover:from-blue-200 hover:to-blue-300
            hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-blue-200
            active:from-blue-300 active:to-blue-400
            transition-all
            duration-300
          ">
            <!-- 图标（使用 Heroicons 的示例） -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd" />
            </svg>
            <span>create a picture</span>
          </button>
          <button class="
            flex items-center justify-center gap-2
            px-6 py-3
            bg-gradient-to-r from-blue-100 to-blue-200
            font-medium
            rounded-lg
            shadow-md
            hover:from-blue-200 hover:to-blue-300
            hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-blue-200
            active:from-blue-300 active:to-blue-400
            transition-all
            duration-300
          ">
            <!-- 图标（使用 Heroicons 的示例） -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd" />
            </svg>
            <span>create a picture</span>
          </button>
        </div>
      </div>
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
