<template>
  <q-card class="login-form q-pa-sm q-py-lg shadow-0">
    <div class="column justify-center items-center q-pa-lg">
      <h3 class="text-h4 text-weight-bold q-my-none text-center">
        Welcome back!
      </h3>
      <q-chip size="md" outline color="accent" icon="security" class="q-px-md">
        <span class="text-accent">Warning:</span>
        <strong class="text-green-13">AA: </strong
        ><span class="text-green-13">for member only</span>
      </q-chip>
    </div>
    <q-card-section>
      <div v-if="formMsg.errorMsg" class="q-mb-md warn-msg">{{ formMsg.errorMsg }}</div>
      <q-input
        v-if="isLoginWithSingle"
        id="single"
        v-model="formData.username"
        label="Single ID"
        stack-label
        outlined
        class="q-mb-md"
      >
      </q-input>
      <q-input
        v-else
        id="gen"
        v-model="formData.gen"
        label="GEN"
        stack-label
        outlined
        class="q-mb-md"
      >
      </q-input>
      <q-input
        id="password"
        v-model="formData.password"
        :type="verification.hidePass ? 'password' : 'text'"
        label="Password"
        stack-label
        outlined
        class="q-mb-md"
      >
        <template #append>
          <q-icon
            :name="verification.hidePass ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="verification.hidePass = !verification.hidePass"
          />
        </template>
      </q-input>
      <div class="row justify-between items-center no-wrap text-no-wrap">
        <q-checkbox
          v-model="formData.rememberMe"
          label="Remember me"
          class="-q-ml-sm text-subtitle1"
          @update:model-value="onChangeRememberMe"
        />
        <q-btn
          color="primary"
          no-caps
          class="text-subtitle1 text-brand q-py-none q-px-sm height-fitcontent q-mb-0"
          flat
          unelevated
          @click="onSignup"
        >
          Forget your password ?
        </q-btn>
      </div>
    </q-card-section>
    <q-card-actions vertical align="center" class="q-px-md">
      <q-btn
        color="primary"
        size="lg"
        no-caps
        class="full-width bg-brand"
        unelevated
        @click="onLoginWithSingle"
      >
        Login with single
      </q-btn>
      <q-btn
        color="primary"
        no-caps
        class="full-width"
        size="lg"
        unelevated
        @click="onLoginWithGen"
      >
        Login with your GEN
      </q-btn>
      <q-btn
        color="primary"
        no-caps
        class="text-subtitle1 q-pa-none height-fitcontent q-mt-md self-end"
        flat
        unelevated
        @click="onSignup"
      >
        Signup if you have no account?
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { Base64 }  from 'js-base64'
import { loginWithSingle, loginWithGen } from '../../../utils/employeeApi'
import { useUserStore } from '../../../stores/userStore'

