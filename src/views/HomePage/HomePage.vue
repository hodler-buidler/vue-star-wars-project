<template>
  <div>
    <the-header />
    <the-content :is-loading='isInitialLoading'>
      <div class='page-content'>
        <div class='cards-search page-content__item'>
          <ui-text-field
            @input.native="debouncedSearch"
            @keypress.enter.native="immidiateSearch"
            v-model.trim='searchValue'
            label='Search by name'
            icon='search'
          />
        </div>

        <div class='cards-searching-loader' v-show='isSearching'>
          <ui-loader />
        </div>

        <div v-show='isPeopleFound' class='cards-container page-content__item'>
          <person-card
            v-for='person in people'
            :person='person'
            :key='person.id'
          />
        </div>

        <div class='cards-not-found-message page-content__item' v-show='isPeopleNotFound'>
          <span class='alert-text'>Unfortunatelly, we couldn't find anything :(</span>
        </div>
      </div>
    </the-content>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader';
import TheContent from '@/components/TheContent/TheContent';
import UiTextField from '@/ui/UiTextField/UiTextField';
import UiLoader from '@/ui/UiLoader/UiLoader';
import PersonCard from '@/components/PersonCard/PersonCard';
import debounce from '@/utils/helpers/debounce';

const DEBOUNCE_DELAY = 500;

export default {
    name: 'HomePage',
    components: {TheHeader, TheContent, UiTextField, PersonCard, UiLoader},
    data() {
      return {
        searchValue: '',
        isSearching: false,
        searchResult: null,
        isInitialLoading: true
      }
    },
    computed: {
      people() {
        if (this.searchResult !== null) return this.searchResult;
        return this.$store.getters['people/getAll'];
      },

      isPeopleFound() {
        return this.people.length && !this.isSearching;
      },

      isPeopleNotFound() {
        return !this.people.length && !this.isSearching;
      }
    },
    watch: {
      searchValue(value) {
        if (!value) this.searchResult = null;
      }
    },
    created() {
      this.loadPeopleWithSpecies();
    },
    methods: {
      async loadPeopleWithSpecies() {
        var response = await this.$store.dispatch('people/load');
        if (this.isInitialLoading) this.isInitialLoading = false;
        if (response.isSuccess) this.loadSpeciesForPeople();
      },

      async searchPeople() {
        if (this.searchValue) {
          this.isSearching = true;
          var response = await this.$store.dispatch('people/load', {search: this.searchValue});
          if (!response.isError) this.searchResult = response.content.data.results;
          this.isSearching = false;

          if (response.isSuccess) this.loadSpeciesForPeople();
        }
      },

      loadSpeciesForPeople() {
        var dependentSpeciesIds = this.$store.getters['people/getAllDependentSpeciesIds'];
        this.$store.dispatch('species/loadByIds', dependentSpeciesIds);
      },

      debouncedSearch: debounce(function() {
        this.searchPeople();
      }, DEBOUNCE_DELAY),

      immidiateSearch() {
        this.searchPeople();
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

.cards-searching-loader {
  @include flex(center, center);
  margin-top: 100px;
}

.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;
}

.cards-not-found-message {
  text-align: center;
}
</style>