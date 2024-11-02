import { goto } from '$app/navigation';

export const goToBodyCompLogEntry = (id: number) => {
  return goto(`/bodycomp/log/entry/${id.toString()}`);
};

export const goToBodyCompLogEntryEdit = (id: number) => {
  return goto(`/bodycomp/log/entry/${id.toString()}/edit`);
};
