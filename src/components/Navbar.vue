<template>
  <div class="navbar">
    <div v-on:click="$router.push('/')">Личный кабинет</div>
    <div class="navbar__bttns">
      <my-button v-on:click="$router.push('/campaigns')">Рассылки</my-button>
      <my-button v-on:click="$router.push('/customers')">Клиенты</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  components: { MyButton }
}
</script>

<style scoped>
.navbar {
  height: 30px;
  background-color: dodgerblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>