type LOGIN_TYPE = 'SINGLE' | 'GEN'
const LOGIN_OPTION = {
  GEN: 'GEN' as LOGIN_TYPE,
  SINGLE: 'SINGLE' as LOGIN_TYPE,
}
export default defineComponent({
  name: 'LoginForm',
  components: {
  },
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const $q = useQuasar()

    const verification = reactive({
      hidePass: true,
    })

    const formMsg = reactive({
      errorMsg: '',
    })

    const formData = reactive({
      username: '',
      gen: '',
      password: '',
      type: LOGIN_OPTION.SINGLE,
      rememberMe: true,
    })

    const isLoginWithSingle = computed(() => {
      return formData.type === LOGIN_OPTION.SINGLE
    })

    const _changeLoginType = (type: LOGIN_TYPE) => {
      formData.type = type
    }

    const onLoginWithSingle = async () => {
      if (isLoginWithSingle.value) {
        console.log('Call login api with username')

        checkRememberMe()
        try {
          const loginResult = await loginWithSingle(
            formData.username,
            formData.password
          )
          console.log(loginResult)

          if (loginResult.data.code === 0) {
            userStore.token = loginResult.data.token
            userStore.userInfo = loginResult.data.data
            window.localStorage.setItem('userInfo', JSON.stringify(loginResult.data))
            console.log(`is logged in: ${userStore.isLoggedIn}`)
            router.push('/dashboard')
            return
          } else if (loginResult.data.code == 6) {
            formMsg.errorMsg = loginResult.data.errorMsg
          }
          formMsg.errorMsg = loginResult.data.errorMsg
        } catch (error) {
          console.log(error)
          showNotify('Server error')
        }
        
      } else {
        _changeLoginType(LOGIN_OPTION.SINGLE)
        fillInfoIfLocalExist()
      }
    }

    const onLoginWithGen = async () => {
      if (formData.type === LOGIN_OPTION.GEN) {
        console.log('Call login api with gen')
        formMsg.errorMsg = ''
        checkRememberMe()
        try {
          const genLoginResult = await loginWithGen(
            formData.gen,
            formData.password
          )
          console.log(genLoginResult)
          if(genLoginResult.data.code === 0) {
            console.log('login successfully')
            userStore.token = genLoginResult.data.token
            userStore.userInfo = genLoginResult .data.data
            router.push('/dashboard')
            return
          } else if (genLoginResult.data.code == 5) {
            formMsg.errorMsg = genLoginResult.data.errorMsg
          } else if (genLoginResult.data.code == 6) {
            formMsg.errorMsg = genLoginResult.data.errorMsg
          } else {
            formMsg.errorMsg = genLoginResult.data.errorMsg
          }
  
          showNotify(genLoginResult.data.errorMsg)
        } catch (error) {
          console.log(error)
          showNotify('Server error')
        }
      } else {
        _changeLoginType(LOGIN_OPTION.GEN)
        fillInfoIfLocalExist()
      }
    }

    const checkRememberMe = () => {
      if (formData.rememberMe) {
        if (isLoginWithSingle.value) {
          let content = {
            username: formData.username,
            password: formData.password,
          }
          let enContent = Base64.encode(JSON.stringify(content))
          Cookies.set(formData.type, enContent)
        }
        if (formData.type === LOGIN_OPTION.GEN) {
          let content = {
            gen: formData.gen,
            password: formData.password,
          }
          let enContent = Base64.encode(JSON.stringify(content))
          Cookies.set(formData.type, enContent)
        }
      } else {
        Cookies.remove(formData.type)
      }
    }

    const onSignup = () => {
      showNotify('Please contact with AA leader.')
    }

    const showNotify = (mess: string) => {
      $q.notify({
        position: 'top-right',
        message: mess,
        textColor: 'black',
        color: 'white',
        icon: 'info',
        iconColor: 'red',
        actions: [
          { label: 'DISMISS', color: 'red ', handler: () => { /* ... */ } }
        ]
      })
    }

    const onChangeRememberMe = () => {
      console.log('onRememberMe')
      checkRememberMe()
    }

    const fillInfoIfLocalExist = () => {
      if (Cookies.get(formData.type)) {
        let local = Cookies.get(formData.type)
        let deContent = JSON.parse(Base64.decode(local))
        if (isLoginWithSingle.value) {
          formData.username = deContent.username
          formData.password = deContent.password
        } else {
          formData.gen = deContent.gen
          formData.password = deContent.password
        }
        formData.rememberMe = true
      } else {
        formData.rememberMe = false
      }
    }

    return {
      formData,
      formMsg,
      verification,
      isLoginWithSingle,
      onLoginWithGen,
      onLoginWithSingle,
      onChangeRememberMe,
      fillInfoIfLocalExist,
      onSignup,
    }
  },
  created() {
    this.fillInfoIfLocalExist();
  }
})
</script>
<style lang="scss">
.warn-msg {
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  font-size: 12px;
  background: rgba(244, 67, 53, 1);
  margin: 10px 0;
}
</style>
