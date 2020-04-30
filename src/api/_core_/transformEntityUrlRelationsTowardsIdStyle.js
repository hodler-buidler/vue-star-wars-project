import getEntityIdFromUrl from './getEntityIdFromUrl';

/**
 * @param {object} entity Entity which should be enriched with id-relation fields.
 * @param {object} relations {entityFieldToGetDataFrom: newEntityFieldToCollectIdsIn}
 */
function transformEntityUrlRelationsTowardsIdStyle(entity, relations = {}) {
    for (let relationKey in relations) {
        let relationValue = entity[relationKey]; // current value of entity which might contain bunch of URLs
        let relationEntityKey = relations[relationKey]; // key which would contain id relations

        if (Array.isArray(relationValue)) { // then there's hasMany
            entity[relationEntityKey] = [];

            // Transform urls into ids and collect
            relationValue.forEach(function putURLInIdAndCollect(relationshipUrl) {
                const relatedId = getEntityIdFromUrl(relationshipUrl);
                if (!entity[relationEntityKey].includes(relatedId)) {
                    entity[relationEntityKey].push(relatedId);
                }
            });
        } else if (typeof relationValue == 'string') { // than there's hasOne
            entity[relationEntityKey] = getEntityIdFromUrl(relationValue);
        }
    }
}

export default transformEntityUrlRelationsTowardsIdStyle;