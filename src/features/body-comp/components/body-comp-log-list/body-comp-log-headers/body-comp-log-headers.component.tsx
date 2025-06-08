import {
  getUiString,
  UiStringKey,
} from "@/shared/utils/strings/get-ui-string.util";
import styles from "./body-comp-log-headers.module.css";
import rowStyles from "../body-comp-log-row/body-comp-log-row.module.css";

export const BodyCompLogHeaders = () => {
  return (
    <div className={`${styles.container} ${rowStyles.grid}`}>
      <span>{getUiString(UiStringKey.LabelDate)}</span>

      <span>{getUiString(UiStringKey.ColumnHeaderWeight)}</span>

      <span
        className={`${styles["responsive-column-header"]} ${styles["header-desktop-small"]}`}
      >
        gc
        {getUiString(UiStringKey.ColumnHeaderLast7Days)}
      </span>

      <span>{getUiString(UiStringKey.ColumnHeaderBodyFat)}</span>

      <span
        className={`${styles["responsive-column-header"]} ${styles["header-desktop-medium"]}`}
      >
        {getUiString(UiStringKey.ColumnHeaderNeck)}
      </span>

      <span
        className={`${styles["responsive-column-header"]} ${styles["header-desktop-medium"]}`}
      >
        {getUiString(UiStringKey.ColumnHeaderWaist)}
      </span>

      <span
        className={`${styles["responsive-column-header"]} ${styles["header-desktop-large"]}`}
      >
        {getUiString(UiStringKey.ColumnHeaderChest)}
      </span>

      <span
        className={`${styles["responsive-column-header"]} ${styles["header-desktop-large"]}`}
      >
        {getUiString(UiStringKey.ColumnHeaderAb)}
      </span>

      <span
        className={`${styles["responsive-column-header"]} ${styles["header-desktop-large"]}`}
      >
        {getUiString(UiStringKey.ColumnHeaderThigh)}
      </span>
    </div>
  );
};
