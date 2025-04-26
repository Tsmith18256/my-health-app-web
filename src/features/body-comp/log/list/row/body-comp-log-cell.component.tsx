import { Breakpoint } from "@/shared/enums/breakpoint.enum";

export const BodyCompLogCell = ({
  alignEndOnMobile,
  label,
  minimumBreakpoint = Breakpoint.Mobile,
  valueText,
}: IBodyCompLogCellProps) => {
  const textAlignClass = alignEndOnMobile ? "text-end tab:text-start" : "";
  const visibilityClass = visibilityClassesByBreakpoint[minimumBreakpoint];

  return (
    <div className={`flex flex-col ${textAlignClass} ${visibilityClass}`}>
      <span className="text-gray-500 text-xs tab:hidden">{label}</span>
      <strong className="text-2xl tab:text-xl">{valueText}</strong>
    </div>
  );
};

const visibilityClassesByBreakpoint: Record<Breakpoint, string> = {
  [Breakpoint.Mobile]: "",
  [Breakpoint.Tablet]: "hidden tab:block",
  [Breakpoint.DesktopSmall]: "hidden dt-sm:block",
  [Breakpoint.DesktopMedium]: "hidden dt-md:block",
  [Breakpoint.DesktopLarge]: "hidden dt-lg:block",
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
