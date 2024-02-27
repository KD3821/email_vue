<template>
  <div>
    <h2>Рассылки</h2>
    <div class="dock__btns">
      <my-input
          v-bind:value="searchQuery"
          v-on:input="searchQuery = $event.target.value"
          placeholder="Поиск..."
      ></my-input>
      <my-button v-on:click="$router.push('/campaigns/add')">
        Создать рассылку
      </my-button>
    </div>
    <campaign-list
        v-bind:count
        v-bind:campaigns="searchedCampaigns"
    />
  </div>
</template>

<script>
import axiosInstance from "@/services/AxiosTokenInstance";
import CampaignList from "@/components/CampaignList";
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
import { mapActions } from "vuex";
import { REFRESH_ACTION } from "@/store/storeConstants";
export default {
  components: {
    CampaignList,
    MyInput,
    MyButton
  },
  data() {
    return {
      campaigns: [],
      count: 0,
      searchQuery: '',
      isRefreshed: false
    }
  },
  methods: {
    ...mapActions('auth', {
      getRefresh: REFRESH_ACTION
    }),
    async fetchCampaigns() {
      try {
        await axiosInstance.get('http://127.0.0.1:8000/api/campaigns/').then((response) => {
          this.campaigns = response.data.results;
          this.count = response.data.count;
          this.isRefreshed = false;
        });
      } catch (e) {
        if (typeof e.response !== "undefined" && e.response.status === 401 && !this.isRefreshed) {
          try {
            await this.getRefresh()
            this.isRefreshed = true;
          } catch (err) {
            this.$router.replace('/login');
          }
        } else {
          this.$router.replace('/error');
        }
      }
    },
    async runFetchCampaigns() {
      do {
        await this.fetchCampaigns()
      } while (this.isRefreshed)
    }
  },
  mounted() {
    this.runFetchCampaigns();
  },
  computed: {
    resultCampaigns(){
      return this.campaigns
    },
    searchedCampaigns(){
      return this.resultCampaigns.filter((campaign) => {
        return campaign.text.toLowerCase().includes(this.searchQuery.toLowerCase())
      });
    }
  }
}
</script>

<style scoped>
.dock__btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>