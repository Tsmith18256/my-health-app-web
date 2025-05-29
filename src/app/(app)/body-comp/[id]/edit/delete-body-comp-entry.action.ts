"use server";

import {
  BodyCompEntryId,
  deleteBodyCompEntryById,
} from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";

export const deleteBodyCompEntry = async (id: BodyCompEntryId) => {
  await deleteBodyCompEntryById(id);
};
