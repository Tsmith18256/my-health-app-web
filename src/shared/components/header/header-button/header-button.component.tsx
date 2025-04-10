import {
  Button,
  ButtonSize,
} from "@/shared/components/buttons/button/button.component";
import { Icon } from "@/shared/components/icon/icon.component";
import { ComponentProps } from "react";

export const HeaderButton = ({
  appearance,
  icon,
  onClick,
}: IHeaderButtonProps) => {
  return (
    <div className="text-lg w-12">
      <Button appearance={appearance} onClick={onClick} size={ButtonSize.Small}>
        <Icon icon={icon} />
      </Button>
    </div>
  );
};

type IHeaderButtonProps = Pick<
  ComponentProps<typeof Button>,
  "appearance" | "onClick"
> &
  Pick<ComponentProps<typeof Icon>, "icon">;
