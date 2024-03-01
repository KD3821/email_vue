<template>
  <div>
    <form v-on:submit.prevent>
      <h4>Войти в ЛК</h4>
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
          v-on:click="onLogin"
      >
        Войти
      </my-button>
      <div
          v-if="error"
          class="error"
      >
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MyButton from "@/components/UI/MyButton"
import MyInput from "@/components/UI/MyInput";
import LoginValidations from "@/services/LoginValidations";
import {LOGIN_ACTION} from "@/store/storeConstants";
export default {
  components: {
    MyInput,
    MyButton
  },
  data() {
    return {
      email: '',
      password: '',
      errors: {},
      error: ''
    }
  },
  methods: {
    ...mapActions('auth', {
      login: LOGIN_ACTION
    }),
    onLogin() {
      // check the validations
      let validations = new LoginValidations(
          this.email,
          this.password
      );
      this.errors = validations.checkLoginValidations();
      if ('email' in this.errors || 'password' in this.errors) {
        return false;
      }
      this.login({
        email: this.email,
        password: this.password
      }).catch(error => {
        this.error = error
      });
    }
  },
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