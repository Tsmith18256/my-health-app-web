export const BodyCompLogHeaders = () => {
  return (
    <div className="font-bold grid-cols-[2fr_1fr_auto] hidden tab:grid dt-sm:grid-cols-[2fr_1fr_1fr_auto] dt-md:grid-cols-[2fr_repeat(4,_1fr)_auto] dt-lg:grid-cols-[2fr_repeat(7,_1fr)_auto]">
      <span>Date</span>
      <span>Weight</span>
      <span className="hidden dt-sm:block">Last 7 days</span>
      <span className="text-end dt-md:text-start">Body fat</span>
      <span className="hidden dt-md:block">Neck</span>
      <span className="hidden dt-md:block dt-md:text-end dt-lg:text-start">
        Waist
      </span>
      <span className="hidden dt-lg:block">Chest</span>
      <span className="hidden dt-lg:block">Ab</span>
      <span className="hidden dt-lg:block dt-lg:text-end">Thigh</span>
    </div>
  );
};
