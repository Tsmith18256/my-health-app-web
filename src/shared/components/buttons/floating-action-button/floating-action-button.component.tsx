import {
  Icon,
  IconImage,
  IconSize,
} from "@/shared/components/icon/icon.component";
import styles from "./floating-action-button.module.css";

export const FloatingActionButton = () => {
  return (
    <button className={styles.button}>
      <Icon icon={IconImage.Plus} size={IconSize.Large} />
    </button>
  );
};
