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

        <transition name='fadeIn'>
          <div v-show='isPeopleFound' class='cards-container page-content__item'>
            <person-card
              v-for='person in people'
              :person='person'
              :key='person.id'
            />

            <intersection-observer @intersect='peopleListEndIntersected' />
          </div>
        </transition>

        <div class='load-more-spinner' v-show="isInfiniteScrollLoading">
          <ui-simple-loader />
        </div>

        <div class='cards-not-found-message page-content__item' v-show='isPeopleNotFound'>
          <span class='alert-text'>Unfortunatelly, we couldn't find anything.</span>
        </div>
      </div>
    </the-content>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader';
import TheContent from '@/components/TheContent/TheContent';
import UiTextField from '@/ui/UiTextField/UiTextField';
import UiSimpleLoader from '@/ui/UiSimpleLoader/UiSimpleLoader';
import UiLoader from '@/ui/UiLoader/UiLoader';
import PersonCard from '@/components/PersonCard/PersonCard';
import debounce from '@/utils/helpers/debounce';
import IntersectionObserver from '@/components/IntersectionObserver/IntersectionObserver';

const DEBOUNCE_DELAY = 500;

export default {
    name: 'HomePage',
    components: {TheHeader, TheContent, UiTextField, PersonCard, UiLoader, IntersectionObserver, UiSimpleLoader},
    data() {
      return {
        isInitialLoading: true,

        searchValue: '',
        isSearching: false,
        relevantSearchResult: null,

        isPeopleLoading: false,
        lastPeopleResponse: null,
        lastSearchPeopleResponse: null,
        isInfiniteScrollLoading: false
      }
    },
    computed: {
      people() {
        if (Array.isArray(this.searchResult)) return this.searchResult;
        return this.$store.getters['people/getAll'];
      },

      isPeopleFound() {
        return !this.isSearching && this.people.length && this.searchResult !== -1;
      },

      isPeopleNotFound() {
        return !this.isSearching && this.searchResult === -1;
      },

      searchResult: {
        /**
         * null - search is unneccesary at the moment
         * -1 - nothing were found
         * array[people] - search result
         */
        get: function() {
          if (!this.searchValue) return null;
          return this.relevantSearchResult;
        },
        set: function(value) {
          if (this.searchValue) {
            if (Array.isArray(value) && value.length) this.relevantSearchResult = value;
            else this.relevantSearchResult = -1;
          }
        }
      }
    },
    created() {
      this.loadPeopleWithSpecies();
    },
    methods: {
      async loadPeopleWithSpecies() {
        this.isPeopleLoading = true;
        var response = await this.$store.dispatch('people/load');
        this.isPeopleLoading = false;

        if (this.isInitialLoading) this.isInitialLoading = false;

        if (response.isSuccess) this.loadSpeciesForPeople();

        if (!response.isError) {
          this.lastPeopleResponse = response;
        }
      },

      async searchPeople() {
        if (this.searchValue) {
          this.isSearching = this.isPeopleLoading = true;
          var response = await this.$store.dispatch('people/load', {
            requestParams: {
              search: this.searchValue
            }
          });
          this.isSearching = this.isPeopleLoading = false;

          if (!response.isError) {
            this.searchResult = response.content.data.results;
            this.lastSearchPeopleResponse = response;
          }          

          if (response.isSuccess) this.loadSpeciesForPeople();
        }
      },

      async loadMorePeople(url, isSearch) {
        this.isPeopleLoading = this.isInfiniteScrollLoading = true;
        var response = await this.$store.dispatch('people/load', {url});
        this.isPeopleLoading =  this.isInfiniteScrollLoading = false;

        if (!response.isError) {
          if (isSearch) {
            this.searchResult = [...this.searchResult, ...response.content.data.results];
            this.lastSearchPeopleResponse = response;
          } else {
            this.lastPeopleResponse = response;
          }
        }          

        if (response.isSuccess) this.loadSpeciesForPeople();
      },

      loadSpeciesForPeople() {
        var dependentSpeciesIds = this.$store.getters['people/getAllDependentSpeciesIds'];
        this.$store.dispatch('species/loadByIds', dependentSpeciesIds);
      },

      peopleListEndIntersected() {
         var data = this.retrieveLastResponseOrFail();
         if (data) {
           var [lastResponse, isSearch] = data;
           this.loadMorePeople(lastResponse.content.data.next, isSearch);
         }
      },

      retrieveLastResponseOrFail() {
        if (this.isPeopleLoading) return false;

        if (this.searchResult) {
          if (!this.lastSearchPeopleResponse) return false;
          if (!this.lastSearchPeopleResponse.content.data.next) return false;
          return [this.lastSearchPeopleResponse, true];
        } 

        if (!this.lastPeopleResponse) return false;
        if (!this.lastPeopleResponse.content.data.next) return false;
        return [this.lastPeopleResponse, false];
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
$page-items-margin-tablet: 35px;
$page-items-margin-mobile: 22px;

.page-content {
  @include flex(normal, normal, column);
  margin-top: $page-items-margin;
  margin-bottom: $page-items-margin;

  &__item {
    margin-top: $page-items-margin;
    margin-bottom: $page-items-margin;
  }
}

.cards-search {
  width: 75%;
  margin: auto;
}

.cards-searching-loader {
  @include flex(center, center);
  margin-top: 70px;
}

.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;
}

.cards-not-found-message {
  text-align: center;
}

.load-more-spinner {
  @include flex(center, center)
}

@media screen and (max-width: 1024px) {
  .page-content {
      margin-top: $page-items-margin-tablet;
      margin-bottom: $page-items-margin-tablet;

      &__item {
        margin-top: $page-items-margin-mobile;
        margin-bottom: $page-items-margin-tablet;
      }
  }
}

@media screen and (max-width: 767px) {
  .page-content {
      margin-top: $page-items-margin-mobile;
      margin-bottom: $page-items-margin-mobile;

      &__item {
        margin-top: $page-items-margin-mobile;
        margin-bottom: $page-items-margin-mobile;
      }
  }

  .cards-container {
    grid-gap: 24px;
  }
}

@media screen and (max-width: 567px) {
  .cards-container {
    grid-template-columns: 1fr;
  }

  .cards-search {
    width: 100%;
  }
}
</style>