<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button"
}
</script>

<style scoped>
.btn {
  background: lightgray;
  border: 1px solid lightseagreen;
  color: darkred;
  margin: 10px;
}
</style>
