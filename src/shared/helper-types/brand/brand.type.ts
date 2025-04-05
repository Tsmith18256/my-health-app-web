/**
 * This unique brand symbol helps IDE autocomplete understand what the
 * underlying type of a brand type is.
 */
declare const brand: unique symbol;

/**
 * A brand type allows for getting more specific with a loose type. It is useful
 * for validation and other use cases where you want to know that the data type
 * meets a certain criteria that normal static typing can't represent.
 *
 * For example, `type EmailAddress = Brand<string, "EmailAddress">;` will create
 * a new brand type to be used for email addresses. `EmailAddress` can be used
 * anywhere a string is required, but unbranded strings can't be used where an
 * email address is required.
 *
 * The second generic parameter, `TBrand` must be a value that is unique to each
 * brand type. If you have 2 brands with the same `TBrand` value, those brands
 * could be used interchangeably.
 *
 * To mark something as branded, it simply needs to be cast from the
 * `TParentType`.
 */
export type Brand<TParentType, TBrand> = TParentType & { [brand]: TBrand };
