"use server";

import {
  BodyCompEntryId,
  deleteBodyCompEntryById,
} from "@/features/body-comp/daos/body-comp-entry.dao";

export const deleteBodyCompEntry = async (id: BodyCompEntryId) => {
  await deleteBodyCompEntryById(id);
};
