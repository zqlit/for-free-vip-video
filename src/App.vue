<script setup>
import { ref, onMounted } from 'vue';
import { LewMessage } from 'lew-ui';

//生命周期钩子
onMounted(() => {
  // 检查 sessionStorage 中是否有记录
  const hasSeenTutorial = sessionStorage.getItem('hasSeenTutorial');

  if (!hasSeenTutorial) {
    // 第一次使用，显示提示信息
    // 重要的事情提醒三次 所以循环三次
    for (let i = 0; i < 3; i++) {
      LewNotification.success({
        title: '温馨提示',
        content: '如果您是第一次使用本站，请先阅读新手教程',
        delay: 30000
      });
    }

    // 设置标志位，标记已经显示过提示
    sessionStorage.setItem('hasSeenTutorial', 'true');
  }
});

const options = ref([
  { label: '虾米解析【推荐线路】', value: 'https://jx.xmflv.com/?url=' },
  { label: 'pyjy/B站【推荐线路】', value: 'https://jx.playerjy.com/?url=' },
  { label: '夜幕【推荐线路】', value: 'https://www.yemu.xyz/?url=' },
  { label: '八戒解析', value: 'https://jx.m3u8.tv/jiexi/?url=' },
  { label: '唐僧解析', value: 'https://jx.xmflv.cc/?url=' },
  { label: '悟空解析', value: 'https://bd.jx.cn/?url=' },
  { label: '纯净/B站', value: 'https://im1907.top/?jx=' },
  { label: '七哥', value: 'https://jx.nnxv.cn/tv.php?url=' },
  { label: 'CK', value: 'https://www.ckplayer.vip/jiexi/?url=' }
]);

const videoUrl = ref('');
const iframeUrl = ref(options.value[0].value);
const jxUrl = ref(options.value[0].value);
const showModal = ref(false);

// 判断是否包含中文的正则表达式
const hasChinese = /[\u4e00-\u9fa5]/;

const updateIframeUrl = () => {
  if (hasChinese.test(videoUrl.value)) {
    // 如果视频链接包含中文，显示错误消息并终止
    LewMessage.error({
      content: `解析失败，您填写的地址有误，地址请不要包含中文字符\n务必只粘贴网址（例如：https://qunlin.deno.dev)\n否则无法正常解析成功！`,
      duration: 6000
    });
    return false; // 返回 false 表示更新失败
  }

  // 检查并更新 iframeUrl
  if (jxUrl.value && videoUrl.value) {
    iframeUrl.value = `${jxUrl.value}${videoUrl.value}`;
  } else {
    iframeUrl.value = options.value[0].value;
  }

  return true; // 返回 true 表示更新成功
};

const handleRequest = () => {
  // 调用 updateIframeUrl 并判断是否成功
  const isUpdated = updateIframeUrl();

  if (!isUpdated) {
    // 如果 updateIframeUrl 返回 false，直接终止操作
    return;
  }

  if (iframeUrl.value !== options.value[0].value) {
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
    });
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

// 用户提示模块js代码
let visibleWarning = ref(true)
let visibleInfo = ref(true)
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
    <lew-flex direction="y" gap="20">
    <!--用户提示模块-->
      <lew-alert
          v-if="visibleInfo"
          type="success"
          closeable
          @close="visibleInfo = false"
      >
        <template #title>温馨提示</template>
        <template #content size="medium"
        >部分小伙伴反馈，bilibili的链接有些无法正常播放，大概率是bilibili的b23的短链接【例如：https://b23.tv/ep1307079】，这种链接是无法解析的，推荐用电脑浏览器打开，直接复制浏览器地址栏的地址粘贴到下方播放，手机分享复制链接，会携带一些中文字符在里面，需要把中文字符去掉，只保留https开头的视频链接才能正常解析哦，并非本程序的bug，另外悄悄告诉你，使用推荐线路，解析速度更快哦，本程序仅做学习交流，请勿用于非法用途，谢谢合作！😘</template
        >
        <template #footer>
          <lew-flex x="end">
            <lew-button color="success" size="small" @click="visibleInfo = false">我知道了</lew-button>
          </lew-flex>
        </template>
      </lew-alert>
    <!--用户提示模块结束-->
    <!--<lew-mark color="green">温馨提示：部分小伙伴反馈，bilibili的链接有些无法正常播放，大概率是bilibili的b23的短链接【例如：https://b23.tv/ep1307079】，这种链接是无法解析的，推荐用电脑浏览器打开，直接复制浏览器地址栏的地址粘贴到下方播放，手机分享复制链接，会携带一些中文字符在里面，需要把中文字符去掉，只保留https开头的视频链接才能正常解析哦，并非本程序的bug，另外悄悄告诉你，使用推荐线路，解析速度更快哦，本程序仅做学习交流，请勿用于非法用途，谢谢合作！😘</lew-mark>-->
    </lew-flex>

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
          color="green"
        />
        <lew-button
          class="control-button"
          text="清空"
          type="light"
          color="green"
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
        <lew-mark type="light" color="green">本项目已开源至Github,请Star后在使用(这对我很重要😘)  Github地址 : <a target="_blank" href="https://github.com/imzql/for-free-vip-video">点击前往GitHub项目地址</a></lew-mark>
        <lew-mark color="red">免责声明：解析服务仅限学习使用，严禁使用非法获利，请尊重视频版权，营造良好的电影环境，谢谢合作😘</lew-mark>
        <div class="copyright">© 2019 - 2025 Designed By Vaica</div>
        <lew-flex direction="x" >
          <a title="GitHub Watchers" target="_blank" href="https://github.com/zqlit/for-free-vip-video/watchers">
            <img alt="GitHub Watchers" src="https://img.shields.io/github/watchers/zqlit/for-free-vip-video.svg?label=Watchers&style=social">
          </a>
          <a title="GitHub Stars" target="_blank" href="https://github.com/zqlit/for-free-vip-video/stargazers">
            <img alt="GitHub Stars" src="https://img.shields.io/github/stars/zqlit/for-free-vip-video.svg?label=Stars&style=social">
          </a>
          <a title="GitHub Forks" target="_blank" href="https://github.com/zqlit/for-free-vip-video/network/members">
            <img alt="GitHub Forks" src="https://img.shields.io/github/forks/zqlit/for-free-vip-video.svg?label=Forks&style=social">
          </a>
        </lew-flex>
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
/* 容器样式 */
.app-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  box-sizing: border-box;
}

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
  grid-template-columns: minmax(130px, auto) 1fr minmax(170px, auto);
  gap: 1rem;
  align-items: center;
  margin: 2rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.parser-select {
  min-width: 130px;
  width: 100%;
}

.url-input {
  width: 100%;
}

.control-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  width: 100%;
}

.control-button {
  flex: 1;
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

/* 响应式布局 */
@media (max-width: 768px) {
  .app-container {
    padding: 1rem;
  }

  .control-panel {
    grid-template-columns: 1fr;
  }

  .control-buttons {
    justify-content: center;
  }

  .control-button {
    flex: 1 1 auto;
    min-width: 120px;
  }

  .tutorial-wrapper {
    height: 70vh;
  }
}

@media (max-width: 480px) {
  .app-container {
    padding: 0.5rem;
  }

  .control-panel {
    padding: 0.5rem;
  }

  .control-button {
    min-width: 100%;
  }
}
</style>
