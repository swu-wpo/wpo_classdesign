<template>
  <div style="display: inlie-block" v-if="checkAuth()">
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AuthButton',
  props: {
    authId: {
      type: String,
      required: true
    }
  },
  created () {
    this.checkAuth()
  },
  computed: {
    ...mapGetters(['buttons'])
  },
  methods: {
    checkAuth () {
      if (this.buttons.includes(this.authId)) {
        return true
      }
      return false
    }
  }
}
</script>

<style>
</style>
