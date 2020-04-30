import api from '@/api';
import Response from '@/utils/response';
import RequestsCache from '@/utils/requests-cache';
import addEntities from '@/utils/store-helpers/addEntities';
import uniq from 'lodash/uniq';

const ADD_PEOPLE_MUTATION = 'ADD_PEOPLE';

var people = {
    namespaced: true,
    state: {
        people: [],
        cache: new RequestsCache()
    },
    getters: {
        getAll: state => {
            return state.people;
        },

        getAllDependentSpeciesIds: state => {
            var dependentSpeciesIds = [];
            state.people.forEach(function mergeSpeciesIds(person) {
                dependentSpeciesIds = [...dependentSpeciesIds, ...person.speciesIds];
            });
            return uniq(dependentSpeciesIds);
        }
    },
    mutations: {
        [ADD_PEOPLE_MUTATION] (state, people) {
            addEntities(state.people, people, (person) => {
                api.$core.transformPerson(person);
            });
        }
    },
    actions: {
        async load(context) {
            var request = api.makeRequest('people', 'getMany');
            if (!context.state.cache.check(request)) {
                try {
                    var response = await api.sendRequestAsync(request);
                    var people = response.data.results;
                    context.commit(ADD_PEOPLE_MUTATION, people);
                    context.state.cache.add(request);
                    return new Response('ok', people);
                } catch ({response}) {
                    return new Response('error', response)
                }
            }
            return new Response('cached');
        }
    }
};

export default people;