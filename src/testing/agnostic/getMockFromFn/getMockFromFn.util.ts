import { AnyFunction } from "@/shared/helper-types/any-function.type";
import { DeepPartial } from "@/shared/helper-types/deep-partial.type";
import { Mock } from "vitest";

export const getMockFromFn = <
  TFunc extends AnyFunction,
  TOpts extends IGetMockFromFnOptions = { partial: false },
>(
  fn: TFunc,
  // The value of this param just drives the types.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  opts?: TOpts,
): TOpts["deep"] extends true
  ? DeepPartialMock<TFunc>
  : TOpts["partial"] extends true
    ? PartialMock<TFunc>
    : Mock<TFunc> => {
  // Letting the return type declaration do the heavy lifting.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
  return fn as any;
};

type IGetMockFromFnOptions =
  | {
      deep?: undefined;
      partial?: false;
    }
  | {
      deep?: boolean;
      partial: true;
    };

type PartialMock<TFunc extends AnyFunction> = Mock<
  (...args: Parameters<TFunc>) => Partial<ReturnType<TFunc>>
>;

type DeepPartialMock<TFunc extends AnyFunction> = Mock<
  (...args: Parameters<TFunc>) => DeepPartial<ReturnType<TFunc>>
>;
