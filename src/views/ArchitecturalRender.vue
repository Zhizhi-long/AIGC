<template>
    <div>
      <h2 class="generator-name">Architectural Draft to Render</h2>
  
      <el-row type="flex" justify="space-between">
        <el-col :span="9" class="generate-conditon">
          <el-form
            :model="formValues"
            :rules="formRules"
            hide-required-asterisk
            ref="form1"
            size="small"
            label-position="left"
            @submit.stop
          >
            <FormBlock prop="imageURL" class="update-block">
              <h4 class="update-title">Draft Images</h4>
  
              <UploadImage
                v-model="formValues.imageURL"
                upload-position="center"
                upload-tips="Upload photos"
                image-size="306px"
              ></UploadImage>
            </FormBlock>
  
            <ViewBlock>
              <el-form-item prop="type">
                <el-row
                  type="flex"
                  justify="space-between"
                  class="example-content"
                >
                  <el-col :span="24">
                    <h4 class="example-title">
                      Style
                      <el-tooltip
                        content="You can use our provided style."
                        placement="top"
                        popper-class="is-custom prompt-tip-content"
                      >
                        <i class="el-icon-question"></i>
                      </el-tooltip>
                    </h4>
                  </el-col>
  
                  <el-col
                    v-for="i in 4"
                    :span="8"
                    :key="i"
                    class="bg-example-content"
                  >
                    <div
                      :class="formValues.type === i && 'is-active'"
                      class="bg-example"
                      @click="selectExample(i)"
                    >
                      <img
                        v-if="bgExampleUrls[i - 1]"
                        :src="bgExampleUrls[i - 1]"
                      />
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
            </ViewBlock>
  
            <ViewBlock>
  
              <el-form-item label-width="70px" label="Quantity" prop="batchSize">
                <div class="radio-group-wrap">
                  <el-radio-group v-model="formValues.batchSize">
                    <el-radio-button
                      v-for="item in numberOptions"
                      :key="item"
                      :label="item"
                    >
                    </el-radio-button>
                  </el-radio-group>
                </div>
              </el-form-item>
  
              <p class="bottom-buttons bottom-buttons--left">
                <el-button
                  :loading="generateLoading"
                  type="primary"
                  class="generate-button"
                  @click="generateImages"
                >
                  Generate with one click
                </el-button>
              </p>
  
              <el-form-item prop="agree">
                <div class="checkbox-wrap">
                  <el-checkbox v-model="formValues.agree">
                    Agree to the
                  </el-checkbox>
  
                  <UserRulesButton :checked="formValues.agree"></UserRulesButton>
                </div>
              </el-form-item>
            </ViewBlock>
          </el-form>
        </el-col>
  
        <el-col :span="15" class="generate-images">
          <el-row type="flex" justify="center">
            <el-skeleton
              :loading="generateLoading"
              :animated="generateLoading"
              class="generated-image"
            >
              <template #template>
                <el-skeleton-item variant="image" />
              </template>
  
              <template>
                <CompareImage
                  v-if="generatedList.length > 0"
                  :origin-img-src="formValues.imageURL"
                  :refined-img-src="selectedIamgeUrl"
                ></CompareImage>
              </template>
            </el-skeleton>
          </el-row>
  
          <ViewBlock class="generated-list-block">
            <el-row type="flex" class="generated-list-content">
              <el-col
                v-for="i in formValues.batchSize"
                :span="6"
                :key="i"
                class="generated-list-img-content"
              >
                <div class="img-content" @click="selectGenerated(i)">
                  <img v-if="generatedList[i - 1]" :src="generatedList[i - 1]" />
                </div>
              </el-col>
  
              <el-col :span="24" class="bottom-buttons bottom-buttons--right">
                <!-- <el-button
                  size="small"
                  class="prompt-button"
                  @click="randomPrompt"
                >
                  Share
                </el-button> -->
  
                <el-button
                  :disabled="generateLoading"
                  size="small"
                  class="prompt-button"
                  @click="downloadSelectedImg"
                >
                  Download
                </el-button>
              </el-col>
            </el-row>
          </ViewBlock>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import FormBlock from '@/components/FormBlock.vue'
  import UploadImage from '@/components/UploadImage.vue'
  import ViewBlock from '@/components/ViewBlock.vue'
  import UserRulesButton from '@/components/UserRulesButton.vue'
  import CompareImage from '@/components/CompareImage.vue'
  import { architecturalRenderApi } from '@/apis/generator'
  import { downloadImage } from '@/utils/http'
  import showMessage from '@/mixins/showMessage'
  
  export default {
    mixins: [showMessage],
  
    components: {
      FormBlock,
      UploadImage,
      ViewBlock,
      UserRulesButton,
      CompareImage
    },
  
    data () {
      const boolValidator = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Agree to AI Privacy Agreement'))
        }
        callback()
      }
  
      return {
        formValues: {
          imageURL: '',
          type: 1,
          batchSize: 1,
          agree: false
        },
  
        formRules: {
          imageURL: [{ required: true, message: 'Upload photos' }],
          type: [{ required: true, message: 'Use style' }],
          batchSize: [{ required: true, message: 'Select quantity' }],
          agree: [{ validator: boolValidator }]
        },
  
        bgExampleUrls: [
          'https://cdn.hairstylebot.cn/HD/2025-03-03-3d0a2f1b971f48af9ec9691419f279f4.jpg!75c',
          'https://cdn.hairstylebot.cn/HD/2025-03-03-5ed0bcdc354b471da0b930c63fb765ab.png!75c',
          'https://cdn.hairstylebot.cn/HD/2025-03-03-4b60159a79be41ceb33874d137c57eda.png!75c',
          'https://cdn.hairstylebot.cn/HD/2025-03-03-2462d8864dc7426c8e651a23305580ce.png!75c'
        ],
  
        sizeOptions: [
          { value: '3:4', label: 'Illustration 3:4 (768x1024)' },
          { value: '1:1', label: 'Avatar 1:1 (1024x1024)' },
          { value: '9:16', label: 'Wallpaper 9:16 (720x1280)' },
          // { value: '1152x768', label: 'Illustration 3:2 (1152x768)' },
          { value: '16:9', label: 'Movie 16:9 (1280x720)' },
          { value: '4:3', label: 'Article illustration 4:3 (1024x768)' }
        ],
  
        numberOptions: [1, 2, 3, 4],
  
        generateLoading: false,
  
        generatedList: [],
  
        selectedIamgeUrl: ''
      }
    },
  
    methods: {
      selectExample (i) {
        this.formValues.type = i
      },
  
      generateImages () {
        this.$refs.form1.validate((valid) => {
          if (valid) {
            const { imageURL, type, batchSize } = this.formValues
            this.generateLoading = true
            this.showSuccess('Please wait, finishing in 2 minutes!')
            this.generatedList = []
            architecturalRenderApi({ imageURL, type, batchSize })
              .then((res) => {
                this.generatedList = Object.values(res || {})
                this.selectedIamgeUrl = this.generatedList[0] || ''
                this.generateLoading = false
              })
              .catch(() => {
                this.generateLoading = false
              })
          }
        })
      },
  
      selectGenerated (i) {
        this.selectedIamgeUrl = this.generatedList[i - 1]
      },
  
      randomPrompt () {},
  
      downloadSelectedImg () {
        downloadImage(this.selectedIamgeUrl)
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  @import "@/styles/variable.less";
  
  .generator-name {
    font-size: 32px;
    color: #270066;
    line-height: 42px;
    text-align: left;
    margin-bottom: 24px;
  }
  
  .generate-conditon {
    padding-right: 30px;
    max-width: 412px;
  }
  
  .generate-images {
    padding-left: 30px;
    max-width: 700px;
  }
  
  .update-block {
    border: 3px solid transparent;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, #fff, #fff),
      linear-gradient(
        142deg,
        rgba(194, 178, 255, 1),
        rgba(235, 158, 255, 1),
        rgba(192, 251, 255, 1)
      );
  
    ::v-deep .el-form-item__error {
      right: 0;
      text-align: center;
    }
  }
  
  .update-title {
    font-size: 16px;
    text-align: center;
  }
  
  .el-icon-question {
    color: #a28ffa;
  }
  
  .example-content {
    flex-wrap: wrap;
  }
  
  .example-title {
    font-size: 16px;
    margin-top: 6px;
    margin-bottom: 10px;
  }
  
  .bg-example-content {
    max-width: 80px;
    cursor: pointer;
  }
  
  .bg-example {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    overflow: hidden;
    background: linear-gradient(134deg, #f4f1fe 0%, #faf9ff 100%);
  
    &.is-active {
      box-sizing: border-box;
      border: 2px solid #a28ffa;
    }
  
    img {
      width: 100%;
      height: 100%;
    }
  }
  
  .prompt-button {
    width: 106px;
    height: 36px;
    background: linear-gradient(312deg, #bbaff6 0%, #ebe2ff 100%);
    border-radius: 18px;
    color: #a28ffa;
    font-size: 14px;
  
    &:hover,
    &:focus {
      border-color: #a28ffa;
      color: #a28ffa;
    }
  }
  
  .el-select {
    ::v-deep .el-input__inner {
      border: 0;
      text-align: right;
      color: #b2b2b2;
    }
  
    ::v-deep .el-input .el-select__caret {
      transform: rotateZ(90deg);
    }
  }
  
  .radio-group-wrap {
    text-align: right;
  
    .el-radio-button + .el-radio-button {
      margin-left: 8px;
    }
  
    ::v-deep .el-radio-button {
      .el-radio-button__inner {
        width: 34px;
        height: 30px;
        background: linear-gradient(312deg, #bbaff6 0%, #ebe2ff 100%);
        border-radius: 20px;
        color: #b2b2b2;
        padding: 0;
        line-height: 30px;
        font-size: 14px;
      }
  
      &.is-active {
        .el-radio-button__inner {
          border: 2px solid #a28ffa;
          box-shadow: none;
        }
      }
    }
  
    & + ::v-deep.el-form-item__error {
      right: 0;
      left: auto;
    }
  }
  
  .bottom-buttons {
    text-align: center;
  
    .el-button + .el-button {
      margin-left: 30px;
    }
  
    &--left {
      margin-top: 34px;
      margin-bottom: 10px;
    }
  
    &--right {
      margin-top: 20px;
    }
  }
  
  .generate-button {
    width: 300px;
    height: 50px;
    border-radius: 30px;
    font-size: 16px;
  }
  
  .checkbox-wrap {
    text-align: center;
    color: #8f8f8f;
  
    .el-checkbox {
      color: #8f8f8f;
  
      ::v-deep .el-checkbox__input.is-focus .el-checkbox__inner {
        border-color: #000;
      }
  
      ::v-deep .el-checkbox__inner {
        &::after {
          border-color: #000;
        }
  
        &:hover {
          border-color: #000;
        }
      }
  
      &.is-checked {
        ::v-deep .el-checkbox__inner {
          background-color: transparent;
          border-color: #000;
        }
  
        ::v-deep .el-checkbox__label {
          color: #000;
        }
      }
    }
  
    & + ::v-deep.el-form-item__error {
      right: 0;
      text-align: center;
    }
  }
  
  .generated-image {
    width: 670px;
    height: 670px;
    border-radius: 16px;
    background: no-repeat center / 176px 193px url("~@/assets/image-wait.png"),
      linear-gradient(134deg, #f4f1fe 0%, #faf9ff 100%);
    display: flex;
    justify-content: center;
    align-items: center;
  
    .compare-image-frame,
    .el-skeleton__image {
      width: 648px;
      height: 648px;
      border-radius: 16px;
      margin: 0 auto;
    }
  }
  
  .generated-list-block {
    margin-top: 28px;
  }
  
  .generated-list-content {
    flex-wrap: wrap;
  }
  
  .generated-list-img-content {
    max-width: 64px;
    cursor: pointer;
  
    & + & {
      margin-left: 16px;
    }
  }
  
  .img-content {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    overflow: hidden;
    background: linear-gradient(134deg, #f4f1fe 0%, #faf9ff 100%);
  
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  </style>
  