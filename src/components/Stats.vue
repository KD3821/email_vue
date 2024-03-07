<template>
  <div v-if="singleStatsView">
    Статистика по данной рассылке на:
    <span>{{ stats.date }}</span>
    <span>{{ stats.msg_total }}</span>
    <span>{{ stats.msg_ok }}</span>
    <span>{{ stats.msg_failed }}</span>
    <span>{{ stats.msg_canceled }}</span>
    <span>{{ stats.msg_processing }}</span>
  </div>
  <div v-else>
    Статистика по всем рассылкам на:
    <span>{{ stats.date }}</span>
    <span>{{ stats.campaign_total }}</span>
    <span>{{ stats.msg_total }}</span>
    <span>{{ stats.msg_ok }}</span>
    <span>{{ stats.msg_failed }}</span>
    <span>{{ stats.msg_canceled }}</span>
    <span>{{ stats.msg_processing }}</span>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { REFRESH_ACTION } from "@/store/storeConstants";
import axiosInstance from "@/services/AxiosTokenInstance";
export default {
  props: {
    singleStatsView: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      campaignId: '',
      isRefreshed: false,
      stats: {},
      api_route: ''
    }
  },
  methods: {
    ...mapActions('auth', {
      getRefresh: REFRESH_ACTION
    }),
    async fetchStats() {
      if (this.singleStatsView) {
        this.api_route = `http://127.0.0.1:8000/api/reports/${this.campaignId}/`;
      } else {
        this.api_route = `http://127.0.0.1:8000/api/reports/`;
      }
      try {
        await axiosInstance.get(this.api_route).then((response) => {
          this.stats = response.data;
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
    async runFetchStats() {
      do {
        await this.fetchStats();
      } while (this.isRefreshed)
    }
  },
  created() {
    this.campaignId = this.$route.params.id
    this.runFetchStats();
  }
}
</script>

<style scoped>

</style>