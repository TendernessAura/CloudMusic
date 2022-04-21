<template>
  <el-scrollbar v-if="store.trackIds.length">
    <el-row justify="center">
      <div w900px hfull>
        <div class="wfull h235px">
          <el-col :span="7" wfull>
            <img w235px :src="store.playList.coverImgUrl" alt="listImg" />
          </el-col>
          <el-col :span="17" wfull hfull>
            <span
              align-middle
              wfull
              inline-block
              text-xl
              font-semibold
              class="h1/5"
            >
              {{ store.playList.name }}
            </span>
            <img
              rounded-full
              inline
              w35px
              :src="store.playList.creator.avatarUrl"
              alt="creatorImg"
            />
            <span text-sm pl2 text-blue-700>
              {{ store.playList.creator.nickname }}
            </span>
            <button
              @click="playAll"
              rounded-full
              my4
              py1
              px4
              block
              bg-red
              text-white
            >
              播放全部
            </button>
            <span block text-sm mb-3>标签: {{ tags }}</span>
            <span block text-sm mb-3>
              歌曲数：{{ store.playList.trackIds.length }} &nbsp&nbsp播放数：{{
                store.playList.playCount
              }}</span
            >
            <span block text-sm mb-3 wfull truncate>
              简介：{{ store.playList.description }}
            </span>
          </el-col>
        </div>
        <el-row justify="center">
          <div class="wfull h353px" @click="play">
            <el-row text-sm my3 pl3 font-semibold :gutter="20">
              <el-col :span="1"> </el-col>
              <el-col :span="8">
                <span>音乐标题</span>
              </el-col>
              <el-col :span="7">
                <span>歌手</span>
              </el-col>
              <el-col :span="8">
                <span>专辑</span>
              </el-col>
            </el-row>
            <el-row
              text-sm
              mt2
              pl3
              v-for="(song, index) in store.songInfo"
              :key="index"
              :data-index="index"
              :gutter="20"
            >
              <el-col :span="1">
                <div
                  :class="{ show: index != store.index }"
                  text-red
                  inline-block
                  align-middle
                  i-ic:baseline-play-arrow
                ></div>
              </el-col>
              <el-col :span="8">
                <span wfull inline-block truncate>{{ song.name }}</span>
              </el-col>
              <el-col :span="7">
                <span wfull inline-block truncate text-gray>{{
                  song.singer
                }}</span>
              </el-col>
              <el-col :span="8">
                <span wfull inline-block truncate text-gray>{{
                  song.album
                }}</span>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </div>
    </el-row>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useStore } from '~/pinia'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

store.setSongList(route.query.id as unknown as number)

const tags = computed(() => {
  let tags = ''
  if (store.playList.tags) {
    store.playList.tags.forEach((item: string) => {
      tags = tags + item + '，'
    })
    tags = tags.slice(0, tags.length - 1)
  } else {
    tags = '暂无'
  }
  return tags
})

function play(e: any) {
  let index = parseInt(e.target.parentNode.parentNode.dataset.index)
  if (index > -1) {
    store.index = index
  }
}

function playAll() {
  store.index = 0
}
</script>

<style scoped>
.show {
  display: none;
}
</style>
