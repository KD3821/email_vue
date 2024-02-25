<template>
  <div class="campaign">
    <div>
      <div>{{ campaign.id }}</div>
      <div>Начало: {{ campaign.start_at }}</div>
      <div>Завершение: {{ campaign.finish_at }}</div>
      <div>Текст: {{ campaign.text }}</div>
      <div>Параметры: {{ campaign.params }}</div>
    </div>
    <div class="campaign_btns">
      <my-button
          v-on:click="$router.push(`/campaigns/${campaign.id}`)"
      >
        Детали
      </my-button>
      <my-button
          v-on:click="$router.push(`/campaign/${campaign.id}/customers`)"
      >
        Получатели
      </my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  components: { MyButton },
  props: {
    campaign: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.campaign {
  border: 3px solid dodgerblue;
  margin: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.campaign_btns {
  display: flex;
}
</style>