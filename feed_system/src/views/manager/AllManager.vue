<template>
  <div>
    <h3>页面1</h3>
    <auth-button :authId="'100'">
      <el-button type="primary" @click="test">测试</el-button>
    </auth-button>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'AllManager',
  methods: {
    test () {
      store.dispatch('setButtonAuths', ['200', '300']).then(res => {})
    }
  }
}
</script>

<style>
</style>
