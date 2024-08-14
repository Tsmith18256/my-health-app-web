// Need to polyfill because toSpliced requires the following unsupported versions:
// - Chrome 110
// - Safari (iOS) 16
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Could be undefined.
if (!Array.prototype.toSpliced) {
  // eslint-disable-next-line no-extend-native -- Polyfill.
  Array.prototype.toSpliced = function toSpliced<T>(
    start: number,
    deleteCount?: number,
    ...items: T[]
  ): T[] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- TS thinks `this` is `any` but it's array.
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
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Could be undefined.
if (!Array.prototype.toSorted) {
  // eslint-disable-next-line no-extend-native -- Polyfill.
  Array.prototype.toSorted = function toSorted<T>(
    compareFn?: (a: T, b: T) => number,
  ): T[] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- TS thinks `this` is `any` but it's array.
    const cloned = [...this];

    cloned.sort(compareFn);

    return cloned;
  };
}
