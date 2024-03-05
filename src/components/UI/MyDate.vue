<template>
  <span>
    {{ formattedDate }}
  </span>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      formattedDate: '',
    }
  },
  methods: {
    formatDate() {
      let formatter = new Intl.DateTimeFormat('ru', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      let dateToFormat = new Date(this.date);
      this.formattedDate = formatter.format(dateToFormat);
    }
  },
  mounted() {
    this.formatDate()
  }
}
</script>

<style scoped>

</style>