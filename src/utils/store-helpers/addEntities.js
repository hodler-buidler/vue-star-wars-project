function addEntities(entitiesArr, entities, cb) {
    if (Array.isArray(entities)) {
        entities.forEach(function adjustEntity(item) {
            cb(item);

            // If I have duplicates, I refresh them with provided instance
            // Duplicates are tracked by entity.id param comparison
            var duplicateEntityIndex = entitiesArr.findIndex(function findDuplicate(val) {
                return val.id == item.id;
            });

            if (duplicateEntityIndex !== -1) {
                entitiesArr.splice(duplicateEntityIndex, 1, item);
            } else {
                entitiesArr.push(item);
            }
        });
    } else throw new Error(`The entities should be collected in array! ${typeof entities} given.`);
}


export default addEntities;