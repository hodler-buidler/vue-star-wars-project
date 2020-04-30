import api from '@/api';
import Response from '@/utils/response';
import RequestsCache from '@/utils/requests-cache';
import addEntities from '@/utils/store-helpers/addEntities';

const ADD_FILMS_MUTATION = 'ADD_FILMS';

var films = {
    namespaced: true,
    state: {
        films: [],
        cache: new RequestsCache()
    },
    getters: {
        getFilmsByPersonId: state => personId => {
            var films = state.films.filter(function findFilms(film) {
                return film.peopleIds.includes(personId);
            });
            return films;
        }
    },
    mutations: {
        [ADD_FILMS_MUTATION] (state, films) {
            addEntities(state.films, films, (film) => {
                api.$core.transformFilm(film);
            });
        }
    },
    actions: {
        async loadByIds(context, ids) {
            var requests = [];
            ids.forEach(function loadItemById(id) {
                var request = api.makeRequest('films', 'getOne', {id});
                var cachedResponse = context.state.cache.check(request);

                if (!cachedResponse) {
                    requests.push(api.sendRequestAsync(request));
                    context.state.cache.add(request, true); // do not collect response
                }
            });

            if (requests.length) {
                try {
                    var responses = await Promise.all(requests);
                    var films = responses.map(response => response.data);
                    context.commit(ADD_FILMS_MUTATION, films);
                    return new Response('ok', films);
                } catch ({response}) {
                    return new Response('error', response);
                }
            }
            
            return new Response('cached');
        }
    }
};

export default films;