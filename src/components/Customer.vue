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
          v-if="!customerInfoView"
          v-on:click="$router.push({ name: 'customerDetails', params: { id: customer.id }})"
      >
        Данные клиента
      </my-button>
      <my-button
          v-if="!customerInfoView"
          v-on:click="$router.push({ name: 'customerEdit', params: { id: customer.id, action: 'edit' }})"
      >
        Редактировать
      </my-button>
      <my-button
          v-if="customerInfoView && !showDeleted"
          v-on:click="deleteCustomer"
      >
        Удалить
      </my-button>
      <div v-show="showDeleted" class="deleted">
        Клиент удален!
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axiosInstance from "@/services/AxiosTokenInstance";
import { REFRESH_ACTION } from "@/store/storeConstants";
export default {
  props: {
    customer: {
      type: Object,
      required: true
    },
    customerMessageView: {
      type: Boolean
    },
    customerInfoView: {
      type: Boolean
    }
  },
  data() {
    return {
      isRefreshed: false,
      showDeleted: false,
    }
  },
  methods: {
    ...mapActions('auth', {
      getRefresh: REFRESH_ACTION
    }),
    async deleteCustomer() {
      if (confirm("Удалить клиента?")) {
        try {
          await axiosInstance.delete(`http://127.0.0.1:8000/api/customers/${this.customer.id}/`).then((response) => {
            this.showDeleted = response.status === 204;
            this.isRefreshed = false;
          })
        } catch (e) {
          if (typeof e.response !== "undefined" && e.response.status === 401 && !this.isRefreshed) {
            try {
              await this.getRefresh();
              this.isRefreshed = true;
            } catch (err) {
              this.$router.replace('/login');
            }
          } else {
            this.$router.replace('/error');
          }
        }
      }
    }
  },
  beforeRouteUpdate() {
    console.log('hey')
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
  display: flex;
  align-items: center;
  margin-left: 50px;
}
.message__view {
  display: flex;
  justify-content: center;
}
.deleted {
  color: darkred;
  border: 1px solid black;
}
</style>