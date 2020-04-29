<template>
  <div>
    <the-header />
    <the-content :is-loading='false'>
      <div>
        <ui-text-field label='Search by name' icon='search' />
      </div>
      <div>
        <person-card />
      </div>
    </the-content>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader';
import TheContent from '@/components/TheContent/TheContent';
import UiTextField from '@/ui/UiTextField/UiTextField';
import PersonCard from '@/components/PersonCard/PersonCard';

export default {
    name: 'HomePage',
    components: {TheHeader, TheContent, UiTextField, PersonCard}
}
</script>

<style lang='scss'>
</style>