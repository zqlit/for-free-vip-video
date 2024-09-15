<script setup>
import { ref } from 'vue';
import { LewMessage } from 'lew-ui'; // 假设这是用于显示消息的库

// 响应式变量
const options = ref([
  { label: '虾米解析', value: 'https://jx.xmflv.com/?url=' },
  { label: '快速配送', value: 'express' },
  { label: '次日达', value: 'nextDay' },
  { label: '同城急送', value: 'sameDay' }
]);

const selectedShipping = ref('');
const videoUrl = ref('');
const iframeUrl = ref(options.value[0].value);
const jxUrl = ref(options.value[0].value);

// 更新 iframeUrl
const updateIframeUrl = () => {
  if (jxUrl.value && videoUrl.value) {
    iframeUrl.value = `${jxUrl.value}${videoUrl.value}`;
  } else {
    iframeUrl.value = '';
  }
};

// 处理播放请求
const handleRequest = () => {
  updateIframeUrl();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      LewMessage.success('解析成功');
    }, 1000);
  });
};

//抽屉
const visible = ref(false)
const open = () => {
  visible.value = true
}
</script>

<template>
  <div id="content">
    <h2 style="text-align: center;margin-bottom: 10px;">Vip免费视频解析</h2>
    <!-- 抽屉 -->
    <lew-flex gap="20" x="start">
      <lew-drawer title="使用教程" close-by-esc v-model:visible="visible" position="right">
        <div class="jc-text">
          <h2>操作指南：</h2>
          <h3>第一步：</h3>
          <p>进入各大视频网站，找到想要观看的VIP视频，然后复制链接（浏览器上的视频地址）</p>
          <h3>第二步：</h3>
          <p>将复制的链接粘贴到本站播放地址，并点击开始解析</p>
          <h3>第三步：</h3>
          <p>等待解析完成，即可免费观看VIP视频</p>
        </div>
      </lew-drawer>
      <lew-button text="右边" @click="open" />
    </lew-flex>
    <!-- 搜索栏 -->
    <div class="nav">
      <div class="route">
        <lew-select v-model="jxUrl" clearable size="medium" placeholder="选择解析方式" :options="options" />
      </div>
      <lew-input v-model="videoUrl" align="left" placeholder="请键入视频链接" class="search" selectByFocus="true" />
      <lew-button class="click" :request="handleRequest" text="播放" type="light" color="var(--lew-text-color-1);" />
      <lew-button class="click clear" text="清空" type="light" color="var(--lew-text-color-1);"
        @click="videoUrl = ''; iframeUrl = '';" />
    </div>

    <!-- 播放器 -->
    <iframe :src="iframeUrl" class="player" allowfullscreen allowtransparency></iframe>
  </div>
</template>

<style scoped>
#content {
  display: inline-table;
}

.jc-text{
  padding: 50px;
}

.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.route {
  width: 130px;
}

.search {
  width: 666px;
  margin: 0 5px;
}

.nav button {
  width: 80px;
  border-radius: 5px;
  cursor: pointer;
}

.clear {
  margin-left: 5px;
}

.player {
  display: block;
  width: 1000px;
  height: 500px;
  padding: 15px;
  margin: 30px auto;
  border: none;
  overflow: hidden;
  border-radius: 5px;
}
</style>
