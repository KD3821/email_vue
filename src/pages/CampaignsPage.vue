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
import {mapActions} from "vuex";
import {REFRESH_ACTION} from "@/store/storeConstants";
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
      searchQuery: ''
    }
  },
  methods: {
    ...mapActions('auth', {
      refresh: REFRESH_ACTION
    }),
    async fetchCampaigns() {
      for (let i = 0; i < 2; i++) {
        try {
          await axiosInstance.get('http://127.0.0.1:8000/api/campaigns/').then((response) => {
            this.campaigns = response.data.results;
            this.count = response.data.count;
          });
          break
        } catch (e) {
          if (e.response.status === 401) {
            if (i === 0) {
              await this.refresh()  // need refactor - Unknown promise rejection reason
            }
          }
        }
      }
    }
  },
  mounted() {
    this.fetchCampaigns();
  },
  computed: {
    resultCampaigns(){
      return this.campaigns
    },
    searchedCampaigns(){
      return this.resultCampaigns.filter(campaign => campaign.text.toLowerCase().includes(this.searchQuery.toLowerCase()))
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