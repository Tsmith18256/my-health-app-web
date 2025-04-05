import { sql } from "@/shared/database/db";
import { formatDateForDatabaseDate } from "@/shared/utils/dates/format-date-for-database-date.util";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { Brand } from "@/shared/helper-types/brand/brand.type";
import { convertVanillaDateToDayjsWithoutTime } from "@/shared/utils/dates/vanilla/convert-vanilla-date-to-dayjs-without-time.util";
import { convertLengthUnits } from "@/shared/utils/units/convert-length-units";
import { convertWeightUnits } from "@/shared/utils/units/convert-weight-units";
import {
  EmailAddress,
  validateEmailAddress,
} from "@/shared/utils/validation/validate-email-address.util";
import { Dayjs } from "dayjs";

export const deleteBodyCompEntryById = async (id: BodyCompEntryId) => {
  await sql`
    DELETE FROM body_comp_entries
      WHERE id = ${id}
  `;
};

export const insertBodyCompEntry = async (
  inputEntry: INewBodyCompEntry
): Promise<IBodyCompEntry> => {
  const [createdEntry] = await sql<IBodyCompEntryModel[]>`
    INSERT INTO body_comp_entries (
      ab_skinfold,
      chest_skinfold,
      entry_date,
      neck_circ_in_mm,
      thigh_skinfold,
      user_email,
      waist_circ_in_mm,
      weight_in_grams
    ) VALUES (
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
      ${formatDateForDatabaseDate(inputEntry.date)},
      ${
        inputEntry.neckCircumference === undefined
          ? null
          : Math.round(
              convertLengthUnits(
                inputEntry.neckCircumference,
                LengthUnit.Inches,
                LengthUnit.Millimeters
              )
            )
      },
      ${
        inputEntry.thighSkinfold === undefined
          ? null
          : Math.round(inputEntry.thighSkinfold)
      },
      ${inputEntry.userEmail},
      ${
        inputEntry.waistCircumference === undefined
          ? null
          : Math.round(
              convertLengthUnits(
                inputEntry.waistCircumference,
                LengthUnit.Inches,
                LengthUnit.Millimeters
              )
            )
      },
      ${Math.round(
        convertWeightUnits(
          inputEntry.weight,
          WeightUnit.Pounds,
          WeightUnit.Grams
        )
      )}
    ) RETURNING *
  `;

  if (createdEntry) {
    return convertModelToObject(createdEntry);
  }

  throw new Error("Unknown error inserting body comp entry");
};

export const selectBodyCompEntries = async (
  opts: ISelectBodyCompEntriesOpts
): Promise<IBodyCompEntry[]> => {
  const models = await sql<IBodyCompEntryModel[]>`
    SELECT * FROM body_comp_entries
      WHERE user_email = ${opts.userEmail}
      ORDER BY entry_date DESC
  `;

  return convertModelsToObjects(models);
};

export const selectBodyCompEntryById = async (
  id: number,
  opts: ISelectBodyCompEntriesOpts
): Promise<IBodyCompEntry | undefined> => {
  if (isNaN(id)) {
    return undefined;
  }

  const [model] = await sql<IBodyCompEntryModel[]>`
    SELECT * FROM body_comp_entries
      WHERE id = ${id.toString()} AND user_email = ${opts.userEmail}
  `;

  if (!model) {
    return undefined;
  }

  return convertModelToObject(model);
};

export const updateBodyCompEntry = async (
  inputEntry: IBodyCompEntry
): Promise<IBodyCompEntry> => {
  const [updatedEntry] = await sql<IBodyCompEntryModel[]>`
    UPDATE body_comp_entries SET
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
        entry_date = ${formatDateForDatabaseDate(inputEntry.date)},
        neck_circ_in_mm = ${
          inputEntry.neckCircumference === undefined
            ? null
            : Math.round(
                convertLengthUnits(
                  inputEntry.neckCircumference,
                  LengthUnit.Inches,
                  LengthUnit.Millimeters
                )
              )
        },
        thigh_skinfold = ${
          inputEntry.thighSkinfold === undefined
            ? null
            : Math.round(inputEntry.thighSkinfold)
        },
        user_email = ${inputEntry.userEmail},
        waist_circ_in_mm = ${
          inputEntry.waistCircumference === undefined
            ? null
            : Math.round(
                convertLengthUnits(
                  inputEntry.waistCircumference,
                  LengthUnit.Inches,
                  LengthUnit.Millimeters
                )
              )
        },
        weight_in_grams = ${Math.round(
          convertWeightUnits(
            inputEntry.weight,
            WeightUnit.Pounds,
            WeightUnit.Grams
          )
        )}
      WHERE id = ${inputEntry.id}
      RETURNING *
  `;

  if (updatedEntry) {
    return convertModelToObject(updatedEntry);
  }

  throw new Error("Unknown error updating body comp entry");
};

const convertModelToObject = (model: IBodyCompEntryModel): IBodyCompEntry => {
  return {
    abSkinfold: model.ab_skinfold ?? undefined,
    chestSkinfold: model.chest_skinfold ?? undefined,
    date: convertVanillaDateToDayjsWithoutTime(model.entry_date),
    id: model.id as BodyCompEntryId,
    neckCircumference:
      model.neck_circ_in_mm === null
        ? undefined
        : convertLengthUnits(
            model.neck_circ_in_mm,
            LengthUnit.Millimeters,
            LengthUnit.Inches
          ),
    thighSkinfold: model.thigh_skinfold ?? undefined,
    userEmail: validateEmailAddress(model.user_email),
    waistCircumference:
      model.waist_circ_in_mm === null
        ? undefined
        : convertLengthUnits(
            model.waist_circ_in_mm,
            LengthUnit.Millimeters,
            LengthUnit.Inches
          ),
    weight: convertWeightUnits(
      model.weight_in_grams,
      WeightUnit.Grams,
      WeightUnit.Pounds
    ),
  };
};

const convertModelsToObjects = (
  models: IBodyCompEntryModel[]
): IBodyCompEntry[] => {
  return models.map(convertModelToObject);
};

export type BodyCompEntryId = Brand<number, "BodyCompEntryId">;

export interface IBodyCompEntry {
  abSkinfold?: number;
  chestSkinfold?: number;
  date: Dayjs;
  id: BodyCompEntryId;
  neckCircumference?: number;
  thighSkinfold?: number;
  userEmail: EmailAddress;
  waistCircumference?: number;
  weight: number;
}

export type INewBodyCompEntry = Omit<IBodyCompEntry, "id">;

export interface ISelectBodyCompEntriesOpts {
  userEmail: EmailAddress;
}

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
