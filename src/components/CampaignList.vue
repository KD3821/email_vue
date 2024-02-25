<template>
  <div v-if="campaigns.length > 0">
    <h2>Список рассылок:</h2>
    <div name="campaign-list">
      <campaign
          v-for="campaign in campaigns"
          v-bind:campaign="campaign"
          v-bind:key="campaign.id"
      />
    </div>
  </div>
  <div v-else>
    <h2>
      Нет данных...
    </h2>
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
    }
  }
}
</script>

<style scoped>

</style>