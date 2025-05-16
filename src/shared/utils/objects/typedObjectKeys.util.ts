export const typedObjectKeys = <T extends Record<string, unknown>>(
  obj: T
): (keyof T)[] => {
  return Object.keys(obj);
};
