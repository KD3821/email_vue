<template>
  <div v-if="campaign && campaign.id" class="campaign">
    <div>
      <div>ID: {{ campaign.id }}</div>
      <div>
        Начало:
        <MyDate v-bind:date="campaign.start_at"/>
      </div>
      <div>
        Завершение:
        <MyDate v-bind:date="campaign.finish_at"/>
      </div>
      <div>Текст: {{ campaign.text }}</div>
      <div>Фильтр: {{ campaign.params.tag }} {{ campaign.params.carrier }}</div>
      <div>Статус: {{ campaign.status }}</div>
    </div>
    <div v-if="campaignDetailedView" class="detailed__view">
      <div class="stats__bttns">
        <my-button
            v-on:click="$router.push({ name: 'campaignDetails', params: { id: campaign.id }})"
        >
          Статистика рассылки
        </my-button>
        <my-button
            v-on:click="$router.push({ name: 'campaignCustomers', params: { id: campaign.id }})"
        >
          Статистика всех рассылок
        </my-button>
      </div>
      <div class="stats__view">
        <div v-if="campaignStats">
          Статистика по данной рассылке:
        </div>
        <div v-else>
          Статистика по всем рассылкам:
        </div>
      </div>
    </div>
    <div v-else class="campaign__view">
      <my-button
          v-on:click="$router.push({ name: 'campaignDetails', params: { id: campaign.id }})"
      >
        Детали
      </my-button>
      <my-button
          v-on:click="$router.push({ name: 'campaignCustomers', params: { id: campaign.id }})"
      >
        Получатели
      </my-button>
    </div>
  </div>
  <div v-if="messages.length > 0">
    <h2>Всего сообщений: {{ count }}</h2>
    <Message
      v-for="message in messages"
      v-bind:message="message"
      v-bind:key="message.id"
      v-bind:campaignStatus="campaign.status"
    />
  </div>
  <div v-show="showNoMessages">
    <h2>Ожидает запуска ...</h2>
  </div>
</template>

<script>
import Message from "@/components/Message";
import MyButton from "@/components/UI/MyButton";
import MyDate from "@/components/UI/MyDate";
import { mapActions, mapMutations } from "vuex";
import axiosInstance from "@/services/AxiosTokenInstance";
import {
  LOADING_SPINNER_SHOW_MUTATION,
  REFRESH_ACTION
} from "@/store/storeConstants";
export default {
  components: {
    MyDate,
    Message,
    MyButton
  },
  props: {
    campaign: {
      type: Object,
      required: true
    },
    campaignDetailedView: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      messages: [],
      count: 0,
      campaignId: '',
      isRefreshed: false,
      showNoMessages: false,
      campaignStats: {},
      allCampaignsStats: {}
    }
  },
  methods: {
    ...mapActions('auth', {
      getRefresh: REFRESH_ACTION
    }),
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION
    }),
    async fetchCampaignMessages() {
      try {
        await axiosInstance.get(`http://127.0.0.1:8000/api/campaigns/${this.campaignId}/campaign-messages/`).then((response) => {
          this.showLoading(false);
          this.messages = response.data.results;
          this.count = response.data.count;
          this.isRefreshed = false;
          this.showNoMessages = this.messages.length <= 0;
        })
      } catch (e) {
        if (typeof e.response !== "undefined" && e.response.status === 401 && !this.isRefreshed) {
          try {
            await this.getRefresh();
            this.isRefreshed = true;
          } catch (err) {
            this.showLoading(false);
            this.$router.replace('/login');
          }
        } else {
          this.showLoading(false);
          this.$router.replace('/error');
        }
      }
    },
    async runFetchCampaignMessages() {
      this.showLoading(true);
      do {
        await this.fetchCampaignMessages()
      } while (this.isRefreshed)
    }
  },
  mounted() {
    if (this.campaignDetailedView) {
      this.campaignId = this.$route.params.id;
      this.runFetchCampaignMessages();
    }
  }
}
</script>

<style scoped>
.campaign {
  border: 3px solid dodgerblue;
  margin: 15px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: seashell;
}
.campaign__view {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}
.detailed__view {
  display: flex;
  flex-direction: column;
}
.stats__bttns {
  display: flex;
  padding: 10px;
  background-color: paleturquoise;
  border: 1px solid grey;
}
</style>