<template>
  <div>
    <form v-on:submit.prevent="onLogin()">
      <h4>Войти в ЛК {{ username }}</h4>
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
          v-on:click="loginUser"
      >
        Войти
      </my-button>
    </form>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import MyButton from "@/components/UI/MyButton"
import MyInput from "@/components/UI/MyInput";
import SigninValidations from "@/services/SigninValidations";
export default {
  components: {
    MyInput,
    MyButton
  },
  data() {
    return {
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    onLogin() {
      // check the validations
      let validations = new SigninValidations(
          this.email,
          this.password
      );
      this.errors = validations.checkLoginValidations();
      if (!this.errors.length) {
        return false;
      }
    }
  },
  // computed: {
  //   ...mapState('auth', {
  //     username: state => state.username
  //   })
  // }
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