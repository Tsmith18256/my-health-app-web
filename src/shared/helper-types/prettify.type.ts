/**
 * Creates a new object type from the given input type. This is useful to trick
 * intellisense into showing a full breakdown of the object instead of an
 * intersection or union type.
 *
 * Example:
 *
 * ```
 *  interface TypeA {
 *    fieldA: string;
 *  }
 *
 *  interface TypeB {
 *    fieldB: string;
 *  }
 *
 *  // This shows as `TypeA & TypeB` when hovering over the type in your IDE.
 *  type Intersect = TypeA & TypeB;
 *
 *  // This shows an object with `fieldA` and `fieldB` when hovering over the
 *  // type in your IDE.
 *  type Intersect = Prettify<TypeA & TypeB>;
 * ```
 */
export type Prettify<TType extends object> = {
  [Key in keyof TType]: TType[Key];
  // The `& {}` on the end takes the formatting improvements one step forward.
  // Without this, hovering over the resulting type name will show a full object
  // type, but hovering over a value will just show `Prettify<x>`.
} & {};
