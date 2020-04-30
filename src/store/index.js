import Vuex from 'vuex';
import Vue from 'vue';
import people from './people';
import species from './species';

Vue.use(Vuex);

var store = new Vuex.Store({
    modules: {
        people,
        species
    }
});

export default store;