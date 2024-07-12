// toSpliced requires the following unsupported versions:
// - Chrome 110
// - Safari (iOS) 16
if (!Array.prototype.toSpliced) {
  Array.prototype.toSpliced = function(start, deleteCount, ...items) {
    const cloned = [...this];

    if (deleteCount == undefined) {
      cloned.splice(start);
    } else {
      cloned.splice(start, deleteCount, ...items);
    }

    return cloned;
  };
}

// toSorted requires the following unsupported versions:
// - Chrome 110
// - Safari (iOS) 16
if (!Array.prototype.toSorted) {
  Array.prototype.toSorted = function(compareFn) {
    const cloned = [...this];

    cloned.sort(compareFn);

    return cloned;
  };
}
