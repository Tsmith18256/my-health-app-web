'use server';

import { BodyCompEntryId, deleteBodyCompEntryById } from '@/body-comp/body-comp-entry/body-comp-entry.dao';

export const deleteBodyCompEntry = async (id: BodyCompEntryId) => {
  await deleteBodyCompEntryById(id);
};
