/**
 * A simple helper type to simplify the syntax of getting all the values from an
 * object type.
 *
 * `ObjectValues<typeof myObj>` is synonymous with
 * `typeof myObj[keyof typeof myObj]`.
 */
export type ObjectValues<T extends object> = T[keyof T];
