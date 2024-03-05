<template>
  <div v-bind:class="messageStyle">
    <Customer
        v-bind:customer="message.customer"
        customerMessageView
    />
    <div>Дата отправления:<br>
      <MyDate v-bind:date="message.sent_at"/>
    </div>
    <div v-if="showCheckButton">
      Статус:
      <my-button v-on:click="checkMessageStatus">
        Узнать статус
      </my-button>
      <div class="two__seconds">
        <div v-show="twoSecondsStatus">
          {{ messageStatus }}
        </div>
      </div>
    </div>
    <div v-else>
      Статус: {{ messageStatus }}
    </div>
  </div>
</template>

<script>
import Customer from "@/components/Customer";
import MyButton from "@/components/UI/MyButton";
import MyDate from "@/components/UI/MyDate";
export default {
  components: {
    Customer,
    MyButton,
    MyDate
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
      messageStatus: '',
      messageStyle: 'message',
      showCheckButton: false,
      twoSecondsStatus: false
    }
  },
  methods: {
    async assignWebSocket() {
      const messageSocket = new WebSocket(`ws://127.0.0.1:8000/ws/messages/${this.message.uuid}/`);
      this.messageSocket = messageSocket;
      messageSocket.onopen = (event) => {
        console.log(`WebSocket connection for message ${this.message.uuid} established.`);
        this.checkMessageStatus();
      };
      messageSocket.onmessage = (event) => {
        const received_data = JSON.parse(event.data);
        console.log('Received status:', received_data);
        if (received_data.status === 'close' && received_data.code !== undefined) {
          console.log(`closing WebSocket with code ${received_data.code}`);
          this.messageSocket.close(received_data.code);
        } else if (received_data.status === 'processing') {
          this.showCheckButton = true;
          this.twoSecondsStatus = true;
          setTimeout(() => this.twoSecondsStatus = false, 2000);
        } else {
          this.assignStyle(received_data.status);
          this.showCheckButton = false;
        }
      };
    },
    async checkMessageStatus() {
      const msg = {
        type: 'check_status',
        status: this.messageStatus
      }
      await this.messageSocket.send(JSON.stringify(msg));
    },
    assignStyle(status) {
      switch(status) {
        case 'ok':
          this.messageStatus = 'ОТПРАВЛЕНО';
          this.messageStyle = 'message-success';
          break;
        case 'failed':
          this.messageStatus = 'ОШИБКА';
          this.messageStyle = 'message-failure';
          break;
        case 'canceled':
          this.messageStatus = 'ОТМЕНЕНО';
          this.messageStyle = 'message-canceled';
          break;
        default:
          this.messageStatus = 'В ОБРАБОТКЕ...';
          this.messageStyle = 'message';
      }
    }
  },
  mounted() {
    this.messageStatus = this.$props.message.status;
    this.assignStyle(this.messageStatus)
    if (this.campaignStatus === 'launched' && this.message.status === 'processing') {
      this.showCheckButton = true;
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
.message-success {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightgreen;
  border: 2px solid darkgrey;
  margin: 20px;
  padding-right: 20px;
}
.message-failure {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: indianred;
  border: 2px solid darkgrey;
  margin: 20px;
  padding-right: 20px;
  color: lightcyan;
}
.message-canceled {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightgrey;
  border: 2px solid darkgrey;
  margin: 20px;
  padding-right: 20px;
}
.two__seconds {
  font-size: 0.7em;
  color: darkred;
  height: 12px;
}
</style>