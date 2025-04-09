export const formatPercent = (percent: number) => {
  return percent.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};
