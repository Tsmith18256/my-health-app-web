import { sql } from "@/shared/database/db";
import { formatDateForDatabaseDate } from "@/shared/utils/dates/format-date-for-database-date.util";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { convertLengthUnits } from "@/shared/utils/units/convert-length-units";
import {
  EmailAddress,
  validateEmailAddress,
} from "@/shared/utils/validation/validate-email-address.util";
import { Dayjs } from "dayjs";
import { Sex, validateSex } from "@/shared/utils/validation/validate-sex.util";
import { convertVanillaDateToDayjsWithoutTime } from '@/shared/utils/dates/vanilla/convert-vanilla-date-to-dayjs-without-time.util';
import { roundToDecimalPlaces } from '@/shared/utils/math/round-to-decimal-places.util';

/**
 * Inserts 1 new User Profile entry into the database.
 */
export const insertUserProfile = async (
  inputProfile: IUserProfile
): Promise<IUserProfile> => {
  const [createdProfile] = await sql<IUserProfileModel[]>`
    INSERT INTO user_profiles (
      birthday,
      email_address,
      height_in_mm,
      sex
    ) VALUES (
      ${formatDateForDatabaseDate(inputProfile.birthday)},
      ${inputProfile.emailAddress},
      ${Math.round(
        convertLengthUnits(
          inputProfile.height,
          LengthUnit.Inches,
          LengthUnit.Millimeters
        )
      )},
      ${inputProfile.sex}
    ) RETURNING *
  `;

  if (createdProfile) {
    return convertModelToObject(createdProfile);
  }

  throw new Error("Unknown error inserting user profile");
};

/**
 * Reads 1 User Profile entry from the database by email.
 */
export const selectUserProfileByEmail = async (
  emailAddress: string
): Promise<IUserProfile | undefined> => {
  if (!emailAddress) {
    return undefined;
  }

  const [model] = await sql<IUserProfileModel[]>`
    SELECT * FROM user_profiles
      WHERE email_address = ${emailAddress}
  `;

  if (!model) {
    return undefined;
  }

  return convertModelToObject(model);
};

const convertModelToObject = (model: IUserProfileModel): IUserProfile => {
  return {
    birthday: convertVanillaDateToDayjsWithoutTime(model.birthday),
    emailAddress: validateEmailAddress(model.email_address),
    height: roundToDecimalPlaces(convertLengthUnits(
      model.height_in_mm,
      LengthUnit.Millimeters,
      LengthUnit.Inches
    ), 0),
    sex: validateSex(model.sex),
  };
};

/**
 * Represents a user profile entry from the database. The column names/types
 * from the database are converted to a format more friendly for the code base.
 */
export interface IUserProfile {
  birthday: Dayjs;
  emailAddress: EmailAddress;
  height: number;
  sex: Sex;
}

interface IUserProfileModel {
  birthday: Date;
  email_address: string;
  height_in_mm: number;
  sex: string;
}
