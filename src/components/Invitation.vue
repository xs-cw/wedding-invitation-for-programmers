<template>
  <div class="wedding-invitation" :class="{ 'invitation-bounce':canOpen }">
    <div class="invitation-container" :class="{ 'invitation-down':isOpening }">
      <div class="invitation-cover">
        <div class="cover-content" :class="{'invitation-up':isOpening}">
          <div class="content-inside">
            <swiper ref="mySwiper" :options="swiperOption">
              <swiper-slide v-for="(item,index) in sliders.data" :key="index">
                <img :src="item.src" alt />
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <p>我们结婚啦！</p>
            <p>
              <b>Jun & undefined</b>
            </p>
            <p>时间：invalid date value</p>
            <p>
              地点：
              <b>location can not be found</b>
            </p>
            <div class="content-inside-bless">
              <input
                placeholder="写下你的祝福"
                @keyup.enter="sendBarrage"
                @focus="isFocused = true"
                @blur="isFocused = false, hasEntered = false"
                v-model="wish"
                ref="wishInput"
              />
              <p v-if="!wish && isFocused && hasEntered">请输入祝福哦</p>
              <div>
                <button @click="sendBarrage">发送祝福弹幕</button>
                <button @click="closeInvitation">关闭</button>
              </div>
            </div>
          </div>
        </div>
        <div class="cover-inside-left" :class="{'opening':isOpening}"></div>
        <div class="cover-inside-right" :class="{'opening':isOpening}"></div>
        <img
          class="cover-inside-seal"
          src="../images/seal.png"
          @click="openInvitation"
          :class="{'invitation-flight':isOpening}"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import Slider from './slider'
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

