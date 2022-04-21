<template>
  <el-scrollbar>
    <el-row justify="center">
      <SongSwiper />
    </el-row>
    <el-row pt-5 justify="center">
      <div w900px>
        <h1 text-xl font-bold>推荐歌单</h1>
        <el-row :gutter="20">
          <el-col :span="4" v-for="item in store.personalized" py2>
            <el-card
              @click="goSongList(item.id)"
              shadow="hover"
              :body-style="{ padding: '0px' }"
            >
              <div relative>
                <div
                  h26px
                  bg-black
                  bg-opacity-40
                  text-white
                  absolute
                  bottom-0
                  left-0
                  wfull
                >
                  <div align-middle inline-block i-ic:sharp-play-circle></div>
                  <span pl1 align-middle>{{ playCount(item.playCount) }}</span>
                </div>
                <img wfull :src="item.picUrl" />
              </div>
              <p wfull text-xs h32px>{{ item.name }}</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-row>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from '~/pinia'

const store = useStore()
const router = useRouter()

store.setPersonalized()

function playCount(playCount: number): number | string {
  if (playCount < 100000) {
    return playCount
  } else {
    return `${Math.floor(playCount / 10000)}万`
  }
}

function goSongList(id: number) {
  router.push({
    path: '/SongList',
    query: {
      id
    }
  })
}
</script>

<style scoped></style>
