<template>
  <div v-if="campaigns.length > 0">
    <h2>Всего рассылок: {{ count }}</h2>
    <div class="campaign-list">
      <Campaign
          v-for="campaign in campaigns"
          v-bind:campaign="campaign"
          v-bind:key="campaign.id"
      />
    </div>
  </div>
  <div v-else>
    <h2>Нет данных ...</h2>
  </div>
</template>

<script>
import Campaign from "@/components/Campaign";
export default {
  components: { Campaign },
  props: {
    campaigns: {
      type: Array,
      required: true
    },
    count: 0
  }
}
</script>

<style scoped>
.campaign-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>