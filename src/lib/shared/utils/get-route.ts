export const getBodyCompLogRoute = (): string => {
  return '/bodycomp/log';
};

export const getBodyCompLogEntryRoute = (id: number): string => {
  return `/bodycomp/log/entry/${id.toString()}`;
};

export const getBodyCompLogEntryEditRoute = (id: number): string => {
  return `/bodycomp/log/entry/${id.toString()}/edit`;
};

export const getBodyCompLogNewRoute = (): string => {
  return '/bodycomp/log/new';
};
