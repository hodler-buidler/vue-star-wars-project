import api from '@/api';
import Response from '@/utils/response';
import RequestsCache from '@/utils/requests-cache';
import addEntities from '@/utils/store-helpers/addEntities';

const ADD_SPECIES_MUTATION = 'ADD_SPECIES';

var species = {
    namespaced: true,
    state: {
        species: [],
        cache: new RequestsCache()
    },
    getters: {
        getSpeciesByPersonId: state => personId => {
            var species = state.species.filter(function findSpeciesItem(speciesItem) {
                return speciesItem.peopleIds.includes(personId);
            });
            return species;
        }
    },
    mutations: {
        [ADD_SPECIES_MUTATION] (state, species) {
            addEntities(state.species, species, (speciesItem) => {
                api.$core.transformSpeciesItem(speciesItem);
            });
        }
    },
    actions: {
        async loadByIds(context, ids) {
            var requests = [];
            ids.forEach(function loadItemById(id) {
                var request = api.makeRequest('species', 'getOne', {id});
                if (!context.state.cache.check(request)) {
                    requests.push(api.sendRequestAsync(request));
                    context.state.cache.add(request);
                }
            });

            if (requests.length) {
                try {
                    var responses = await Promise.all(requests);
                    var species = responses.map(response => response.data);
                    context.commit(ADD_SPECIES_MUTATION, species);
                    return new Response('ok', species);
                } catch ({response}) {
                    return new Response('error', response);
                }
            }
            
            return new Response('cached');
        }
    }
};

export default species;