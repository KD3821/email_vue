<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import axios from 'axios';
export default {
  components: {
    Navbar
  }
}

</script>

<style scoped>

</style>