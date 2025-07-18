<template>
    <div class="bg-[#E3E3E3] pt-12">
        <header class="header">
            <nav class="nav container">
                <div @click="onLogoClick" class="logo"><img class="logo-img" src="../assets/logo.jpeg" alt="" />
                    ArchiFuture AI</div>
            </nav>
        </header>
        <div class="conversion-container">
            <div class="title">Core feature</div>

            <div class="main-content">
                <!-- 左侧区域（上传+控制） -->
                <div class="left-section">
                    <!-- 上传区域 -->
                    <div class="upload-section">
                        <h2>draft Image</h2>
                        <div class="upload-box">
                            <UploadImage v-model="imageUrl" placeholderText="Click or drag to upload the picture"
                                :size="'300px'"></UploadImage>
                        </div>
                    </div>
                    <div class="controls-section">
                        <div class="style-selection">
                            <div class="flex gap-1">
                                <h3>Style</h3>
                                <div class="tooltip-container">
                                    <svg class="question-icon" viewBox="0 0 24 24" @mouseenter="showTooltip = true"
                                        @mouseleave="showTooltip = false">
                                        <path
                                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                                    </svg>
                                    <div v-if="showTooltip" class="tooltip">
                                        You can use our provided style.
                                    </div>
                                </div>
                            </div>
                            <div class="style-grid">
                                <div class="style-option" v-for="(style, index) in styleOptions" :key="index"
                                    :class="{ selected: selectedStyle === index }" @click="selectStyle(index)">
                                    <img :src="style.image" :alt="style.name">
                                </div>
                            </div>
                        </div>

                        <div class="quantity-selection">
                            <h3>Quantity</h3>
                            <div class="quantity-options">
                                <button v-for="num in 4" :key="num" class="quantity-option"
                                    :class="{ active: quantity === num }" @click="selectQuantity(num)">
                                    {{ num }}
                                </button>
                            </div>
                        </div>

                        <div class="quantity-selection">
                            <h3>Building num</h3>
                            <div class="quantity-options">
                                <button v-for="num in ['single', 'few', 'many']" :key="num" class="num-option"
                                    :class="{ active: building_num === num }" @click="selectBuilding(num)">
                                    {{ num }}
                                </button>
                            </div>
                        </div>

                        <div class="action-buttons">
                            <button class="generate-btn" @click="generate3D" :disabled="!canGenerate">
                                Generate with one click
                            </button>
                            <div class="privacy-agreement">
                                <input type="checkbox" id="privacyCheck" v-model="agreedToPrivacy">
                                <label for="privacyCheck">Agree to the AI Privacy Agreement</label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 右侧结果区域 -->
                <div class="result-section">
                    <div class="centered" v-if="isLoading">
                        <h1>Cooking in progress..</h1>
                        <div id="cooking">
                            <div class="bubble"></div>
                            <div class="bubble"></div>
                            <div class="bubble"></div>
                            <div class="bubble"></div>
                            <div class="bubble"></div>
                            <div id="area">
                                <div id="sides">
                                    <div id="pan"></div>
                                    <div id="handle"></div>
                                </div>
                                <div id="pancake">
                                    <div id="pastry"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="result-placeholder" v-else-if="!generatedResults.length">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                                fill="#B39DDB" />
                            <path
                                d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"
                                fill="#B39DDB" />
                            <path
                                d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                                fill="#B39DDB" />
                        </svg>
                        <p>result will appear here</p>
                    </div>

                    <div class="result-display" v-else>
                        <div class="result-container">
                            <img class="result-img" :src="generatedResults[resultShowIndex]" alt="3D Conversion Result">
                            <div class="result-list">
                                <div class="result-option" v-for="(style, index) in generatedResults" :key="index"
                                    :class="{ selected: resultShowIndex === index }" @click="setResultShowIndex(index)">
                                    <img class="result-min-img" :src="generatedResults[index]" :alt="style.name">
                                </div>
                            </div>
                        </div>
                        <div class="bottom-btn-content">
                            <button class="reproduce-btn" @click="reproduceImg">
                                Reproduce
                            </button>
                            <button class="download-btn" @click="downloadResult">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 9H15V3H9V9H5L12 16L19 9Z" fill="white" />
                                    <path d="M5 18V20H19V18H5Z" fill="white" />
                                </svg>
                                Download
                            </button>
                            <button class="reproduce-btn" @click="generateVideo">
                                Generate video
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="videoShow" class="video-content">
                <div class="centered" v-if="videoIsLoading">
                    <h1>Cooking in progress..</h1>
                    <div id="cooking">
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div id="area">
                            <div id="sides">
                                <div id="pan"></div>
                                <div id="handle"></div>
                            </div>
                            <div id="pancake">
                                <div id="pastry"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else-if="videoSrc">
                    <video class="video-item" controls :src="videoSrc" width="600">
                        您的浏览器不支持 HTML5 视频
                    </video>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import UploadImage from '@/components/UploadImage.vue'
