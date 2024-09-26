<template>
  <v-app>
    <router-view></router-view>
    <snackBar />
  </v-app>
</template>

<script>
import snackBar from '@/components/SnackBar.vue'

export default {
  name: "App",
  components: {
    snackBar
  },

  data: () => ({
    //
  }),
};
</script>
