export const formatPercent = (percent: number) => {
  return percent.toLocaleString(undefined, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
    style: "percent",
  });
};
