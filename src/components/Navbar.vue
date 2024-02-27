<template>
  <div class="navbar">
    <div v-on:click="$router.push('/')" class="logo">MONKEY SERVICE</div>
    <div v-if="isAuthenticated" class="navbar__bttns">
      <my-button v-on:click="$router.push('/campaigns')">Рассылки</my-button>
      <my-button v-on:click="$router.push('/customers')">Клиенты</my-button>
      <my-button v-on:click="onLogout">Выход</my-button>
    </div>
    <div v-else>
      <my-button v-on:click="$router.push('/login')">Вход</my-button>
      <my-button v-on:click="$router.push('/register')">Регистрация</my-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { IS_USER_AUTHENTICATED_GETTER, LOGOUT_ACTION } from "@/store/storeConstants";
import MyButton from "@/components/UI/MyButton";
export default {
  components: { MyButton },
  computed: {
    ...mapGetters('auth', {
      isAuthenticated: IS_USER_AUTHENTICATED_GETTER
    })
  },
  methods: {
    ...mapActions('auth', {
      logout: LOGOUT_ACTION
    }),
    onLogout() {
      this.logout();
      this.$router.replace('/login');
    }
  }
}
</script>

<style scoped>
.navbar {
  height: 30px;
  background-color: dodgerblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  margin-left: 20px;
  color: white;
  font-size: 1.2em;
}
</style>