<template>
    <strong
      :class="checked && 'rule-button--actived'"
      class="rule-button"
      @click="handleUserRulesClick"
    >
      &nbsp;AI Privacy Agreement
    </strong>
  </template>
  
  <script>
  import { iframePostMessage } from '@/utils/iframeUtils'
  
  export default {
    props: {
      checked: {
        type: Boolean,
        require: true,
        default: false
      }
    },
  
    methods: {
      handleUserRulesClick () {
        if (window.parent !== window) {
          iframePostMessage('openTabWindow', 'https://graphygrid.net/ai-rule/')
        } else {
          window.open('https://graphygrid.net/ai-rule/')
        }
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  @import "@/styles/variable.less";
  
  .rule-button {
    cursor: pointer;
    font-weight: bold;
  
    &:hover {
      color: @color-primary;
    }
  
    &--actived {
      color: #000;
    }
  }
  </style>