type BanDuplicate<T, TBanned> = T extends TBanned
  ? "You are not allowed to have duplicate values in an enum."
  : T;

type KeysMinusT<
  TKeys extends string | number | symbol,
  T extends string | number | symbol
> = Exclude<TKeys, T>;

type Enum<T extends object> = {
  [K in keyof T]: BanDuplicate<T[K], T[KeysMinusT<keyof T, K>]>;
};

/**
 * A helper function that applies the `Enum` type to a given object. This is to
 * help with recreating the pattern of the `enum` keyword.
 *
 * The value that this function adds over simply using `as const` is that it
 * will throw an error when using the same value twice in the object.
 */
export const createEnum = <const T extends object>(obj: Enum<T>): Enum<T> => {
  return obj;
};
