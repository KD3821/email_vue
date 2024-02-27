<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { AUTO_AUTH_ACTION } from "@/store/storeConstants";
export default {
  components: {
    Navbar
  },
  created() {
    this.$store.dispatch(`auth/${AUTO_AUTH_ACTION}`);
  }
}

</script>

<style scoped>

</style>