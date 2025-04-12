import { Prettify } from "@/shared/helper-types/prettify.type";
import { PropsWithChildren } from "react";

/**
 * Helper type for creating prop types for Next pages that take params. Simply
 * pass the name(s) of the param(s) that the page uses and the props object
 * will be created.
 *
 * eg: `PageWithParamsProps<'id'>`
 */
export type PageWithParamsProps<TParams extends string> = Prettify<
  PropsWithChildren<{
    params: Promise<Record<TParams, string>>;
  }>
>;
