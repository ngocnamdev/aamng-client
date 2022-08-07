<template>
  <q-layout view="hHh lpR lFf" class="text-accent">
    <q-header bordered class="bg-white text-accent">
      <q-toolbar class="row justify-between bg-blue">
        <div class="row justify-start">
          <q-btn dense flat round icon="menu" @click="toggleDrawer" />
          <q-toolbar-title>
            <!-- <brand-logo></brand-logo> -->
            <p class="title">SELF-MANAGEMENT</p>
          </q-toolbar-title>
        </div>
        <div class="q-gutter-sm row items-center no-wrap">
          <router-link to="/" style="text-decoration: none;">
            <q-btn round dense flat color="white" icon="home">
            </q-btn>
          </router-link>
          <q-btn round dense flat color="white" icon="done" type="a" href="#" target="_blank">
          </q-btn>
          <q-btn round dense flat icon="directions" style="color:white !important;" type="a" href="#" target="_blank">
          </q-btn>
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
            <q-menu
            >
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                        class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
      :mini="miniDrawer"
      side="left"
      class="q-pa-sm column justify-between no-wrap"
    >
      <the-sidebar></the-sidebar>
      <div v-if="!isMobile" class="absolute mini-drawer-btn">
        <q-btn
          dense
          round
          text
          unelevated
          color="blue-2"
          text-color="primary"
          :icon="miniDrawerIcon"
          @click="toggleMiniDrawer()"
        />
      </div>
    </q-drawer>

    <q-page-container class="main-page-container">
      <router-view />
    </q-page-container>
    <q-footer id="footer" ref="mainFooter"> </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useApplicationStore } from 'src/stores/application'
import TheSidebar from 'components/layouts/the-sidebar.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { TheSidebar },
  setup() {
    const store = useApplicationStore()
    const $q = useQuasar()
    const drawer = ref(false)
    const miniDrawer = ref(true)

    const miniDrawerIcon = computed(() => {
      return miniDrawer.value ? 'chevron_right' : 'chevron_left'
    })
    const isMobile = computed(() => {
      return $q.screen.lt.sm
    })

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }
    const toggleMiniDrawer = () => {
      miniDrawer.value = !miniDrawer.value
    }

    onMounted(() => {
      store.toggleFooterMountedState()
    })

    return {
      drawer,
      miniDrawer,
      miniDrawerIcon,
      isMobile,
      toggleDrawer,
      toggleMiniDrawer,
    }
  },
})
</script>
<style>
.mini-drawer-btn {
  top: 15px;
  right: -17px;
}
.main-page-container {
  max-height: calc(100vh);
  overflow: hidden;
  overflow-y: scroll;
}
.title {
  margin: 0px;
}
</style>

