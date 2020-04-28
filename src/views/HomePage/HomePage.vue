<template>
  <div class='page'>
      <the-header @click.native='isLoading = !isLoading' />
      <the-content :is-loading='isLoading'>
        Hello Bananas!
      </the-content>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader';
import TheContent from '@/components/TheContent/TheContent';

export default {
    name: 'HomePage',
    components: {TheHeader, TheContent},
    data() {
      return {
        isLoading: true
      }
    },
}
</script>

<style lang='scss'>
.initial-content-loader {
  height: 100%;
}
</style>