import { sql } from "@/shared/database/db";
import {
  ErrorCode,
  ErrorWithCode,
} from "@/shared/errors/error-with-code.class";
import { Brand } from "@/shared/helper-types/brand.type";
import { WithError } from "@/shared/helper-types/with-error.type";
import { formatVanillaDateWithoutTime } from "@/shared/utils/dates/vanilla/format-vanilla-date-without-time";
import { getMessageFromUnknownError } from "@/shared/utils/errors/get-message-from-unknown-error/get-message-from-unknown-error.util";
import { clampNumber } from "@/shared/utils/math/clamp-number/clamp-number.util";
import {
  EmailAddress,
  validateEmailAddress,
} from "@/shared/utils/validation/validate-email-address.util";

const newEntryColumns = [
  "ab_skinfold",
  "chest_skinfold",
  "entry_date",
  "neck_circ_in_mm",
  "thigh_skinfold",
  "user_email",
  "waist_circ_in_mm",
  "weight_in_grams",
];
const columns = [...newEntryColumns, "id"];
const tableName = "body_comp_entries";

/**
 * @todo Determine how this library treats the ID missing and handle it.
 */
export const deleteBodyCompEntryByIdAndEmail = async (
  id: BodyCompEntryId,
  userEmail: EmailAddress,
) => {
  await sql`
    DELETE FROM ${sql(tableName)}
      WHERE id = ${id}
      AND user_email = ${userEmail}
  `;
};

export const insertBodyCompEntry = async (
  inputEntry: INewBodyCompEntry,
): Promise<WithError<{ entry: IBodyCompEntry }>> => {
  try {
    const [createdEntry] = await sql<IBodyCompEntryModel[]>`
      INSERT INTO ${sql(tableName)} (${sql(newEntryColumns)}) VALUES (
        ${
          inputEntry.abSkinfold === undefined
            ? null
            : Math.round(inputEntry.abSkinfold)
        },
        ${
          inputEntry.chestSkinfold === undefined
            ? null
            : Math.round(inputEntry.chestSkinfold)
        },
        ${inputEntry.date},
        ${
          inputEntry.neckCircumferenceInMm === undefined
            ? null
            : Math.round(inputEntry.neckCircumferenceInMm)
        },
        ${
          inputEntry.thighSkinfold === undefined
            ? null
            : Math.round(inputEntry.thighSkinfold)
        },
        ${inputEntry.userEmail},
        ${
          inputEntry.waistCircumferenceInMm === undefined
            ? null
            : Math.round(inputEntry.waistCircumferenceInMm)
        },
        ${Math.round(inputEntry.weightInG)}
      ) RETURNING *
    `;

    if (createdEntry) {
      return { entry: convertModelToObject(createdEntry) };
    }

    return {
      error: new ErrorWithCode(
        ErrorCode.DatabaseInsertError,
        "Unknown error inserting body comp entry",
      ),
    };
  } catch (err) {
    const message = getMessageFromUnknownError(err);

    if (message?.includes("duplicate key value violates unique constraint")) {
      return {
        error: new ErrorWithCode(
          ErrorCode.DatabaseInsertError,
          "Entry already exists with that date",
        ),
      };
    }

    return {
      error: new ErrorWithCode(
        ErrorCode.DatabaseInsertError,
        message ?? "Unknown error inserting body comp entry",
      ),
    };
  }
};

export const selectBodyCompEntries = async ({
  beforeDate = "3000-01-01",
  limit = 100,
  userEmail,
}: ISelectBodyCompEntriesOpts): Promise<{
  entries: IBodyCompEntry[];
  totalCount: number;
}> => {
  const clampedLimit = clampNumber(limit, 1, 100);

  const models = await sql<IModelWithTotalCount[]>`
    SELECT ${sql(columns)}, count(*) OVER() AS total_count
        FROM ${sql(tableName)}
      WHERE user_email = ${userEmail} AND entry_date < ${beforeDate}
      ORDER BY entry_date DESC
      LIMIT ${clampedLimit}
  `;

  const totalCount = models[0] ? parseInt(models[0].total_count) : 0;

  return {
    entries: convertModelsToObjects(models),
    totalCount,
  };
};

