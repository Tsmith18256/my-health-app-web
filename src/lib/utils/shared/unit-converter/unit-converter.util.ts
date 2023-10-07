// ------------------
// ----- WEIGHT -----
// ------------------
// Imperial/metric conversions.
export const LB_PER_KG = 2.2046226218;
// Metric conversions.
export const G_PER_KG = 1000;

// --------------------
// ----- DISTANCE -----
// --------------------
// Imperial/metric conversions.
export const CM_PER_IN = 2.54;
// Metric conversions.
export const MM_PER_CM = 10;

// ------------------
// ----- WEIGHT -----
// ------------------

// Imperial -> Metric

export const convertLbsToGs = (lbs: number): number => {
  return (lbs / LB_PER_KG) * G_PER_KG;
};

// Metric -> Imperial

export const convertGsToLbs = (gs: number): number => {
  return gs / G_PER_KG * LB_PER_KG;
};

// --------------------
// ----- DISTANCE -----
// --------------------

// Metric

export const convertMmsToCms = (mms: number): number => {
  return mms / MM_PER_CM;
};

// Imperial -> Metric

export const convertInsToCms = (ins: number): number => {
  return ins * CM_PER_IN;
};

export const convertInsToMms = (ins: number): number => {
  return convertInsToCms(ins) * MM_PER_CM;
};

// Metric -> Imperial

export const convertMmsToIns = (mms: number): number => {
  return convertCmsToIns(convertMmsToCms(mms));
};

export const convertCmsToIns = (cms: number): number => {
  return cms / CM_PER_IN;
};
