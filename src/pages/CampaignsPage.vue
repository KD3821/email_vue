<template>
  <div>
    <div class="top_bttns">
      <h2>Рассылки</h2>
      <my-button v-on:click="$router.push('/campaigns/add')">
        Создать рассылку
      </my-button>
    </div>
    <div class="dock__bttns">
      <my-select
          v-bind:value="selectedSort"
          v-on:input="selectedSort = $event.target.value"
          v-bind:options="sortOptions"
      ></my-select>
      <my-input
          v-bind:value="searchQuery"
          v-on:input="searchQuery = $event.target.value"
          placeholder="Найти рассылку ..."
      ></my-input>
    </div>
    <campaign-list
        v-bind:count
        v-bind:campaigns="sortedAndSearchedCampaigns"
    />
  </div>
</template>

<script>
import axiosInstance from "@/services/AxiosTokenInstance";
import CampaignList from "@/components/CampaignList";
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import { mapActions } from "vuex";
import { REFRESH_ACTION } from "@/store/storeConstants";
export default {
  components: {
    CampaignList,
    MyInput,
    MyButton,
    MySelect
  },
  data() {
    return {
      campaigns: [],
      count: 0,
      searchQuery: '',
      isRefreshed: false,
      selectedSort: '',
      sortOptions: [
        {value: 'text', name: 'По тексту сообщения'},
        {value: 'params', name: 'По мобильному оператору'},
        {value: 'status', name: 'По статусу'}
      ]
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
    async runFetchCampaigns() {
      do {
        await this.fetchCampaigns();
      } while (this.isRefreshed)
    }
  },
  mounted() {
    this.runFetchCampaigns();
},
  computed: {
    sortedCampaigns() {
      return [...this.campaigns].sort((campaign1, campaign2) => {
        if (this.selectedSort === 'params') {
          return campaign1[this.selectedSort].carrier?.localeCompare(campaign2[this.selectedSort].carrier)
        } else {
          return campaign1[this.selectedSort]?.localeCompare(campaign2[this.selectedSort])
        }
      });
    },
    sortedAndSearchedCampaigns() {
      return this.sortedCampaigns.filter(campaign => {
        if (this.selectedSort === 'params') {
          return campaign[this.selectedSort].carrier.toLowerCase().includes(this.searchQuery.toLowerCase())
        } else {
          let key = !!this.selectedSort ? this.selectedSort : 'text'
          return campaign[key].toLowerCase().includes(this.searchQuery.toLowerCase())
        }
      });
    }
  }
}
</script>

<style>
.top_bttns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dock__bttns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>