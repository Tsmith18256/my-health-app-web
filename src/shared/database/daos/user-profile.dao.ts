import { sql } from "@/shared/database/db";
import {
  EmailAddress,
  validateEmailAddress,
} from "@/shared/utils/validation/validate-email-address.util";
import { Sex, validateSex } from "@/shared/utils/validation/validate-sex.util";
import { formatVanillaDateWithoutTime } from "@/shared/utils/dates/vanilla/format-vanilla-date-without-time";
import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { validateMeasurementSystem } from "@/shared/utils/validation/validate-measurement-system.util";

/**
 * Inserts 1 new User Profile entry into the database.
 */
export const insertUserProfile = async (
  inputProfile: IUserProfile,
): Promise<IUserProfile> => {
  const [createdProfile] = await sql<IUserProfileModel[]>`
    INSERT INTO user_profiles (
      birthday,
      email_address,
      height_in_mm,
      length_system,
      sex,
      weight_system
    ) VALUES (
      ${inputProfile.birthday},
      ${inputProfile.emailAddress},
      ${inputProfile.heightInMm},
      ${inputProfile.lengthSystem},
      ${inputProfile.sex},
      ${inputProfile.weightSystem}
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
  emailAddress: string,
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

/**
 * Updates the given User Profile entry in the database.
 */
export const updateUserProfile = async (
  inputProfile: IUserProfile,
): Promise<IUserProfile> => {
  const [updatedProfile] = await sql<IUserProfileModel[]>`
    UPDATE user_profiles SET
        birthday = ${inputProfile.birthday},
        height_in_mm = ${inputProfile.heightInMm},
        length_system = ${inputProfile.lengthSystem},
        sex = ${inputProfile.sex},
        weight_system = ${inputProfile.weightSystem}
      WHERE email_address = ${inputProfile.emailAddress}
      RETURNING *
  `;

  if (updatedProfile) {
    return convertModelToObject(updatedProfile);
  }

  throw new Error("Unknown error updating user profile");
};

const convertModelToObject = (model: IUserProfileModel): IUserProfile => {
  return {
    birthday: formatVanillaDateWithoutTime(model.birthday),
    emailAddress: validateEmailAddress(model.email_address),
    heightInMm: model.height_in_mm,
    lengthSystem: validateMeasurementSystem(model.length_system),
    sex: validateSex(model.sex),
    weightSystem: validateMeasurementSystem(model.weight_system),
  };
};

/**
 * Represents a user profile entry from the database. The column names/types
 * from the database are converted to a format more friendly for the code base.
 */
export interface IUserProfile {
  birthday: string;
  emailAddress: EmailAddress;
  heightInMm: number;
  lengthSystem: MeasurementSystem;
  sex: Sex;
  weightSystem: MeasurementSystem;
}

interface IUserProfileModel {
  birthday: Date;
  email_address: string;
  height_in_mm: number;
  length_system: string;
  sex: string;
  weight_system: string;
}
