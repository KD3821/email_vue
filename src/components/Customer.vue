<template>
  <div class="customer">
    <div>
      <div>ID: {{ customer.id }}</div>
      <div>Телефон: {{ customer.phone }}</div>
      <div>Оператор: {{ customer.carrier }}</div>
      <div>Тэг: {{ customer.tag }}</div>
      <div>Часовой пояс: {{ customer.tz_name }}</div>
    </div>
    <div class="customer__bttns">
      <my-button
        v-on:click="$router.push(`/customers/${customer.id}`)"
      >
        Редактировать
      </my-button>
      <my-button
        v-on:click="$router.push(`/customers/${customer.id}/messages`)"
      >
        Сообщения
      </my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  components: {MyButton},
  props: {
    customer: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.customer {
  border: 3px solid lightseagreen;
  margin: 15px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightcyan;
}
.customer__bttns {
  display: inline;
  margin-left: 50px;
}
</style>