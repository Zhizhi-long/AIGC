<template>
    <!-- Navbar start -->
    <nav class="fixed flex items-center justify-between w-full px-5 z-50 transition-all duration-300" 
    :class="{ 'bg-white shadow-md': isScrolled, 'bg-transparent': !isScrolled }">
		<!-- Logo start -->
		<div class="h-full flex items-center justify-center">
			<div class="bg-red-600 w-10 h-10 rounded-full "></div>
			<div class="mx-4 font-medium" :class="{'text-white': !isScrolled, 'text-black': isScrolled}">name(can use other font or picture)</div>
		</div>
		<!-- Logo end -->

		<!-- Toggler start -->
		<button role="menubar" class="md:hidden" @click="navToggle()">
			<i class="fa-solid fa-bars text-2xl"></i>
		</button>
		<!-- Toggler end -->

		<!-- Menu content start -->
		<div class="absolute left-0 right-0 translate-y-16 bg-opacity-90 bg-white md:bg-none md:bg-opacity-0 shadow hidden md:flex flex-col gap-4 items-center p-4 md:flex-row md:static md:shadow-none md:translate-y-0" role="menu" aria-expanded="false">
			<!-- Links start -->
			<a href="#" role="menuitem">
				<p class="mx-4 " :class="{'text-white': !isScrolled, 'text-black': isScrolled}">Home</p>
			</a>

			<a href="#" role="menuitem">
				<p class="mx-4" :class="{'text-white': !isScrolled, 'text-black': isScrolled}">About</p>
			</a>

			<a href="#" role="menuitem">
				<p class="mx-4" :class="{'text-white': !isScrolled, 'text-black': isScrolled}">Explore</p>
			</a>

			<button class="btn" :class="{'text-white': !isScrolled, 'text-black': isScrolled}" role="menuitem">
				Contact us
			</button>
			<!-- Links end -->
		</div>
		<!-- Menu content end -->
	</nav>
    <!-- Navbar end -->
</template>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 500; // 滚动超过 50px 时触发
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>

</style>