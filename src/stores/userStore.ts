import { defineStore } from 'pinia'
import api from 'src/utils/api'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: '',
    userInfo: null,
    userRole: 5,
  }),
  getters: {
    isLoggedIn: (state) => {
      if(state.token === '') {
        const data = window.localStorage.getItem('userInfo')
        console.log('data from local storage')
        console.log(data)
        if(data === undefined || data === null || data === '') {
          return false
        } else {
          const objData = JSON.parse(data)
          console.log(objData)
          if(objData === undefined || data === null)
            return false
          state.token = objData.data.token
          return true
        }
      } else return true
    }
  },
  actions: {
    async login(user: string, password: string) {
      try {
        const result = await api ({
          method: 'post',
          url: 'login',
          data: {user: user, password: password}
        })
        if (result.data.code == 0) {
          // Store to localStorage page, refresh still saves value
          this.userInfo = result.data.data
          window.localStorage.setItem('userInfo', JSON.stringify(result.data))
        }
        return result.data
      } catch (error) {
        console.log(error)
      }
    },
    logout() {
      try {
        this.userInfo = null
        this.token = ''
        window.localStorage.removeItem('userInfo')
      } catch (error) {
        console.log(error)
      }
    }
  },
})
