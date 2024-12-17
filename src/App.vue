<script setup>
import { ref, onMounted } from 'vue';
import { LewMessage } from 'lew-ui'; 

//生命周期钩子
onMounted(() => {
  //重要的事情说三遍
  LewNotification.success({
    title: '温馨提示',
    content: '如果您是第一次使用本站，请先阅读新手教程',
    delay: 30000
  })
  LewNotification.success({
    title: '温馨提示',
    content: '如果您是第一次使用本站，请先阅读新手教程',
    delay: 30000
  })
  LewNotification.success({
    title: '温馨提示',
    content: '如果您是第一次使用本站，请先阅读新手教程',
    delay: 30000
  })
});


const options = ref([
  { label: '虾米解析', value: 'https://jx.xmflv.com/?url=' },
  { label: '八戒解析', value: 'https://jx.m3u8.tv/jiexi/?url=' },
  { label: '唐僧解析', value: 'https://jx.xmflv.cc/?url=' },
  { label: '悟空解析', value: 'https://bd.jx.cn/?url=' }
]);

const videoUrl = ref('');
const iframeUrl = ref(options.value[0].value);
const jxUrl = ref(options.value[0].value);
const showModal = ref(false);

const updateIframeUrl = () => {
  if (jxUrl.value && videoUrl.value) {
    iframeUrl.value = `${jxUrl.value}${videoUrl.value}`;
  } else {
    iframeUrl.value = options.value[0].value;
  }
};

const handleRequest = () => {
  updateIframeUrl();
  if (iframeUrl.value != options.value[0].value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        LewMessage.success('解析成功');
      }, 1000);
    });
  } else {
    LewMessage.error({
      content: '错误：请先填写视频链接再提交,谢谢合作！',
      duration: 3000
    })
  }
};

const toggleTutorial = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const openNewTab = (url) => {
  window.open(url, '_blank');
};
</script>

<template>
  <div class="app-container">
    <!-- 头部区域 -->
    <div class="header">
      <h1 class="title">VIP免费视频解析</h1>
      <lew-button 
        color="black" 
        size="medium" 
        text="使用教程" 
        dashed 
        type="ghost" 
        @click="toggleTutorial" 
      />
    </div>

    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="parser-select">
        <lew-select 
          v-model="jxUrl"
          clearable
          size="medium"
          placeholder="选择解析方式"
          :options="options"
        />
      </div>
      
      <div class="url-input">
        <lew-input
          v-model="videoUrl"
          align="left"
          placeholder="请键入视频链接"
          selectByFocus="true"
        />
      </div>
      
      <div class="control-buttons">
        <lew-button 
          class="control-button"
          :request="handleRequest"
          text="播放"
          type="light"
        />
        <lew-button
          class="control-button"
          text="清空"
          type="light"
          @click="videoUrl = ''; iframeUrl = options[0].value"
        />
      </div>
    </div>

    <!-- 播放器 -->
    <div class="player-wrapper">
      <iframe
        :src="iframeUrl"
        class="video-player"
        allowfullscreen
        allowtransparency
      ></iframe>
    </div>

    <!-- 底部区域 -->
    <footer class="footer">
      <lew-flex direction="y" gap="20">
        <lew-mark color="red">注意：视频如果有广告是解析接口内置与本站无关，请勿相信！</lew-mark>
        
        <div class="video-platforms">
          <lew-flex wrap x="center" gap="10">
            <lew-button size="medium" @click="openNewTab('https://v.qq.com')" text="进入腾讯视频" color="black" dashed type="ghost" />
            <lew-button size="medium" @click="openNewTab('https://www.iqiyi.com')" text="进入爱奇艺视频" color="black" dashed type="ghost" />
            <lew-button size="medium" @click="openNewTab('https://www.bilibili.com/movie')" text="进入bilibili视频" color="black" dashed type="ghost" />
            <lew-button size="medium" @click="openNewTab('https://youku.com')" text="进入优酷视频" color="black" dashed type="ghost" />
            <lew-button size="medium" @click="openNewTab('https://www.mgtv.com')" text="进入芒果视频" color="black" dashed type="ghost" />
          </lew-flex>
        </div>
        <lew-mark color="green">本项目已开源Github,欢迎star✌️! </lew-mark>
        <lew-mark type="light" color="green">Github地址 : <a target="_blank" href="https://github.com/imzql/for-free-vip-video">点击这里跳转项目地址</a></lew-mark>
        <lew-mark color="red">免责声明：解析服务仅限小伙伴们学习用途！对于一些不法分子破坏视频版权行为，本站将坚决抵制！</lew-mark>
        
        <div class="copyright">© 2019 - 2024 Designed by 小赵同学</div>
      </lew-flex>
    </footer>

    <!-- 教程弹窗 -->
