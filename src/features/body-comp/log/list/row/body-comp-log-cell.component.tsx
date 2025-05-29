import { Breakpoint } from "@/shared/enums/breakpoint.enum";
import styles from './body-comp-log-cell.module.css';

export const BodyCompLogCell = ({
  alignEndOnMobile,
  label,
  minimumBreakpoint = Breakpoint.Mobile,
  valueText,
}: IBodyCompLogCellProps) => {
  const textAlignClass = alignEndOnMobile ? styles['align-end-on-mobile'] : "";
  const visibilityClass = visibilityClassesByBreakpoint[minimumBreakpoint];

  return (
    <div className={`${styles.cell} ${textAlignClass} ${visibilityClass}`}>
      <span className={styles.label}>{label}</span>
      <strong className={styles.value}>{valueText}</strong>
    </div>
  );
};

const visibilityClassesByBreakpoint: Record<Breakpoint, string> = {
  [Breakpoint.Mobile]: styles['cell-mobile'],
  [Breakpoint.Tablet]: styles['cell-tablet'],
  [Breakpoint.DesktopSmall]: styles['cell-desktop-small'],
  [Breakpoint.DesktopMedium]: styles['cell-desktop-medium'],
  [Breakpoint.DesktopLarge]: styles['cell-desktop-large'],
};

type IBodyCompLogCellProps = {
  alignEndOnMobile?: boolean;
  valueText: string;
} & (IMobileProps | INonMobileProps);

interface IMobileProps {
  label: string;
  minimumBreakpoint?: typeof Breakpoint.Mobile;
}

interface INonMobileProps {
  label?: never;
  minimumBreakpoint: Exclude<Breakpoint, typeof Breakpoint.Mobile>;
}
