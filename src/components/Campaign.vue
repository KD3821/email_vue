<template>
  <div class="campaign">
    <div v-if="campaign && campaign.id">
      <div>ID: {{ campaign.id }}</div>
      <div>Начало: {{ campaign.start_at }}</div>
      <div>Завершение: {{ campaign.finish_at }}</div>
      <div>Текст: {{ campaign.text }}</div>
      <div>Фильтр: {{ campaign.params.tag }} {{ campaign.params.carrier }}</div>
      <div>Статус: {{ campaign.status }}</div>
    </div>
    <div v-if="detailedView" class="camp_detailed__bttns">
      <my-button
          v-on:click="$router.push({ name: 'campaignDetails', params: { id: campaign.id }})"
      >
        Button1
      </my-button>
      <my-button
          v-on:click="$router.push({ name: 'campaignCustomers', params: { id: campaign.id }})"
      >
        Button2
      </my-button>
    </div>
    <div v-else class="camp_list__bttns">
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
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  components: { MyButton },
  props: {
    campaign: {
      type: Object,
      required: true
    },
    detailedView: {
      type: Boolean,
      required: true
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
.camp_list__bttns {
  display: inline;
  margin-left: 50px;
}
.camp_detailed__bttns {
  display: inline;
  margin-left: 50px;
  background-color: paleturquoise;
  border: 1px solid grey;
}
</style>