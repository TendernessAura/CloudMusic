<template>
  <el-row align="middle">
    <el-progress
      class="wfull h10px"
      tpye="line"
      :text-inside="true"
      color="#FF0033"
      :percentage="progress"
    />
    <audio
      @play="play"
      @pause="pause"
      @canplay="canPlay"
      @timeupdate="timeUpdate"
      ref="audio"
      :src="playUrl"
    ></audio>
    <el-col :span="2">
      <img w70px bg-yellow :src="imgUrl" alt="songImg" />
    </el-col>
    <el-col :span="9" class="ml--5">
      <p mb-4>{{ name }} - {{ singer }}</p>
      <p>{{ timeFormat(currentTime) }} / {{ timeFormat(dt) }}</p>
    </el-col>
    <el-col :span="10" text-4xl>
      <button @click="prevPlay" i-ic:sharp-skip-previous></button>
      <button
        ref="controlPlayButton"
        @click="controlPlay"
        v-show="!store.isPlay"
        i-ic:sharp-play-circle
      ></button>
      <button
        ref="controlPlayButton"
        @click="controlPlay"
        v-show="store.isPlay"
        i-ic:sharp-pause-circle
      ></button>
      <button @click="nextPlay" i-ic:sharp-skip-next></button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useStore } from '~/pinia'
const store = useStore()

const audio = ref()
const controlPlayButton = ref()
const playUrl = computed(() => store.songInfo[store.index].url)
const name = computed(() => store.songInfo[store.index].name)
const singer = computed(() => store.songInfo[store.index].singer)
const imgUrl = computed(() => store.songInfo[store.index].imgUrl)

let dt = ref(0)
let currentTime = ref(0)
//进度条百分比
let progress = computed(() => (currentTime.value / dt.value) * 100)
//控制播放或者暂停
function controlPlay() {
  if (!audio.value.paused) {
    audio.value.pause()
  } else {
    audio.value.play()
  }
}
//切换播放按钮
function play() {
  store.isPlay = true
}
//切换暂停按钮
function pause() {
  store.isPlay = false
}
//获取音乐时长,自动播放
function canPlay() {
  dt.value = audio.value.duration
  audio.value.play()
}
//格式化播放器时间显示
function timeFormat(time: number) {
  time = Math.floor(time)
  let m = 0,
    s = 0
  if (time < 60) {
    s = time
  } else {
    m = Math.floor(time / 60)
    s = time % 60
  }
  return `${m}:${s}`
}
//上一首
function prevPlay() {
  store.index = store.index === 0 ? store.songInfo.length - 1 : store.index - 1
}
//下一首
function nextPlay() {
  store.index = store.index === store.songInfo.length ? 0 : store.index + 1
}

function timeUpdate() {
  currentTime.value = audio.value.currentTime || 0
  if (currentTime.value === dt.value) {
    nextPlay()
  }
}

//监控切换歌曲自动播放
watch(
  () => store.index,
  () => {
    play()
  }
)
</script>
