<template>
  <q-page class="row items-stretch justify-center">
    <div class="col-xs-0 col-sm-0 col-md-7 col-lg-8 col-xl-9">
      <q-img
        src="~assets/loginBackground.jpg"
        spinner-color="white"
        fit="cover"
        class="full-height full-width"
      >
      </q-img>
    </div>
    <div
      class="col-xs-12 col-sm-8 col-md-5 col-lg-4 col-xl-3 q-pa-lg q-pa-xs-sm q-pa-sm-sm"
    >
      <login-form></login-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm from 'components/pages/auth/login-form.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginForm,
  },
})
</script>