import { architecturalRenderApi } from '../apis/generator.js'
import { useRouter } from 'vue-router'
import resultImage from '../assets/test_output.png'
import videoAsset from '../assets/test.mp4'

const router = useRouter()

// 上传的文件
const uploadedFiles = ref([])
const isLoading = ref(false)

const imageUrl = ref('')
const videoSrc = ref(null)

// 样式选项
const styleOptions = ref([
    { name: 'Pink Hair Style 1', image: 'https://cdn.hairstylebot.cn/HD/2025-03-03-3d0a2f1b971f48af9ec9691419f279f4.jpg!75c' },
    { name: 'Pink Hair Style 2', image: 'https://cdn.hairstylebot.cn/HD/2025-03-03-5ed0bcdc354b471da0b930c63fb765ab.png!75c' },
    { name: 'Pink Hair Style 3', image: 'https://cdn.hairstylebot.cn/HD/2025-03-03-4b60159a79be41ceb33874d137c57eda.png!75c' },
    { name: 'Pink Hair Style 4', image: 'https://cdn.hairstylebot.cn/HD/2025-03-03-2462d8864dc7426c8e651a23305580ce.png!75c' }
])
const selectedStyle = ref(0)

// 数量选择
const quantity = ref(1)
const building_num = ref('single')

// 隐私协议
const agreedToPrivacy = ref(false)

// 生成结果
const generatedResults = ref([])
const resultShowIndex = ref(0)

const showTooltip = ref(false)
const videoShow = ref(false)
const videoIsLoading = ref(false)

// 选择样式
const selectStyle = (index) => {
    selectedStyle.value = index
}

const selectQuantity = (index) => {
    quantity.value = index
}

const setResultShowIndex = (index) => {
    resultShowIndex.value = index
}

const selectBuilding = (index) => {
    building_num.value = index
}

const onLogoClick = () => {
    router.push('/')
}

// 检查是否可以生成
const canGenerate = computed(() => {
    return imageUrl?.value && agreedToPrivacy?.value
})

// 生成3D结果
const generate3D = () => {
    isLoading.value = true
    console.log(imageUrl.value, selectedStyle.value, quantity.value)
    const imageURL = imageUrl.value
    const type = selectedStyle.value
    const batchSize = quantity.value
    // architecturalRenderApi({ imageURL, type, batchSize })
    //     .then((res) => {
    //         generatedResult.value = Object.values(res || {})[0]
    //         isLoading.value = false
    //     })
    //     .catch(() => {
    //         isLoading.value = false
    //     })
    setTimeout(() => {
        isLoading.value = false
        generatedResults.value = [resultImage, resultImage, resultImage]
    }, 1200);
}

// 下载结果
const downloadResult = () => {
    if (!generatedResult.value) return

    const link = document.createElement('a')
    link.href = generatedResult.value
    link.download = '3d-result.png'
    link.click()
}

const reproduceImg = () => {
    console.log(reproduceImg)
}

const generateVideo = () => {
    videoShow.value = true
    videoIsLoading.value = true
    setTimeout(() => {
        videoIsLoading.value = false
        videoSrc.value = videoAsset
    }, 2000);
}
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
.header {
    background: rgba(13, 13, 75, 0.95);
    color: white;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(10px);
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ff6b35;
    display: flex;
}

.logo-img {
    height: 30px;
}

.conversion-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
    text-align: left;
    color: #5e35b1;
    margin-bottom: 2rem;
    font-size: 2rem;
}

.main-content {
    display: flex;
    gap: 2rem;
}

.left-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 0 0 30%;
}

.upload-section {
    background: white;
    border-radius: 16px;
    padding: 16px;
    border: 3px solid transparent;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, #fff, #fff),
        linear-gradient(142deg,
            rgba(194, 178, 255, 1),
            rgba(235, 158, 255, 1),
            rgba(192, 251, 255, 1));
}

.upload-section h2 {
    color: #5e35b1;
    margin-bottom: 1rem;
}

.upload-box {
    border: 2px dashed #b39ddb;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1rem;
}

.upload-box:hover {
    background: #f3e5f5;
    border-color: #7e57c2;
}

