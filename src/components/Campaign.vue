<template>
  <div class="campaign">
    <div>
      <div>ID: {{ campaign.id }}</div>
      <div>Начало: {{ campaign.start_at }}</div>
      <div>Завершение: {{ campaign.finish_at }}</div>
      <div>Текст: {{ campaign.text }}</div>
      <div>Фильтр: {{ campaign.params.tag }} {{ campaign.params.carrier }}</div>
      <div>Статус: {{ campaign.status }}</div>
    </div>
    <div class="campaign__bttns">
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
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: seashell;
}
.campaign__bttns {
  display: inline;
  margin-left: 50px;
}
</style>