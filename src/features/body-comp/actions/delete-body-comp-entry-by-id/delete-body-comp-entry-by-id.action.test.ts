import { beforeEach, expect, it, vi } from "vitest";
import { EmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import { deleteBodyCompEntryByIdAction } from "@/features/body-comp/actions/delete-body-comp-entry-by-id/delete-body-comp-entry-by-id.action";
import {
  BodyCompEntryId,
  deleteBodyCompEntryByIdAndEmail,
} from "@/features/body-comp/daos/body-comp-entry.dao";
import { HttpStatusCode } from "@/shared/enums/http-status-code.enum";
import { getMockFromFn } from "@/testing/agnostic/getMockFromFn/getMockFromFn.util";

vi.mock("@/features/auth/get-auth-session-details.util");
vi.mock("@/features/body-comp/daos/body-comp-entry.dao");

const userEmail = "user@email.com" as EmailAddress;

beforeEach(() => {
  getMockFromFn(getAuthSessionDetails, {
    deep: true,
    partial: true,
  }).mockResolvedValue({
    emailAddress: userEmail,
  });
});

it("deletes the entry with the given ID and user's email", async () => {
  const entryId = 9001 as BodyCompEntryId;

  const res = await deleteBodyCompEntryByIdAction(entryId);

  expect(res).toStrictEqual({
    statusCode: HttpStatusCode.Success,
  });

  expect(deleteBodyCompEntryByIdAndEmail).toHaveBeenCalledWith(
    entryId,
    userEmail,
  );
});
