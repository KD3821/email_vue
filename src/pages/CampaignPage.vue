<template>
  <div>
    <h2>Страница с рассылками</h2>
    <my-input
        v-bind:value="searchQuery"
        v-on:input="searchQuery = $event.target.value"
        placeholder="Поиск..."
    />
    <campaign-list
        v-bind:campaigns="resultCampaigns"
    />
  </div>
</template>

<script>
import axios from "axios";
import CampaignList from "@/components/CampaignList";
import MyInput from "@/components/UI/MyInput";
export default {
  components: {
    CampaignList,
    MyInput
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
        console.log(response);
        this.campaigns = response.data.results;
        console.log(this.campaigns)
      } catch (e) {
        alert('Нет ответа от сервера...')
      }
    }
  },
  mounted() {
    this.fetchCampaigns();
  },
  computed: {
    resultCampaigns(){
      return this.campaigns
    }
  }
}
</script>

<style scoped>

</style>