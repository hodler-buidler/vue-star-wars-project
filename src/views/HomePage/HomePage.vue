<template>
  <div>
    <the-header />
    <the-content :is-loading='isInitialLoading'>
      <div class='page-content'>
        <div class='cards-search page-content__item'>
          <ui-text-field label='Search by name' icon='search' />
        </div>
        <div class='cards-container page-content__item'>
          <person-card
            v-for='person in people'
            :person='person'
            :key='person.id'
          />
        </div>
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
    components: {TheHeader, TheContent, UiTextField, PersonCard},
    computed: {
      people() {
        return this.$store.getters['people/getAll'];
      },

      isInitialLoading() {
        return !this.people.length;
      }
    },
    created() {
      this.loadPeopleWithSpecies();
    },
    methods: {
      async loadPeopleWithSpecies() {
        await this.$store.dispatch('people/load');
        var dependentSpeciesIds = this.$store.getters['people/getAllDependentSpeciesIds'];
        await this.$store.dispatch('species/loadByIds', dependentSpeciesIds);
      }
    }
}
</script>

<style lang='scss' scoped>
$page-items-margin: 80px;

.page-content {
  @include flex(normal, normal, column);
  margin: $page-items-margin 0;

  &__item {
    margin: $page-items-margin 0;
  }
}

.cards-search {
  width: 75%;
  margin: auto;
}

.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;
}
</style>