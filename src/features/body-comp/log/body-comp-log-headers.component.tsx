export const BodyCompLogHeaders = () => {
  return (
    <div className="font-bold grid-cols-[2fr_1fr_auto] hidden md:grid lg:grid-cols-[2fr_1fr_1fr_auto] 2xl:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]">
      <span>Date</span>
      <span>Weight</span>
      <span className="hidden lg:block">Last 7 days</span>
      <span className="text-end 2xl:text-start">Body fat</span>
      <span className="hidden 2xl:block">Neck</span>
      <span className="hidden 2xl:block 2xl:text-end">Waist</span>
      <span className="hidden">Chest</span>
      <span className="hidden">Ab</span>
      <span className="hidden">Thigh</span>
    </div>
  );
};
