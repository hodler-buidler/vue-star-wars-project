/**
 * Returns entity id from urls like: https://swapi.dev/api/planets/1/ (1 at this case)
 * @param {string} url 
 */
function getEntityIdFromUrl(url) {
    var linkHTML = document.createElement('a');
    linkHTML.href = url;
    
    var urlArr = linkHTML.pathname.split('/');

    var entityId = urlArr.find(v => v.match(/([0-9])+/));
    return entityId;
}

export default getEntityIdFromUrl;