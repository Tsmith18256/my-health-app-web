"use server";

import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import {
  BodyCompEntryId,
  deleteBodyCompEntryByIdAndEmail,
} from "@/features/body-comp/daos/body-comp-entry.dao";
import { HttpStatusCode } from "@/shared/enums/http-status-code.enum";
import { IActionResponse } from "@/shared/interfaces/action-response.interface";

/**
 * Server action to delete the body comp entry with the given ID.
 */
export const deleteBodyCompEntryByIdAction = async (
  id: BodyCompEntryId,
): IActionResponse => {
  const { emailAddress } = await getAuthSessionDetails();

  await deleteBodyCompEntryByIdAndEmail(id, emailAddress);

  return { statusCode: HttpStatusCode.Success };
};
