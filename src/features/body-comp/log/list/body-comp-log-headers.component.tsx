import styles from './body-comp-log-headers.module.css';
import rowStyles from './row/body-comp-log-row.module.css';

export const BodyCompLogHeaders = () => {
  return (
    <div className={`${styles.container} ${rowStyles.grid}`}>
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
