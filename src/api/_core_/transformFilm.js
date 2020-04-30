import transformEntityUrlRelationsTowardsIdStyle from './transformEntityUrlRelationsTowardsIdStyle';

function transformFilm(film) {
    transformEntityUrlRelationsTowardsIdStyle(film, {
        'url': 'id',
        'characters': 'peopleIds'
    });
}

export default transformFilm;