export const selectBodyCompEntryById = async (
  id: number,
  { userEmail }: Pick<ISelectBodyCompEntriesOpts, "userEmail">,
): Promise<IBodyCompEntry | undefined> => {
  if (isNaN(id)) {
    return undefined;
  }

  const [model] = await sql<IBodyCompEntryModel[]>`
    SELECT ${sql(columns)} FROM ${sql(tableName)}
      WHERE id = ${id.toString()} AND user_email = ${userEmail}
  `;

  if (!model) {
    return undefined;
  }

  return convertModelToObject(model);
};

export const updateBodyCompEntry = async (
  inputEntry: IBodyCompEntry,
): Promise<WithError<{ updatedEntry: IBodyCompEntry }>> => {
  try {
    const [updatedEntry] = await sql<IBodyCompEntryModel[]>`
    UPDATE ${sql(tableName)} SET
        ab_skinfold = ${
          inputEntry.abSkinfold === undefined
            ? null
            : Math.round(inputEntry.abSkinfold)
        },
        chest_skinfold = ${
          inputEntry.chestSkinfold === undefined
            ? null
            : Math.round(inputEntry.chestSkinfold)
        },
        entry_date = ${inputEntry.date},
        neck_circ_in_mm = ${
          inputEntry.neckCircumferenceInMm === undefined
            ? null
            : Math.round(inputEntry.neckCircumferenceInMm)
        },
        thigh_skinfold = ${
          inputEntry.thighSkinfold === undefined
            ? null
            : Math.round(inputEntry.thighSkinfold)
        },
        user_email = ${inputEntry.userEmail},
        waist_circ_in_mm = ${
          inputEntry.waistCircumferenceInMm === undefined
            ? null
            : Math.round(inputEntry.waistCircumferenceInMm)
        },
        weight_in_grams = ${Math.round(inputEntry.weightInG)}
      WHERE id = ${inputEntry.id}
      RETURNING *
  `;

    if (updatedEntry) {
      return { updatedEntry: convertModelToObject(updatedEntry) };
    }

    return {
      error: new ErrorWithCode(
        ErrorCode.DatabaseUpdateError,
        `Unknown error updating body comp entry (id: ${inputEntry.id.toString()})`,
      ),
    };
  } catch (err) {
    const message = getMessageFromUnknownError(err);

    if (message?.includes("duplicate key value violates unique constraint")) {
      return {
        error: new ErrorWithCode(
          ErrorCode.DatabaseUpdateError,
          "Entry already exists with that date",
        ),
      };
    }

    return {
      error: new ErrorWithCode(
        ErrorCode.DatabaseUpdateError,
        message ??
          `Unknown error updating body comp entry (id: ${inputEntry.id.toString()})`,
      ),
    };
  }
};

const convertModelToObject = (model: IBodyCompEntryModel): IBodyCompEntry => {
  return {
    abSkinfold: model.ab_skinfold ?? undefined,
    chestSkinfold: model.chest_skinfold ?? undefined,
    date: formatVanillaDateWithoutTime(model.entry_date),
    id: model.id as BodyCompEntryId,
    neckCircumferenceInMm: model.neck_circ_in_mm ?? undefined,
    thighSkinfold: model.thigh_skinfold ?? undefined,
    userEmail: validateEmailAddress(model.user_email),
    waistCircumferenceInMm: model.waist_circ_in_mm ?? undefined,
    weightInG: model.weight_in_grams,
  };
};

const convertModelsToObjects = (
  models: IBodyCompEntryModel[],
): IBodyCompEntry[] => {
  return models.map(convertModelToObject);
};

export type BodyCompEntryId = Brand<number, "BodyCompEntryId">;

export interface IBodyCompEntry {
  abSkinfold?: number;
  chestSkinfold?: number;
  date: string;
  id: BodyCompEntryId;
  neckCircumferenceInMm?: number;
  thighSkinfold?: number;
  userEmail: EmailAddress;
  waistCircumferenceInMm?: number;
  weightInG: number;
}

export type INewBodyCompEntry = Omit<IBodyCompEntry, "id">;

interface IBodyCompEntryModel {
  ab_skinfold: number | null;
  chest_skinfold: number | null;
  entry_date: Date;
  id: number;
  neck_circ_in_mm: number | null;
  thigh_skinfold: number | null;
  user_email: string;
  waist_circ_in_mm: number | null;
  weight_in_grams: number;
}

interface IModelWithTotalCount extends IBodyCompEntryModel {
  total_count: string;
}

interface ISelectBodyCompEntriesOpts {
  beforeDate?: string;
  limit?: number;
  userEmail: EmailAddress;
}
