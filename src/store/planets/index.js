import api from '@/api';
import Response from '@/utils/response';
import RequestsCache from '@/utils/requests-cache';
import addEntities from '@/utils/store-helpers/addEntities';

const ADD_PLANETS_MUTATION = 'ADD_PLANETS';

var planets = {
    namespaced: true,
    state: {
        planets: [],
        cache: new RequestsCache()
    },
    getters: {
        getPlanetByPersonId: state => personId => {
            var planet = state.planets.find(function findPlanet(p) {
                return p.peopleIds.includes(personId);
            });
            return planet;
        }
    },
    mutations: {
        [ADD_PLANETS_MUTATION] (state, planets) {
            addEntities(state.planets, planets, (planet) => {
                api.$core.transformPlanet(planet);
            });
        }
    },
    actions: {
        async loadByIds(context, ids) {
            var requests = [];
            ids.forEach(function loadItemById(id) {
                var request = api.makeRequest('planets', 'getOne', {id});
                var cachedResponse = context.state.cache.check(request);

                if (!cachedResponse) {
                    requests.push(api.sendRequestAsync(request));
                    context.state.cache.add(request, true); // do not collect response
                }
            });

            if (requests.length) {
                try {
                    var responses = await Promise.all(requests);
                    var planets = responses.map(response => response.data);
                    context.commit(ADD_PLANETS_MUTATION, planets);
                    return new Response('ok', planets);
                } catch ({response}) {
                    return new Response('error', response);
                }
            }
            
            return new Response('cached');
        }
    }
};

export default planets;