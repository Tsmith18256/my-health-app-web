/**
 * Takes in several form field names and attempts to parse floats from those fields in the given form data. An object is
 * returned that is the mapping of all fields to their parsed floats.
 */
export const parseFloatsFromFormFields = <T extends string>(
  fieldNames: T[],
  formData: FormData,
): Record<T, number> => {
  return fieldNames.reduce(
    (acc, name) => {
      return {
        ...acc,
        [name]: parseFloat(formData.get(name) as string),
      };
    },
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter -- Object will meet interface once reduce is completed.
    {} as Record<T, number>,
  );
};
