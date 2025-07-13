/**
 * Helper type that's equivalent to applying `Partial` to all fields on the
 * object, and all nested objects.
 *
 * This utility will dive into objects, Promises, and arrays.
 */
export type DeepPartial<TInput> =
  TInput extends Promise<infer PromiseReturn>
    ? Promise<DeepPartial<PromiseReturn>>
    : {
        [Key in keyof TInput]?: TInput[Key] extends (infer ArrElement)[]
          ? DeepPartial<ArrElement>[]
          : TInput[Key] extends object | undefined
            ? DeepPartial<TInput[Key]>
            : TInput[Key];
      };
