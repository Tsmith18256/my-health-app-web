'use server';

import { BodyCompEntryId, deleteBodyCompEntryById } from '@/shared/database/models/body-comp-entry.model';

export const deleteBodyCompEntry = async (id: BodyCompEntryId) => {
  await deleteBodyCompEntryById(id);
};
