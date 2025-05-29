import { ComponentProps } from "react";
import {
  Button,
  ButtonSize,
} from "@/shared/components/buttons/button/button.component";
import { Icon } from "@/shared/components/icon/icon.component";
import styles from "./header-button.module.css";

/**
 * A button to show at the start or end of the header.
 */
export const HeaderButton = ({ icon, ...buttonProps }: IHeaderButtonProps) => {
  return (
    <div className={styles["button-wrapper"]}>
      <Button {...buttonProps} size={ButtonSize.Small}>
        <Icon icon={icon} />
      </Button>
    </div>
  );
};

type IHeaderButtonProps = Pick<
  ComponentProps<typeof Button>,
  "appearance" | "onClick"
> &
  Required<Pick<ComponentProps<typeof Button>, "ariaLabel">> &
  Pick<ComponentProps<typeof Icon>, "icon">;
