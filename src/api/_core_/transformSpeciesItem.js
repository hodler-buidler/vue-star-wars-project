import transformEntityUrlRelationsTowardsIdStyle from './transformEntityUrlRelationsTowardsIdStyle';

function transformSpeciesItem(speciesItem) {
    transformEntityUrlRelationsTowardsIdStyle(speciesItem, {
        'url': 'id',
        'people': 'peopleIds'
    });
}

export default transformSpeciesItem;