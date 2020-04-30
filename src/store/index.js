import Vuex from 'vuex';
import Vue from 'vue';
import people from './people';
import species from './species';
import films from './films';
import planets from './planets';

Vue.use(Vuex);

var store = new Vuex.Store({
    modules: {
        people,
        species,
        films,
        planets
    }
});

export default store;