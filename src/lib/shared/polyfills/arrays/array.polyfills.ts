// Need to polyfill because toSpliced requires the following unsupported versions:
// - Chrome 110
// - Safari (iOS) 16
if (!Array.prototype.toSpliced) {
  // eslint-disable-next-line no-extend-native -- Polyfill.
  Array.prototype.toSpliced = function toSpliced(start, deleteCount, ...items) {
    const cloned = [...this];

    if (deleteCount === undefined) {
      cloned.splice(start);
    } else {
      cloned.splice(start, deleteCount, ...items);
    }

    return cloned;
  };
}

// Need to polyfill because toSorted requires the following unsupported versions:
// - Chrome 110
// - Safari (iOS) 16
if (!Array.prototype.toSorted) {
  // eslint-disable-next-line no-extend-native -- Polyfill.
  Array.prototype.toSorted = function toSorted(compareFn) {
    const cloned = [...this];

    cloned.sort(compareFn);

    return cloned;
  };
}
