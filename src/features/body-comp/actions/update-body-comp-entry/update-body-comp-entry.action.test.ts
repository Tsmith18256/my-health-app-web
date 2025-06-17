import { beforeEach, expect, it, vi } from "vitest";
import {
  BodyCompEntryId,
  IBodyCompEntry,
  updateBodyCompEntry as updateEntryInDb,
} from "@/features/body-comp/daos/body-comp-entry.dao";
import { EmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { HttpStatusCode } from "@/shared/enums/http-status-code.enum";
import { updateBodyCompEntryAction } from "./update-body-comp-entry.action";
import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";

vi.mock("@/features/auth/get-auth-session-details.util");
vi.mock("@/features/body-comp/daos/body-comp-entry.dao");

const getAuthSessionDetailsMock = vi.mocked(getAuthSessionDetails, {
  partial: true,
});
const updateEntryInDbMock = vi.mocked(updateEntryInDb);

const userEmail = "user@email.com" as EmailAddress;

const inputEntryMock: IBodyCompEntry = {
  date: "2025-06-08",
  id: 2 as BodyCompEntryId,
  userEmail,
  weightInG: 57700,
};

beforeEach(() => {
  getAuthSessionDetailsMock.mockResolvedValue({
    emailAddress: userEmail,
  });

  updateEntryInDbMock.mockImplementation((entry) => {
    return Promise.resolve({
      updatedEntry: entry,
    });
  });
});

it("updates the given entry", async () => {
  await updateBodyCompEntryAction(inputEntryMock);

  expect(updateEntryInDb).toHaveBeenCalledWith(inputEntryMock);
});

it("returns the updated entry", async () => {
  const response = await updateBodyCompEntryAction(inputEntryMock);

  expect(response).toStrictEqual({
    statusCode: HttpStatusCode.Success,
    updatedEntry: inputEntryMock,
  });
});

it("returns an error if one is thrown on update", async () => {
  updateEntryInDbMock.mockResolvedValue({
    error: new Error("Uh oh"),
  });

  const response = await updateBodyCompEntryAction(inputEntryMock);

  expect(response).toStrictEqual({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    message: expect.any(String),
    statusCode: HttpStatusCode.InternalServerError,
  });
});

it("returns an error if the body comp entry ID doesn't match the user ID", async () => {
  const response = await updateBodyCompEntryAction({
    ...inputEntryMock,
    userEmail: "different@email.ca" as EmailAddress,
  });

  expect(response).toStrictEqual({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    message: expect.any(String),
    statusCode: HttpStatusCode.BadRequest,
  });
});
