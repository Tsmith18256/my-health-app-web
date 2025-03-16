export const BodyCompRow = (props: IBodyCompRowProps) => {
  return (
    <div className="active:bg-gray-200 flex justify-between p-4">
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{props.date}</span>
        <strong className="text-2xl">{props.weight}</strong>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-xs text-gray-500">Body fat</span>
        <strong className="text-2xl">{props.bodyFat}</strong>
      </div>
    </div>
  );
};

export interface IBodyCompRowProps {
  date: string;
  weight: string;
  bodyFat: string;
}
