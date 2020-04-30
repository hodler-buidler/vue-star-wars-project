import transformEntityUrlRelationsTowardsIdStyle from './transformEntityUrlRelationsTowardsIdStyle';

function transformPlanet(planet) {
    transformEntityUrlRelationsTowardsIdStyle(planet, {
        'url': 'id',
        'residents': 'peopleIds'
    });
}

export default transformPlanet;