export default {
  props: ["canOpen"],
  components: { Swiper, SwiperSlide },
  directives: {
    swiper: directive,
  },
  data() {
    return {
      isOpening: false,
      wish: "",
      isFocused: false,
      hasEntered: false,
      sliders: {
        data: [
          //传入图片地址和链接跳转地址，必选
          {
            src: require("../images/photo1.jpg"), //图片地址
            url: "#", //链接跳转地址
          },
          {
            src: require("../images/photo2.jpg"),
            url: "#",
          },
          {
            src: require("../images/photo3.jpg"),
            url: "#",
          },
        ],
      },
      swiperOption: {
        direction: "horizontal",
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        autoplay: {
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
        effect: "coverflow",
        slidesPerView: "auto",
        centeredSlides: true,
        observer: true,
        observeParents: true,
        coverflowEffect: {
          rotate: 0, // 旋转的角度
          stretch: -20, // 拉伸   图片间左右的间距和密集度
          depth: 100, // 深度   切换图片间上下的间距和密集度
          modifier: 2, // 修正值 该值越大前面的效果越明显
          slideShadows: false, // 页面阴影效果
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {},
  methods: {
    // 打开邀请函
    openInvitation() {
      this.isOpening = true;
    },
    closeInvitation() {
      this.isOpening = false;
      setTimeout(() => {
        this.$emit("onClose");
      }, 660);
    },
    // 发送弹幕
    sendBarrage() {
      this.$nextTick(() => {
        this.hasEntered = true;
        if (!this.wish) {
          this.isFocused = true;
          return;
        }
        this.isOpening = false;
        this.$refs.wishInput.blur();
        setTimeout(() => {
          this.$emit("sendBarrage", this.wish);
        }, 660);
      });
    },
  },
};
</script>

<style lang="less">
.my-swipe {
  height: 200px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}

.slide1 {
  background-color: #0089dc;
  color: #fff;
}

.slide2 {
  background-color: #ffd705;
  color: #000;
}

.slide3 {
  background-color: #ff2d4b;
  color: #fff;
}
.wedding-invitation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 30px 20px;
  padding-top: 60px;
  z-index: 4;
  transform: scale(0.05);
  -webkit-transform: scale(0.05);
  opacity: 0;
  transition: transform 0.8s cubic-bezier(0.26, 1.84, 0.39, 0.61),
    opacity 0.5s linear;
  -webkit-transition: -webkit-transform 0.8s
      cubic-bezier(0.26, 1.84, 0.39, 0.61),
    opacity 0.5s linear;
  background-size: 100%;
  overflow: hidden;
  &.invitation-bounce {
    opacity: 1;
    transform: scale(1);
    -webkit-transform: scale(1);
  }
  .invitation-container {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1);
    -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0, 1, 1);
    &.invitation-down {
      transform: translateY(20px);
      -webkit-transform: translateY(20px);
    }
    .invitation-cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #d65047;
      border-radius: 10px;
      perspective: 500px;
      box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.15);
      .cover-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 10px 20px;
        transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1);
        -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0, 1, 1);
        &.invitation-up {
          transform: translateY(-60px);
          -webkit-transform: translateY(-60px);
        }
        .content-inside {
          height: 100%;
          padding: 20px;
          color: #a9895d;
          background-color: #fff1de;
          text-align: center;
          overflow: auto;
          .content-inside-photo {
            width: 100%;
            margin-bottom: 10px;
            padding: 5px;
            border: 1px solid #f7debb;
          }
          p {
            margin-top: 0;
            margin-bottom: 5px;
          }
          .content-inside-bless {
            input {
              width: 100%;
              height: 35px;
              margin-bottom: 10px;
              outline: none;
              border: none;
              border-bottom: 1px solid #f7debb;
              color: #a9895d;
              background: transparent;
              &::-webkit-input-placeholder {
                color: #e8d1b1;
                font-size: 12px;
              }
              &::-moz-placeholder {
                color: #e8d1b1;
                font-size: 12px;
              }
              &:-ms-input-placeholder {
                color: #e8d1b1;
                font-size: 12px;
              }
              &:-moz-placeholder {
                color: #e8d1b1;
                font-size: 12px;
              }
            }
            > div {
              display: flex;
              button {
                width: 100%;
                height: 35px;
                color: #a9895d;
                background: #f7debb;
                border: none;
                outline: none;
                &:disabled {
                  opacity: 0.8;
                }
                &:first-child {
                  margin-right: 10px;
                  flex: 1;
                }
                &:last-child {
                  width: 60px;
                  border: 1px solid #f7debb;
                  background: transparent;
                }
              }
            }
          }
        }
      }
      .cover-inside-left {
        position: absolute;
        left: 0;
        top: 0;
        width: 70%;
        height: 100%;
        border-radius: 10px;
        background-color: #d65047;
        box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
        z-index: 6;
        transition: transform 0.5s;
        -webkit-transition: -webkit-transform 0.5s;
        transform-origin: 0 50%;
        -webkit-transform-origin: 0 50%;
        &.opening {
          transform: rotate3d(0, 1, 0, -140deg);
          -webkit-transform: rotate3d(0, 1, 0, -140deg);
        }
      }
      .cover-inside-right {
        position: absolute;
        right: 0;
        top: 0;
        width: 40%;
        height: 100%;
        border-radius: 10px;
        background-color: #d65047;
        box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
        z-index: 5;
        transition: transform 0.5s;
        -webkit-transition: -webkit-transform 0.5s;
        transform-origin: 100% 50%;
        -webkit-transform-origin: 100% 50%;
        &.opening {
          transform: rotate3d(0, 1, 0, 140deg);
          -webkit-transform: rotate3d(0, 1, 0, 140deg);
        }
      }
      .cover-inside-seal {
        position: absolute;
        left: 70%;
        bottom: 100px;
        width: 80px;
        height: 80px;
        margin-left: -40px;
        z-index: 7;
        transform-origin: 50% 50%;
        -webkit-transform-origin: 50% 50%;
        transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
        -webkit-transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
        &.invitation-flight {
          opacity: 0;
        }
      }
    }
  }
}
</style>
