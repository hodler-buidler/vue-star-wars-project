<template>
  <div class='page' id="app">
    <div class='page__content'>
      <router-view/>
    </div>
    <the-footer class='page__footer' />
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter/TheFooter';

export default {
  name: 'App',
  components: {TheFooter}
}
</script>

<style lang='scss'>
  @import '~styles/core';
</style>
