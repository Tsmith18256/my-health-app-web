import { FormValueTypeError } from "@/shared/errors/form-value-type-error.class";

/**
 * Returns a record of the key/value pairs for the given keys. Only string
 * values are returned.
 *
 * If a given key is not found or maps to a file value, the item will be
 */
export const getFormStrings = <TKey extends string>(
  formData: FormData,
  keys: TKey[],
) => {
  return keys.reduce<Partial<Record<TKey, string>>>((stringEntries, key) => {
    const value = formData.get(key);

    if (value instanceof File) {
      throw new FormValueTypeError(key, value);
    }

    if (typeof value === "string") {
      return {
        ...stringEntries,
        [key]: value,
      };
    }

    return stringEntries;
  }, {});
};
