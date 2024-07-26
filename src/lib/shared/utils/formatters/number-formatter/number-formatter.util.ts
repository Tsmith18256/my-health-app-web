export const formatPercent = (percent: number, opts?: { decimalPlaces?: number }) => {
  const decimalPlaces = opts?.decimalPlaces ?? 0;

  return percent.toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
};
