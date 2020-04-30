import transformEntityUrlRelationsTowardsIdStyle from './transformEntityUrlRelationsTowardsIdStyle';

function transformPerson(person) {
    transformEntityUrlRelationsTowardsIdStyle(person, {
        'url': 'id',
        'species': 'speciesIds',
        'films': 'filmsIds',
        'homeworld': 'homeworldId'
    });
}

export default transformPerson;