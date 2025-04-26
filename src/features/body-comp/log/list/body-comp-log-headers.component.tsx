import { BODY_COMP_LOG_GRID_CLASSES } from '@/features/body-comp/log/list/row/body-comp-log-row.component';

export const BodyCompLogHeaders = () => {
  return (
    <div className={`font-bold hidden ${BODY_COMP_LOG_GRID_CLASSES}`}>
      <span>Date</span>
      <span>Weight</span>
      <span className="hidden dt-sm:block">Last 7 days</span>
      <span>Body fat</span>
      <span className="hidden dt-md:block">Neck</span>
      <span className="hidden dt-md:block">
        Waist
      </span>
      <span className="hidden dt-lg:block">Chest</span>
      <span className="hidden dt-lg:block">Ab</span>
      <span className="hidden dt-lg:block">Thigh</span>
    </div>
  );
};
