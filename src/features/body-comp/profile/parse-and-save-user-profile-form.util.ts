import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import { IUserProfile } from "@/shared/database/daos/user-profile.dao";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { ErrorCode, ErrorWithCode } from "@/shared/errors/error-with-code.type";
import { convertLengthUnits } from "@/shared/utils/units/convert-length-units.util";
import { validateMeasurementSystem } from "@/shared/utils/validation/validate-measurement-system.util";
import { validateSex } from "@/shared/utils/validation/validate-sex.util";

export const parseAndSaveUserProfileForm = async (
  formData: FormData,
  insertOrUpdateFunction: (profile: IUserProfile) => Promise<IUserProfile>
): Promise<IUserProfile> => {
  const { emailAddress } = await getAuthSessionDetails();

  const birthday = formData.get("birthday")?.toString();
  const height = formData.get("height")?.toString();
  const lengthSystem = formData.get("lengthSystem")?.toString();
  const sex = formData.get("sex")?.toString();
  const weightSystem = formData.get("weightSystem")?.toString();

  if (!birthday || !height || !lengthSystem || !sex || !weightSystem) {
    throw new ErrorWithCode(ErrorCode.FormDataIncomplete);
  }

  const validatedLengthSystem = validateMeasurementSystem(lengthSystem);
  const heightInMm = Math.round(convertLengthUnits(
    parseFloat(height),
    validatedLengthSystem === MeasurementSystem.Imperial
      ? LengthUnit.Inches
      : LengthUnit.Millimeters,
    LengthUnit.Millimeters
  ));

  return insertOrUpdateFunction({
    birthday,
    emailAddress,
    heightInMm: heightInMm,
    lengthSystem: validatedLengthSystem,
    sex: validateSex(sex),
    weightSystem: validateMeasurementSystem(weightSystem),
  });
};
