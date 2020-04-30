import getEntityIdFromUrl from './getEntityIdFromUrl';
import transformEntityUrlRelationsTowardsIdStyle from './transformEntityUrlRelationsTowardsIdStyle';
import transformPerson from './transformPerson';
import transformSpeciesItem from './transformSpeciesItem';
import transformFilm from './transformFilm';
import transformPlanet from './transformPlanet';

var core = {
    getEntityIdFromUrl,
    transformEntityUrlRelationsTowardsIdStyle,
    transformPerson,
    transformSpeciesItem,
    transformFilm,
    transformPlanet,
};

export default core;