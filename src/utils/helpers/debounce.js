/**
 * 
 * @param {function} cb Function which calls should be debounced
 * @param {number} interval Time in ms to debounce.
 * @param {boolean} isImmediate Whether to call function immediately (ignore debounce)
 */
function debounce(cb, interval, isImmediate) {
  var timeout;

  return function selfControlledFunction() {
    var context = this, args = arguments;

    var later = function() {
      timeout = null;
      if (!isImmediate) cb.apply(context, args);
    };          

    var canCallNow = isImmediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, interval);

    if (canCallNow) cb.apply(context, args);
  };
}

export default debounce;