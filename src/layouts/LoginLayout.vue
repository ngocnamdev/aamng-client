<template>
  <q-layout>
    <q-header bordered class="bg-dark-blue">
      <q-toolbar class="row justify-between">
        <router-link v-if="userStore.isLoggedIn" to="/dashboard">
          <q-avatar size="md" color="green" text-color="white" icon="dashboard" />
        </router-link>
        <router-link v-else to="/">
          <q-avatar size="md" color="green" text-color="white" icon="home" />
        </router-link>
        <h3 class="title">AA EQUIPMENT MANAGEMENT</h3>
        <div>
          <q-btn v-if="userStore.isLoggedIn" flat size="lg" title="Log out" @click="onLogout">
            LOGOUT
            <q-icon name="logout" class="q-ml-sm"/>
          </q-btn>
          <q-btn v-else flat size="lg" icon="login" title="Log in">
            <router-link to="/auth/login" title="Login" class="login-link q-ml-sm">
              LOGIN
            </router-link>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from 'stores/userStore'

export default defineComponent({
  name: 'MainLayout',
  components: { },
  setup(){
    const userStore = useUserStore()

    const onLogout = () => {
      userStore.logout()
    }
    return {
      userStore,
      onLogout
    }
  }
})
</script>

<style scoped>
.title {
  color: white;
  font-weight: 700;
  margin: 10px;
}
.login-link {
  color: white;
  text-decoration: none;
}
</style>
