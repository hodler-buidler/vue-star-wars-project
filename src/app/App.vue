<template>
  <div class='page' id="app">
    <div class='page__content'>
      <router-view/>
    </div>
    <ui-scroll-top />
    <the-footer class='page__footer' />
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter/TheFooter';
import UiScrollTop from '@/ui/UiScrollTop/UiScrollTop';

export default {
  name: 'App',
  components: {TheFooter, UiScrollTop}
}
</script>

<style lang='scss'>
  @import '~styles/core';
</style>
