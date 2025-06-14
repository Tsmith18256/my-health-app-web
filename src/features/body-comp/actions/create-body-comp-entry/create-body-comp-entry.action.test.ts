import { beforeEach, expect, it, vi } from "vitest";
import { createBodyCompEntryAction } from "@/features/body-comp/actions/create-body-comp-entry/create-body-comp-entry.action";
import {
  BodyCompEntryId,
  INewBodyCompEntry,
  insertBodyCompEntry,
} from "@/features/body-comp/daos/body-comp-entry.dao";
import { EmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { HttpStatusCode } from "@/shared/enums/http-status-code.enum";

vi.mock("@/features/body-comp/daos/body-comp-entry.dao");

beforeEach(() => {
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
  await createBodyCompEntryAction(newEntryMock);

  expect(insertBodyCompEntry).toHaveBeenCalledWith(newEntryMock);
});

it("returns the created entry", async () => {
  const response = await createBodyCompEntryAction(newEntryMock);

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
  insertBodyCompEntryMock.mockResolvedValue({
    error: new Error("Uh oh"),
  });

  const response = await createBodyCompEntryAction(newEntryMock);

  expect(response).toStrictEqual({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    message: expect.any(String),
    statusCode: HttpStatusCode.InternalServerError,
  });
});

const insertBodyCompEntryMock = vi.mocked(insertBodyCompEntry);

const newEntryMock: INewBodyCompEntry = {
  date: "2025-06-08",
  userEmail: "test@email.com" as EmailAddress,
  weightInG: 57700,
};
