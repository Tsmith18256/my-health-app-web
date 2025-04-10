/**
 * Function to be used with one of the filtering array functions (`filter`,
 * `find`, etc). This function is called with a key and desired value, then a
 * function will be returned to pass to the array functions.
 *
 * eg: `arr.find(findByFieldValue("keyName", value))`
 */
export const findByFieldValue = <
  TArrayItem extends object,
  TKey extends keyof TArrayItem,
  TExpected extends TArrayItem[TKey]
>(
  arr: TArrayItem[],
  { inequality = false, key, value }: IFindByFieldValueOptions<TKey, TExpected>
) => {
  return arr.find(
    (item): item is TArrayItem & { [K in TKey]: TExpected } => {
      return inequality ? item[key] !== value : item[key] === value;
    }
  );
};

interface IFindByFieldValueOptions<
  TKey extends string | number | symbol,
  TValue
> {
  /**
   * Whether or not to do a `!==` comparison instead of `===`. Defaults to
   * false.
   */
  inequality?: boolean;
  /**
   * The key to check the provided value against.
   */
  key: TKey;
  /**
   * The value to search for.
   */
  value: TValue;
}
