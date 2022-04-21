
<template>
  <el-carousel arrow="never" trigger="click" height="350px" class="bg-green w900px">
    <el-carousel-item v-for="item in 3" :key="item">
      <div class="bg-yellow">
        <img
          src="http://p1.music.126.net/hLAwPof8VPS5d17t8NFloA==/109951167247779024.jpg"
          alt="img"
        />
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<script setup lang='ts'>


</script>
<style scoped>
</style>