.upload-icon {
    margin-bottom: 0.5rem;
}

.upload-box p {
    color: #7e57c2;
    font-weight: 500;
    margin: 0;
}

.preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.preview-item {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    height: 100px;
}

.preview-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.remove-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
}

.result-section {
    flex: 1;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.result-placeholder {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: #7e57c2;
    text-align: center;
    flex-direction: column;
    gap: 10px;
}

.result-display {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.result-container {
    padding: 10px;
    align-items: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.result-img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 10px;
}

.result-min-img {
    height: 100%;
    width: auto;
    display: block;
}

.download-btn {
    background: #5e35b1;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-weight: 500;
}

.reproduce-btn {
    background: #5e35b1;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-weight: 500;
}

.controls-section {
    background: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.style-selection {
    margin-bottom: 10px;
}

.style-selection h3,
.quantity-selection h3 {
    color: #5e35b1;
    margin-bottom: 10px;
    display: flex;
}

.style-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
    height: 85px;
}

.style-option {
    border: 2px solid #d1c4e9;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
}

.result-list {
    display: flex;
    margin-top: 10px;
}

.result-option {
    border: 2px solid #d1c4e9;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 50px;
    width: 50px;
}

.result-option.selected {
    border-color: #5e35b1;
    box-shadow: 0 0 0 2px #b39ddb;
}

.result-option:hover {
    border-color: #7e57c2;
}

.style-option:hover {
    border-color: #7e57c2;
}

.style-option.selected {
    border-color: #5e35b1;
    box-shadow: 0 0 0 2px #b39ddb;
}

.style-option img {
    width: 100%;
    height: 100px;
    object-fit: cover;
}

.quantity-selection {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.quantity-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-control button {
    background: #5e35b1;
    color: white;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
}

.quantity-control button:disabled {
    background: #d1c4e9;
    cursor: not-allowed;
}

.quantity-control span {
    min-width: 30px;
    text-align: center;
    font-weight: 500;
}

.action-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.privacy-agreement {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: #5e35b1;
    font-size: 14px;
}

.generate-btn {
    background: #FF9800;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.generate-btn:hover:not(:disabled) {
    background: #F57C00;
}

.generate-btn:disabled {
    background: #FFCC80;
    cursor: not-allowed;
}

.tooltip-container {
    position: relative;
    display: inline-block;
}

.question-icon {
    width: 16px;
    height: 16px;
    fill: #666;
    cursor: pointer;
    transition: fill 0.2s ease;
}

.question-icon:hover {
    fill: #1890ff;
}

.tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;
    padding: 8px 12px;
    background-color: #333;
    color: white;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 10;
}

.tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
}

.bottom-btn-content {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-bottom: 20px;
}

.quantity-options {
    display: flex;
    gap: 8px;
}

.quantity-option {
    width: 35px;
    height: 30px;
    border: 2px solid #ddd;
    border-radius: 20px;
    background: white;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.quantity-option:hover {
    border-color: #aaa;
    transform: translateY(-2px);
}

.quantity-option.active {
    background-color: #b39ddb;
    color: #5e35b1;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
}

.num-option {
    width: 60px;
    height: 30px;
    border: 2px solid #ddd;
    border-radius: 20px;
    background: white;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.num-option:hover {
    border-color: #aaa;
    transform: translateY(-2px);
}

.num-option.active {
    background-color: #b39ddb;
    color: #5e35b1;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
}

.video-content {
    width: 100%;
    height: auto;
    background: white;
    margin-top: 10px;
    border-radius: 12px;
}

.video-item {
    width: 100%;
    height: auto;
}

@media (max-width: 768px) {
    .main-content {
        flex-direction: column;
    }

    .left-section {
        order: 1;
    }

    .result-section {
        order: 2;
        margin-bottom: 2rem;
    }
}

.centered {}

h1 {
    position: relative;
    margin: 0 auto;
    top: 25vh;
    width: 100vw;
    text-align: center;
    font-family: "Amatic SC";
    font-size: 6vh;
    color: #5e35b1;
    opacity: 0.75;
    animation: pulse 2.5s linear infinite;
}

#cooking {
    position: relative;
    margin: 0 auto;
    top: 0;
    width: 75vh;
    height: 75vh;
    overflow: hidden;
}

#cooking .bubble {
    position: absolute;
    border-radius: 100%;
    box-shadow: 0 0 0.25vh #4d4d4d;
    opacity: 0;
}

#cooking .bubble:nth-child(1) {
    margin-top: 2.5vh;
    left: 58%;
    width: 2.5vh;
    height: 2.5vh;
    background-color: #454545;
    animation: bubble 2s cubic-bezier(0.53, 0.16, 0.39, 0.96) infinite;
}

