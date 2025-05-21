import {
  getUiString,
  UiStringKey,
} from "@/shared/utils/strings/get-ui-string.util";
import styles from "./body-comp-log-headers.module.css";
import rowStyles from "./row/body-comp-log-row.module.css";

export const BodyCompLogHeaders = () => {
  return (
    <div className={`${styles.container} ${rowStyles.grid}`}>
      <span>{getUiString(UiStringKey.LabelDate)}</span>

      <span>{getUiString(UiStringKey.ColumnHeaderWeight)}</span>

      <span className="hidden dt-sm:block">
        {getUiString(UiStringKey.ColumnHeaderLast7Days)}
      </span>

      <span>{getUiString(UiStringKey.ColumnHeaderBodyFat)}</span>

      <span className="hidden dt-md:block">
        {getUiString(UiStringKey.ColumnHeaderNeck)}
      </span>

      <span className="hidden dt-md:block">
        {getUiString(UiStringKey.ColumnHeaderWaist)}
      </span>

      <span className="hidden dt-lg:block">
        {getUiString(UiStringKey.ColumnHeaderChest)}
      </span>

      <span className="hidden dt-lg:block">
        {getUiString(UiStringKey.ColumnHeaderAb)}
      </span>

      <span className="hidden dt-lg:block">
        {getUiString(UiStringKey.ColumnHeaderThigh)}
      </span>
    </div>
  );
};
