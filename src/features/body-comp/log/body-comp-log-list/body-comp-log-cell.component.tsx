export const BodyCompLogCell = ({
  alignEnd,
  label,
  value,
}: IBodyCompLogCellProps) => {
  const alignClass = alignEnd ? "items-end" : "";

  return (
    <div className={`flex flex-col ${alignClass}`}>
      <span className="text-xs text-gray-500">{label}</span>
      <strong className="text-2xl">{value}</strong>
    </div>
  );
};

interface IBodyCompLogCellProps {
  alignEnd?: boolean;
  label: string;
  value: string;
}
