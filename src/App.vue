<template>
  <el-container w1280px h768px mxauto>
    <el-header>
      <h1 @click="goHome" cursor-pointer my-3 text-5xl text-center text-red>
        Music
      </h1>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer height="80px">
      <Player v-if="store.songInfo.length" />
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import { useStore } from './pinia'

const store = useStore()
const router = useRouter()

function goHome() {
  router.push('/')
}
</script>
