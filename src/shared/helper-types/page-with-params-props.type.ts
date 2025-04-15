import { Prettify } from "@/shared/helper-types/prettify.type";

/**
 * Helper type for creating prop types for Next pages that take params. Simply
 * pass the name(s) of the param(s) that the page uses and the props object
 * will be created.
 *
 * eg: `PageWithParamsProps<'id'>`
 */
export type PageWithParamsProps<TParams extends string> = Prettify<{
  params: Promise<Record<TParams, string>>;
}>;