<lew-modal
  v-model:visible="showModal"
  title="使用教程"
  width="600"
  :mask-closable="true"
  :show-close="true"
  @close="closeModal"
  class="tutorial-modal"
  :destroy-on-close="true"
>
  <div class="tutorial-wrapper">
    <div class="tutorial-content">
          <div class="tutorial-step">
            <h3>第一步：选择视频平台</h3>
            <div class="tutorial-text">
              <p>这里以腾讯视频为例：<a href="https://v.qq.com/channel/movie" target="_blank">点我跳转腾讯视频</a></p>
              <p>找到想要观看的VIP视频</p>
            </div>
            <div class="tutorial-image">
              <img src="https://ice.frostsky.com/2024/09/15/8fd7e548c47cbf69479ad3ea3f03e3d4.png" alt="选择视频">
            </div>
          </div>

          <div class="tutorial-step">
            <h3>第二步：复制视频链接</h3>
            <div class="tutorial-text">
              <p>将浏览器上方的网址链接复制下来</p>
            </div>
            <div class="tutorial-image">
              <img src="https://ice.frostsky.com/2024/09/15/74f1b4483de8acc98230c4d53dbbac4c.png" alt="复制链接">
            </div>
          </div>

          <div class="tutorial-step">
            <h3>第三步：粘贴并播放</h3>
            <div class="tutorial-text">
              <p>将复制的链接粘贴到播放地址栏，点击播放按钮</p>
            </div>
            <div class="tutorial-image">
              <img src="https://ice.frostsky.com/2024/09/15/f60383ddf991d44ca2899d47d85a5830.png" alt="粘贴播放">
            </div>
          </div>
            <div class="tutorial-text">
              <p>等待解析成功提示，即可免费观看各大平台VIP视频</p>
              <p>如果解析失败请更换解析渠道</p>
            </div>
        </div>
      </div>
      <template #footer></template>
    </lew-modal>
  </div>
</template>

<style scoped>
/* 头部样式 */
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin: 0;
}

/* 控制面板样式 */
.control-panel {
  display: grid;
  grid-template-columns: minmax(130px, auto) 1fr auto;
  gap: 1rem;
  align-items: center;
  margin: 2rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.parser-select {
  min-width: 130px;
}

.url-input {
  width: 100%;
}

.control-buttons {
  display: flex;
  gap: 0.5rem;
}

.control-button {
  min-width: 80px;
}

/* 播放器样式 */
.player-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  margin: 2rem 0;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* 底部样式 */
.footer {
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
}

.video-platforms {
  margin: 1rem 0;
}

.copyright {
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
}

/* 教程弹窗样式 */
:deep(.tutorial-modal) {
  .lew-modal__body {
    padding: 0;
  }
}

.tutorial-wrapper {
  position: relative;
  height: 60vh;
  overflow: hidden;
}

.tutorial-content {
  height: 100%;
  padding: 20px 24px;
  overflow-y: auto;
}

.tutorial-step {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eee;
}

.tutorial-step:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.tutorial-step h3 {
  color: #2c3e50;
  font-size: 18px;
  margin-bottom: 16px;
  font-weight: 500;
}

.tutorial-text {
  margin-bottom: 16px;
}

.tutorial-text p {
  margin: 8px 0;
  line-height: 1.6;
  color: #666;
  font-size: 14px;
}

.tutorial-image {
  padding: 12px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin: 16px 0;
}

.tutorial-image img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
}
</style>
