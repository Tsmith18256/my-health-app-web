import { beforeEach, expect, it, vi } from "vitest";
import { createBodyCompEntryAction } from "@/features/body-comp/actions/create-body-comp-entry/create-body-comp-entry.action";
import {
  BodyCompEntryId,
  INewBodyCompEntry,
  insertBodyCompEntry,
} from "@/features/body-comp/daos/body-comp-entry.dao";
import { EmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { HttpStatusCode } from "@/shared/enums/http-status-code.enum";
import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import { getMockFromFn } from "@/testing/agnostic/getMockFromFn/getMockFromFn.util";

vi.mock("@/features/auth/get-auth-session-details.util");
vi.mock("@/features/body-comp/daos/body-comp-entry.dao");

const insertBodyCompEntryMock = getMockFromFn(insertBodyCompEntry);

const userEmail = "user@email.com" as EmailAddress;
const mockNewEntry: INewBodyCompEntry = {
  date: "2025-06-08",
  userEmail,
  weightInG: 57700,
};

beforeEach(() => {
  getMockFromFn(getAuthSessionDetails, {
    deep: true,
    partial: true,
  }).mockResolvedValue({
    emailAddress: userEmail,
  });

  insertBodyCompEntryMock.mockImplementation((entry) => {
    return Promise.resolve({
      entry: {
        ...entry,
        id: entry.weightInG as BodyCompEntryId,
      },
    });
  });
});

it("inserts the given entry", async () => {
  await createBodyCompEntryAction(mockNewEntry);

  expect(insertBodyCompEntry).toHaveBeenCalledWith(mockNewEntry);
});

it("returns the created entry", async () => {
  const response = await createBodyCompEntryAction(mockNewEntry);

  expect(response).toStrictEqual({
    entry: {
      ...mockNewEntry,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: expect.any(Number),
    },
    statusCode: HttpStatusCode.Success,
  });
});

it("returns an error if one is thrown on insert", async () => {
  insertBodyCompEntryMock.mockResolvedValue({
    error: new Error("Uh oh"),
  });

  const response = await createBodyCompEntryAction(mockNewEntry);

  expect(response).toStrictEqual({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    message: expect.any(String),
    statusCode: HttpStatusCode.InternalServerError,
  });
});

it("returns an error if the body comp entry ID doesn't match the user ID", async () => {
  const response = await createBodyCompEntryAction({
    ...mockNewEntry,
    userEmail: "different@email.ca" as EmailAddress,
  });

  expect(response).toStrictEqual({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    message: expect.any(String),
    statusCode: HttpStatusCode.BadRequest,
  });
});
