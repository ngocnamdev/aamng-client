import { defineStore } from 'pinia'

export const useApplicationStore = defineStore('application', {
  state: () => ({
    footerMounted: false,
  }),
  actions: {
    toggleFooterMountedState() {
      this.footerMounted = !this.footerMounted
    },
  },
})
