<template>
  <input
      v-bind:value="modelValue"
      v-on:input="updateInput"
      class="input"
      type="text"
  >
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  width: 40%;
  border: 2px solid darkseagreen;
}
</style>