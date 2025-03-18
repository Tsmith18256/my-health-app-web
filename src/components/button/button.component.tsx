import { ObjectValues } from "@/types/ObjectValues";
import { createEnum } from '@/types/type-utilities/create-enum.type-utility';
import { ComponentProps } from "react";

export const Button = (props: IButtonProps) => {
  const size = props.size ?? ButtonSize.Medium;
  const type = props.type ?? ButtonType.Primary;

  return (
    <button
      className={`border-3 font-semibold rounded-lg text-black w-full ${classesBySize[size]} ${classesByType[type]}`}
    >
      {props.children}
    </button>
  );
};

export const ButtonSize = createEnum({
  Medium: "Medium",
  Large: "Large",
});

export type ButtonSize = ObjectValues<typeof ButtonSize>;

export const ButtonType = createEnum({
  Primary: "Primary",
  Negative: "Negative"
});

export type ButtonType = ObjectValues<typeof ButtonType>;

export interface IButtonProps
  extends Pick<ComponentProps<"button">, "children"> {
  size?: ButtonSize;
  type?: ButtonType;
}

const classesBySize: Record<ButtonSize, string> = {
  [ButtonSize.Medium]: "p-3 text-lg",
  [ButtonSize.Large]: "p-4 text-2xl",
};

const classesByType: Record<ButtonType, string> = {
  [ButtonType.Primary]: "bg-orange-400 active:bg-orange-600",
  [ButtonType.Negative]: "bg-gray-300 active:bg-gray-500"
};
