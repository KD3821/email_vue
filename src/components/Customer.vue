<template>
  <div class="customer">
    <div v-if="customerMessageView" class="message__view">
      <table>
        <tr>
          <td>ID клиента: {{ customer.id }}</td>
          <td>Телефон: {{ customer.phone }}</td>
          <td>Оператор: {{ customer.carrier }}</td>
          <td>Тэг: {{ customer.tag }}</td>
        </tr>
      </table>
    </div>
    <div v-else class="list__view">
      <div>
        <div>ID: {{ customer.id }}</div>
        <div>Телефон: {{ customer.phone }}</div>
        <div>Оператор: {{ customer.carrier }}</div>
        <div>Тэг: {{ customer.tag }}</div>
        <div>Часовой пояс: {{ customer.tz_name }}</div>
      </div>
      <my-button
        v-on:click="$router.push(`/customers/${customer.id}`)"
      >
        Данные
      </my-button>
      <my-button
        v-on:click="$router.push(`/customers/${customer.id}`)"
      >
        Редактировать
      </my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  components: { MyButton },
  props: {
    customer: {
      type: Object,
      required: true
    },
    customerMessageView: {
      type: Boolean
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
  color: black;
}
.list__view {
  display: inline;
  margin-left: 50px;
}
.message__view {
  display: flex;
  justify-content: center;
}
</style>