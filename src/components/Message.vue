<template>
  <div class="message">
    <Customer
        v-bind:customer="message.customer"
        customerMessageView
    />
    <div>Дата отправки: {{ message.sent_at }}</div>
    <div>Статус: {{ message.status }}</div>
  </div>
</template>

<script>
import Customer from "@/components/Customer";
export default {
  components: { Customer },
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightblue;
  border: 2px solid darkgrey;
  margin: 20px;
  padding-right: 20px;
}
</style>