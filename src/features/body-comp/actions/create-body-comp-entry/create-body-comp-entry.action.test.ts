import { beforeEach, expect, it, vi } from "vitest";
import { createBodyCompEntry } from "@/features/body-comp/actions/create-body-comp-entry/create-body-comp-entry.action";
import {
  BodyCompEntryId,
  INewBodyCompEntry,
  insertBodyCompEntry,
} from "@/features/body-comp/daos/body-comp-entry.dao";
import { EmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { HttpStatusCode } from "@/shared/enums/http-status-code.enum";

vi.mock("@/features/body-comp/daos/body-comp-entry.dao");

const insertBodyCompEntryMock = vi.mocked(insertBodyCompEntry);

const newEntryMock: INewBodyCompEntry = {
  date: "2025-06-08",
  userEmail: "test@email.com" as EmailAddress,
  weightInG: 57700,
};

beforeEach(() => {
  insertBodyCompEntryMock.mockImplementation((entry) => {
    return Promise.resolve({
      ...entry,
      id: entry.weightInG as BodyCompEntryId,
    });
  });
});

it("inserts the given entry", async () => {
  await createBodyCompEntry(newEntryMock);

  expect(insertBodyCompEntry).toHaveBeenCalledWith(newEntryMock);
});

it("returns the created entry", async () => {
  const response = await createBodyCompEntry(newEntryMock);

  expect(response).toStrictEqual({
    entry: {
      ...newEntryMock,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: expect.any(Number),
    },
    statusCode: HttpStatusCode.Success,
  });
});

it("returns an error if one is thrown on insert", async () => {
  const errorMessage = "Uh oh";
  insertBodyCompEntryMock.mockRejectedValue(new Error(errorMessage));

  const response = await createBodyCompEntry(newEntryMock);

  expect(response).toStrictEqual({
    message: errorMessage,
    statusCode: HttpStatusCode.InternalServerError,
  });
});

it("returns an error if one is thrown on insert (string)", async () => {
  const errorMessage = "Uh oh";
  insertBodyCompEntryMock.mockRejectedValue(errorMessage);

  const response = await createBodyCompEntry(newEntryMock);

  expect(response).toStrictEqual({
    message: errorMessage,
    statusCode: HttpStatusCode.InternalServerError,
  });
});

it("returns an error if one is thrown on insert (number)", async () => {
  const error = 100;
  insertBodyCompEntryMock.mockRejectedValue(error);

  const response = await createBodyCompEntry(newEntryMock);

  expect(response).toStrictEqual({
    message: "Unknown error occurred",
    statusCode: HttpStatusCode.InternalServerError,
  });
});
