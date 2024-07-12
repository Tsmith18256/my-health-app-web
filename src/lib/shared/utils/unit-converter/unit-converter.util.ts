// ------------------
// ----- WEIGHT -----
// ------------------
// Imperial/metric conversions.
export const LB_PER_KG = 2.2046226218;
export const G_PER_OZ = 28.34952;
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

// Metric

export const convertGsToKgs = (gs: number): number => {
  return gs / G_PER_KG;
};

export const convertKgsToGs = (kgs: number): number => {
  return kgs * G_PER_KG;
};

// Imperial -> Metric

export const convertLbsToGs = (lbs: number): number => {
  return (lbs / LB_PER_KG) * G_PER_KG;
};

export const convertOzsToGs = (ozs: number): number => {
  return ozs * G_PER_OZ;
};

// Metric -> Imperial

export const convertGsToLbs = (gs: number): number => {
  return (gs / G_PER_KG) * LB_PER_KG;
};

export const convertGsToOzs = (gs: number): number => {
  return gs / G_PER_OZ;
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
