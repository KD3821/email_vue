<template>
  <div>
    <h2>Данные клиента:</h2>
    <CustomerForm
        v-bind:customer="customer"
    />
  </div>
</template>

<script>
import CustomerForm from "@/components/CustomerForm";
import { mapActions, mapMutations } from "vuex";
import axiosInstance from "@/services/AxiosTokenInstance";
import {
  LOADING_SPINNER_SHOW_MUTATION,
  REFRESH_ACTION
} from "@/store/storeConstants";
export default {
  components: { CustomerForm },
  data() {
    return {
      customer: {},
      customerId: '',
      isRefreshed: false,
    }
  },
  methods: {
    ...mapActions('auth', {
      getRefresh: REFRESH_ACTION
    }),
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION
    }),
    async FetchCustomer() {
      try {
        await axiosInstance.get(`http://127.0.0.1:8000/api/customers/${this.customerId}/`).then((response) => {
          this.showLoading(false);
          this.customer = response.data;
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
    },
    async runFetchCustomer() {
      this.showLoading(true);
      do {
        await this.FetchCustomer();
      } while (this.isRefreshed);
    }
  },
  created() {
    this.customerId = this.$route.params.id;
    this.runFetchCustomer();
  }
}
</script>

<style scoped>

</style>