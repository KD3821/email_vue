<template>
  <div class="message">
    <Customer
        v-bind:customer="message.customer"
        customerMessageView
    />
    <div>Дата отправки: {{ message.sent_at }}</div>
    <div>
      Статус: {{ messageStatus }}
    </div>
    <my-button v-on:click="checkMessageStatus">
      Check
    </my-button>
  </div>
</template>

<script>
import Customer from "@/components/Customer";
import MyButton from "@/components/UI/MyButton";
export default {
  components: {
    Customer,
    MyButton
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    campaignStatus: {
      type: undefined,
      required: true
    }
  },
  data(){
    return {
      messageSocket: {},
      messageStatus: ''
    }
  },
  methods: {
    async assignWebSocket() {
      const messageSocket = new WebSocket(`ws://127.0.0.1:8000/ws/messages/${this.message.uuid}/`);
      this.messageSocket = messageSocket;
      messageSocket.onopen = function () {
        console.log(`WebSocket connection for message established.`);
      };
    },
    async checkMessageStatus() {
      const status = {
        type: 'check_status',
        status: this.messageStatus
      }
      this.messageSocket.onmessage = (event) => {
        const received_data = JSON.parse(event.data);
        console.log('Received status:', received_data);
        if (received_data.status === 'ok') {
          this.messageStatus = 'YOOHOO'
        } else {
          this.messageStatus = 'BAD'
        }
      };
      await this.messageSocket.send(JSON.stringify(status));
    },
  },
  mounted() {
    this.messageStatus = this.$props.message.status
    if (this.campaignStatus === 'launched' && this.message.status === 'processing') {
      this.assignWebSocket();
    }
  },
}
</script>

<style scoped>
.message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightblue;
  border: 2px solid darkgrey;
  margin: 20px;
  padding-right: 20px;
}
</style>