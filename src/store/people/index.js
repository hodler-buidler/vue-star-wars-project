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
        async load(context, {
            requestParams = {},
            url = null
        } = {}) {
            var request;

            if (url) request = api.makeRequest('general', 'get', {url});
            else request = api.makeRequest('people', 'getMany', requestParams);

            var cachedResponse = context.state.cache.check(request);

            if (!cachedResponse) {
                try {
                    var response = await api.sendRequestAsync(request);
                    var people = response.data.results;

                    context.commit(ADD_PEOPLE_MUTATION, people);
                    context.state.cache.add(request, response);
                    
                    return new Response('ok', response);
                } catch (error) {
                    return new Response('error', error.response)
                }
            }
            return new Response('cached', cachedResponse);
        },
    }
};

export default people;