#cooking .bubble:nth-child(2) {
    margin-top: 3vh;
    left: 52%;
    width: 2vh;
    height: 2vh;
    background-color: #5e35b1;
    animation: bubble 2s ease-in-out 0.35s infinite;
}

#cooking .bubble:nth-child(3) {
    margin-top: 1.8vh;
    left: 50%;
    width: 1.5vh;
    height: 1.5vh;
    background-color: #5e35b1;
    animation: bubble 1.5s cubic-bezier(0.53, 0.16, 0.39, 0.96) 0.55s infinite;
}

#cooking .bubble:nth-child(4) {
    margin-top: 2.7vh;
    left: 56%;
    width: 1.2vh;
    height: 1.2vh;
    background-color: #5e35b1;
    animation: bubble 1.8s cubic-bezier(0.53, 0.16, 0.39, 0.96) 0.9s infinite;
}

#cooking .bubble:nth-child(5) {
    margin-top: 2.7vh;
    left: 63%;
    width: 1.1vh;
    height: 1.1vh;
    background-color: #5e35b1;
    animation: bubble 1.6s ease-in-out 1s infinite;
}

#cooking #area {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50%;
    background-color: transparent;
    transform-origin: 15% 60%;
    animation: flip 2.1s ease-in-out infinite;
}

#cooking #area #sides {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: 15% 60%;
    animation: switchSide 2.1s ease-in-out infinite;
}

#cooking #area #sides #handle {
    position: absolute;
    bottom: 18%;
    right: 80%;
    width: 35%;
    height: 20%;
    background-color: transparent;
    border-top: 1vh solid #333;
    border-left: 1vh solid transparent;
    border-radius: 100%;
    transform: rotate(20deg) rotateX(0deg) scale(1.3, 0.9);
}

#cooking #area #sides #pan {
    position: absolute;
    bottom: 20%;
    right: 30%;
    width: 50%;
    height: 8%;
    background-color: #5e35b1;
    border-radius: 0 0 1.4em 1.4em;
    transform-origin: -15% 0;
}

#cooking #area #pancake {
    position: absolute;
    top: 24%;
    width: 100%;
    height: 100%;
    transform: rotateX(85deg);
    animation: jump 2.1s ease-in-out infinite;
}

#cooking #area #pancake #pastry {
    position: absolute;
    bottom: 26%;
    right: 37%;
    width: 40%;
    height: 45%;
    background-color: #5e35b1;
    box-shadow: 0 0 3px 0 #5e35b1;
    border-radius: 100%;
    transform-origin: -20% 0;
    animation: fly 2.1s ease-in-out infinite;
}

@keyframes jump {
    0% {
        top: 24%;
        transform: rotateX(85deg);
    }

    25% {
        top: 10%;
        transform: rotateX(0deg);
    }

    50% {
        top: 30%;
        transform: rotateX(85deg);
    }

    75% {
        transform: rotateX(0deg);
    }

    100% {
        transform: rotateX(85deg);
    }
}

@keyframes flip {
    0% {
        transform: rotate(0deg);
    }

    5% {
        transform: rotate(-27deg);
    }

    30%,
    50% {
        transform: rotate(0deg);
    }

    55% {
        transform: rotate(27deg);
    }

    83.3% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(0deg);
    }
}

@keyframes switchSide {
    0% {
        transform: rotateY(0deg);
    }

    50% {
        transform: rotateY(180deg);
    }

    100% {
        transform: rotateY(0deg);
    }
}

@keyframes fly {
    0% {
        bottom: 26%;
        transform: rotate(0deg);
    }

    10% {
        bottom: 40%;
    }

    50% {
        bottom: 26%;
        transform: rotate(-190deg);
    }

    80% {
        bottom: 40%;
    }

    100% {
        bottom: 26%;
        transform: rotate(0deg);
    }
}

@keyframes bubble {
    0% {
        transform: scale(0.15, 0.15);
        top: 80%;
        opacity: 0;
    }

    50% {
        transform: scale(1.1, 1.1);
        opacity: 1;
    }

    100% {
        transform: scale(0.33, 0.33);
        top: 60%;
        opacity: 0;
    }
}

@keyframes pulse {
    0% {
        transform: scale(1, 1);
        opacity: 0.25;
    }

    50% {
        transform: scale(1.2, 1);
        opacity: 1;
    }

    100% {
        transform: scale(1, 1);
        opacity: 0.25;
    }
}
</style>