/**
 * Utility to combine class names. This function can be called with an array of
 * class names or an object where each key is a class name and each value is
 * whether or not it should be included.
 *
 * Example with array:
 * ```
 *  const className = combineClassNames([
 *    'dropdown',
 *    extraClassNames
 *  ]);
 * ```
 *
 * Note that the array can also contain undefined values. This is useful for
 * scenarios where a component accepts class names as an optional prop and needs
 * to join them to a base class name.
 *
 * Example with object:
 * ```
 *  const className = combineClassNames({
 *    dropdown: true,
 *    'dropdown-open': isDropdownOpen
 *  });
 * ```
 */
export const combineClassNames = (
  classNames: CombineClassNamesParam,
): string => {
  if (Array.isArray(classNames)) {
    return classNames.filter((className) => className).join(" ");
  }

  return Object.keys(classNames)
    .filter((className) => classNames[className])
    .join(" ");
};

/**
 * The function can accept either an array or a single object.
 */
type CombineClassNamesParam = (string | undefined)[] | Record<string, boolean>;
