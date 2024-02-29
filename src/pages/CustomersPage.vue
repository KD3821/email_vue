<template>
  <div>
    <h2>Клиенты</h2>
    <div class="dock__bttns">
      <my-input
        v-bind:value="searchQuery"
        v-on:input="searchQuery = $event.target.value"
        placeholder="Найти клиента ..."
      ></my-input>
      <my-button>
        Добавить клиента
      </my-button>
    </div>
    <customer-list
        v-bind:count
        v-bind:customers="searchedCustomers"
    />
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
import CustomerList from "@/components/CustomerList";
import { mapActions } from "vuex";
import { REFRESH_ACTION} from "@/store/storeConstants";
import axiosInstance from "@/services/AxiosTokenInstance";
export default {
  components: {
    CustomerList,
    MyButton,
    MyInput
  },
  data() {
    return {
      customers:[],
      count: 0,
      searchQuery: '',
      isRefreshed: false
    }
  },
  methods: {
    ...mapActions('auth', {
      getRefresh: REFRESH_ACTION
    }),
    async fetchCustomers() {
      try {
        await axiosInstance.get('http://127.0.0.1:8000/api/customers/').then((response) => {
          this.customers = response.data.results;
          this.count = response.data.count;
          this.isRefreshed = false;
        });
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
    },
    async runFetchCustomers() {
      do {
        await this.fetchCustomers();
      } while (this.isRefreshed)
    }
  },
  mounted() {
    this.runFetchCustomers();
  },
  computed: {
    searchedCustomers() {
      return this.customers.filter((customer) => {
        return customer.phone.includes(this.searchQuery)
      });
    }
  }
}
</script>

<style scoped>

</style>