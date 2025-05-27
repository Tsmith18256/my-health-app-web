import { ComponentProps } from "react";
import {
  Button,
  ButtonSize,
} from "@/shared/components/buttons/button/button.component";
import { Icon } from "@/shared/components/icon/icon.component";
import styles from './header-button.module.css';

export const HeaderButton = ({
  appearance,
  icon,
  onClick,
}: IHeaderButtonProps) => {
  return (
    <div className={styles['button-wrapper']}>
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
