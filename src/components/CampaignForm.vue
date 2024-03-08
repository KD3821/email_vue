<template>
  <div>
    <form v-on:submit.prevent class="add-item-form">
      <p>Время запуска:</p>
      <my-input
          v-bind:value="startTime"
          v-on:input="startTime = $event.target.value"
          type="time"
          v-bind:disabled="!campaignScheduled"
      ></my-input>
      <my-input
          v-bind:value="startDate"
          v-on:input="startDate = $event.target.value"
          type="date"
          v-bind:disabled="!campaignScheduled"
      ></my-input>
      <p>Время остановки:</p>
      <my-input
          v-bind:value="finishTime"
          v-on:input="finishTime = $event.target.value"
          type="time"
          v-bind:disabled="!campaignScheduled"
      ></my-input>
      <my-input
          v-bind:value="finishDate"
          v-on:input="finishDate = $event.target.value"
          type="date"
          v-bind:disabled="!campaignScheduled"
      ></my-input>
      <p>Фильтр:</p>
      <my-select
          v-bind:value="selectedCarrier"
          v-on:input="selectedCarrier = $event.target.value"
          v-bind:options="carrierOptions"
          v-bind:disabled="!campaignScheduled"
      />
      <my-input
          v-bind:value="tag"
          v-on:input="tag = $event.target.value"
          type="text"
          placeholder="Тэг"
          v-bind:disabled="!campaignScheduled"
      ></my-input>
      <my-input
          v-bind:value="text"
          v-on:input="text = $event.target.value"
          type="text"
          placeholder="Текст рассылки"
          v-bind:disabled="!campaignScheduled"
      ></my-input>
      <div v-if="campaignScheduled" class="result">
        <my-button
            v-on:click="runUpdateCampaign"
        >
          Сохранить изменения
        </my-button>
        <my-button>
          Оплатить и запустить рассылку
        </my-button>
        <div v-if="success" class="success">{{ success }}</div>
        <div v-else class="failure">{{ failure }}</div>
      </div>
      <div v-else>
        <my-button>
          Отменить рассылку
        </my-button>
        <my-button>
          Удалить рассылку
        </my-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import axiosInstance from "@/services/AxiosTokenInstance";
import CreateCampaignValidations from "@/services/CreateCampaignValidations";
import {
  LOADING_SPINNER_SHOW_MUTATION,
  REFRESH_ACTION,
} from "@/store/storeConstants";
import MyButton from "@/components/UI/MyButton";
export default {
  components: {MyButton},
  props: {
    campaign: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isRefreshed: false,
      startTime: '',
      startDate: '',
      finishTime: '',
      finishDate: '',
      selectedCarrier: '',
      tag: '',
      text: '',
      oldStartTime: '',
      oldStartDate: '',
      oldFinishTime: '',
      oldFinishDate: '',
      oldSelectedCarrier: '',
      oldTag: '',
      oldText: '',
      campaignScheduled: true,
      success: '',
      failure: '',
      errors: {},
      carrierOptions: [
        {value: 'mts', name: 'МТС'},
        {value: 'megafon', name: 'Мегафон'},
        {value: 'beeline', name: 'Билайн'},
        {value: 'tele2', name: 'Теле2'},
        {value: 'yota', name: 'Йота'}
      ],
    }
  },
  methods: {
    ...mapActions('auth', {
      getRefresh: REFRESH_ACTION
    }),
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION
    }),
    async updateCampaign() {
      this.failure = '';
      this.showLoading(true);
      let campaignData = {
        start_at: `${this.startDate}T${this.startTime}:00+03:00`,
        finish_at: `${this.finishDate}T${this.finishTime}:00+03:00`,
        text: this.text,
        params: {
          'tag': this.tag,
          'carrier': this.selectedCarrier,
        }
      };
      if (this.startTime === this.oldStartTime &&
          this.startDate === this.oldStartDate &&
          this.finishTime === this.oldFinishTime &&
          this.finishDate === this.oldFinishDate &&
          this.text === this.oldText &&
          this.tag === this.oldTag &&
          this.selectedCarrier === this.oldSelectedCarrier
      ) {
        this.errors = {old: 'Данные не были изменены.'}
        this.failure = CreateCampaignValidations.getErrorMessageDetail(this.errors);
        this.showLoading(false);
        return false;
      }
      let validations = new CreateCampaignValidations(
          campaignData.start_at,
          campaignData.finish_at,
          campaignData.text,
          campaignData.params.carrier
      );
      this.errors = validations.checkCreateCampaignValidations()
      if ('start' in this.errors || 'finish' in this.errors || 'text' in this.errors || 'carrier' in this.errors) {
        this.failure = CreateCampaignValidations.getErrorMessageDetail(this.errors);
        this.showLoading(false);
        return false;
      }
      try {
        await axiosInstance.patch(`http://127.0.0.1:8000/api/campaigns/${this.$props.campaign.id}/`, campaignData).then((response) => {
          this.showLoading(false);
          if (response.status === 200) {
            // this.$router.replace(`/campaigns/${this.$props.campaign.id}`);
            this.success = 'Данные успешно сохранены.';
          } else {
            this.failure = 'ОШИБКА. Проверьте правильность заполнения формы.'
          }
        });
      } catch (e) {
        if (typeof e.response !== "undefined" && e.response.status === 401 && !this.isRefreshed) {
          try {
            await this.getRefresh();
            this.isRefreshed = true;
          } catch (err) {
            this.$router.replace('/login');
            this.showLoading(false);
          }
        } else if (e.response.status === 400) {
          this.failure = CreateCampaignValidations.getErrorMessageDetail(e.response.data);
          this.showLoading(false);
          return false;
        } else {
          this.$router.replace('/error');
          this.showLoading(false);
        }
      }
    },
    async runUpdateCampaign() {
      do {
        await this.updateCampaign();
      } while (this.isRefreshed);
    },
    async getCampaignProp() {
      let campaign = this.$props.campaign;
      if (campaign.start_at !== undefined) {
        let tmpStart = campaign.start_at.split('T');
        let tmpStartTime = tmpStart[1].split('+');
        this.startDate = this.oldStartDate = tmpStart[0];
        this.startTime = this.oldStartTime = tmpStartTime[0].substring(0, 5);
        let tmpFinish = campaign.finish_at.split('T');
        let tmpFinishTime = tmpFinish[1].split('+');
        this.finishDate = this.oldFinishDate = tmpFinish[0];
        this.finishTime = this.oldFinishTime = tmpFinishTime[0].substring(0, 5);
        this.text = this.oldText = campaign.text;
        this.selectedCarrier = this.oldSelectedCarrier = campaign.params.carrier;
        this.tag = this.oldTag = campaign.params.tag;
        this.campaignScheduled = campaign.status === 'scheduled';
      } else {
        await this.watchCampaignProp();
      }
    },
    async watchCampaignProp() {
      if (this.$props.campaign.start_at === undefined) {
        if (this.startTime !== 'загружаем...') {
          this.startTime = 'загружаем...'
          this.startDate = 'загружаем...';
          this.finishTime = 'загружаем...';
          this.finishDate = 'загружаем...';
          this.selectedCarrier = 'загружаем...';
          this.tag = 'загружаем...';
        }
        setTimeout(this.getCampaignProp, 50)
      } else {
        await this.getCustomerProp();
      }
    }
  },
  mounted() {
    this.watchCampaignProp();
  }
}
</script>

<style scoped>
.result {
  text-align: center;
}
</style>