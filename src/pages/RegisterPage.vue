<template>
  <div>
    <form v-on:submit.prevent>
      <h4>Регистрация</h4>
      <my-input
          v-bind:value="username"
          v-on:input="username = $event.target.value.trim()"
          type="text"
          placeholder="Имя"
      ></my-input>
      <div v-if="errors.username" class="error">
        {{ errors.username }}
      </div>
      <my-input
          v-bind:value="email"
          v-on:input="email = $event.target.value.trim()"
          type="text"
          placeholder="Email"
      ></my-input>
      <div v-if="errors.email" class="error">
        {{ errors.email }}
      </div>
      <my-input
          v-bind:value="password"
          v-on:input="password = $event.target.value.trim()"
          type="password"
          placeholder="Пароль"
      ></my-input>
      <div v-if="errors.password" class="error">
        {{ errors.password }}
      </div>
      <my-button
          class="btn"
          v-on:click="onRegister"
      >
        Зарегистрироваться
      </my-button>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import MyButton from "@/components/UI/MyButton"
import MyInput from "@/components/UI/MyInput";
import SignupValidations from "@/services/SignupValidations";
import { SIGNUP_ACTION } from "@/store/storeConstants";
export default {
  components: {
    MyInput,
    MyButton
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    ...mapActions('auth', {
      signup: SIGNUP_ACTION
    }),
    onRegister() {
      // check the validations
      let validations = new SignupValidations(
          this.username,
          this.email,
          this.password
      );
      this.errors = validations.checkRegisterValidations();
      if (this.errors.length > 0) {
        return false;
      }
      this.signup({
        username: this.username,
        email: this.email,
        password: this.password
      });
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 25%;
}
form > input {
  margin-bottom: 10px;
}
.error {
  color: red;
  font-size: 10pt;
}
</style>