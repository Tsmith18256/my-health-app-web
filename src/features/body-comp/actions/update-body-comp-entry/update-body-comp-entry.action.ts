"use server";

import {
  IBodyCompEntry,
  updateBodyCompEntry as updateEntryInDb,
} from "@/features/body-comp/daos/body-comp-entry.dao";
import { IActionResponse } from "@/shared/interfaces/action-response.interface";
import { HttpStatusCode } from "@/shared/enums/http-status-code.enum";
import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";

/**
 * Server action to update an existing body comp entry.
 */
export const updateBodyCompEntryAction = async (
  entry: IBodyCompEntry,
): IActionResponse<{ updatedEntry: IBodyCompEntry }> => {
  const { emailAddress } = await getAuthSessionDetails();
  if (entry.userEmail !== emailAddress) {
    return {
      message: "Cannot update another user's body comp entry",
      statusCode: HttpStatusCode.BadRequest,
    };
  }

  const { updatedEntry, error } = await updateEntryInDb(entry);

  if (updatedEntry) {
    return {
      statusCode: HttpStatusCode.Success,
      updatedEntry,
    };
  }

  return {
    message: error.message,
    statusCode: HttpStatusCode.InternalServerError,
  };
};
