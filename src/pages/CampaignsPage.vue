<template>
  <div>
    <h2>Страница с рассылками</h2>
    <div class="dock_btns">
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
import axios from "axios";
import CampaignList from "@/components/CampaignList";
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
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
    async fetchCampaigns() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/campaigns/');
        this.campaigns = response.data.results;
        this.count = response.data.count;
      } catch (e) {
        alert('Сервис не доступен. Повторите запрос.')
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
.dock_btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>