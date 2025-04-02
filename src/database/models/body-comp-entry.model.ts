import { sql } from "@/database/db";
import { LengthUnit } from "@/enums/length-unit.enum";
import { WeightUnit } from "@/enums/weight-unit.enum";
import { Brand } from "@/types/brand.type";
import { convertLengthUnits } from "@/utils/units/convert-length-units";
import { convertWeightUnits } from "@/utils/units/convert-weight-units";
import {
  EmailAddress,
  validateEmailAddress,
} from "@/utils/validation/validate-email-address";
import dayjs, { Dayjs } from "dayjs";

export const insertBodyCompEntry = async (
  inputEntry: INewBodyCompEntry
): Promise<IBodyCompEntry> => {
  const date = inputEntry.date.format("YYYY-MM-DD");
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
      ${date},
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

  throw new Error("Unknown error inserting user");
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

  const model = await sql<IBodyCompEntryModel[]>`
    SELECT * FROM body_comp_entries
      WHERE id = ${id.toString()} AND user_email = ${opts.userEmail}
      LIMIT 1
  `;

  if (!model[0]) {
    return undefined;
  }

  return convertModelToObject(model[0]);
};

const convertModelToObject = (model: IBodyCompEntryModel): IBodyCompEntry => {
  return {
    abSkinfold: model.ab_skinfold ?? undefined,
    bodyFat: 0.156,
    chestSkinfold: model.chest_skinfold ?? undefined,
    date: dayjs(model.entry_date.toISOString().substring(0, 10)),
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
  bodyFat?: number;
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
