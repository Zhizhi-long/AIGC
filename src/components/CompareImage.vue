<template>
    <div :style="compFrameStyle" class="compare-image-frame">
      <div class="bottom-image">
        <img :src="originImgSrc" />
      </div>
  
      <div :style="compTopImgFrameStyle" class="top-image">
        <img
          :src="refinedImgSrc"
          :style="compTopImgStyle"
          class="preview-image"
        />
      </div>
  
      <span :style="compDraggerStyle" class="rate-dragger"></span>
  
      <span :style="compSeparatorStyle" class="rate-separator"></span>
  
      <input
        v-model="topImgRate"
        class="rate-input"
        type="range"
        min="0"
        max="100"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      imgWidth: { type: String, default: '648px' },
      imgHeight: { type: String, default: '648px' },
      originImgSrc: {
        type: String,
        default: ''
      },
      refinedImgSrc: {
        type: String,
        default: ''
      }
    },
  
    data () {
      return {
        topImgRate: 100
      }
    },
  
    computed: {
      compFrameStyle () {
        return {
          height: this.imgHeight,
          width: this.imgWidth
        }
      },
  
      compTopImgFrameStyle () {
        return { width: `${this.topImgRate}%` }
      },
  
      compTopImgStyle () {
        return {
          height: this.imgHeight,
          width: this.imgWidth
        }
      },
  
      compDraggerStyle () {
        return { left: `calc(${this.topImgRate}% - 24px)` }
      },
  
      compSeparatorStyle () {
        return { left: `calc(${this.topImgRate}% - 2px)` }
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  .compare-image-frame {
    position: relative;
    overflow: hidden;
  }
  
  .bottom-image {
    width: 100%;
    height: 100%;
  
    img {
      width: 100%;
      height: 100%;
    }
  }
  
  .top-image {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1;
    overflow: hidden;
  }
  
  .preview-image {
    background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
    background-size: 400% 100%;
    animation: el-skeleton-loading 1.4s ease infinite;
  }
  
  .rate-input {
    position: absolute;
    width: 100%;
    height: 48px;
    z-index: 3;
    top: calc(50% - 24px);
    left: 0;
    margin: 0;
    border: 0;
    touch-action: auto;
    opacity: 0;
  }
  
  .rate-dragger {
    position: absolute;
    z-index: 2;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    top: calc(50% - 24px);
    background-color: rgba(255, 255, 255, 0.5);
  }
  
  .rate-dragger::before {
    left: 5px;
    transform: rotate(-45deg);
  }
  
  .rate-dragger::after {
    right: -5px;
    transform: rotate(135deg);
  }
  
  .rate-dragger::after,
  .rate-dragger::before {
    border-left: 2px solid;
    border-top: 2px solid;
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    top: 50%;
    transform-origin: 0 0;
  }
  
  .rate-separator {
    position: absolute;
    z-index: 2;
    height: 100%;
    width: 4px;
    top: 0;
    background-color: rgba(255, 255, 255, 0.5);
  }
  </style>
  