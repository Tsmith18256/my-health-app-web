"use server";

import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import {
  INewBodyCompEntry,
  insertBodyCompEntry,
} from "@/features/body-comp/body-comp-entry/body-comp-entry.dao";
import { selectUserProfileByEmail } from "@/shared/database/daos/user-profile.dao";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { convertLengthUnits } from "@/shared/utils/units/convert-length-units";
import { convertWeightUnits } from "@/shared/utils/units/convert-weight-units";
import { EmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { redirect } from "next/navigation";

export const createBodyCompEntry = async (
  _: { message: string },
  formData: FormData
): Promise<{ message: string }> => {
  const { emailAddress, updateUserMetadata } = await getAuthSessionDetails();
  const userProfile = await selectUserProfileByEmail(emailAddress);
  if (!userProfile) {
    await updateUserMetadata({
      onboardingComplete: false,
    });

    redirect("/onboarding");
  }

  const date = formData.get("date");
  const weight = formData.get("weight");
  const neckCircumference = formData.get("neckCircumference");
  const waistCircumference = formData.get("waistCircumference");
  const chestSkinfold = formData.get("chestSkinfold");
  const abSkinfold = formData.get("abSkinfold");
  const thighSkinfold = formData.get("thighSkinfold");

  if (!date || !weight) {
    // This error shouldn't be possible if the client-side validation runs.
    return {
      message: "Missing required field",
    };
  }

  const weightUnit =
    userProfile.weightSystem === MeasurementSystem.Imperial
      ? WeightUnit.Pounds
      : WeightUnit.Kilograms;
  const lengthUnit =
    userProfile.lengthSystem === MeasurementSystem.Imperial
      ? LengthUnit.Inches
      : LengthUnit.Centimeters;

  const entry: INewBodyCompEntry = {
    date: date.toString(),
    userEmail: emailAddress as EmailAddress,
    weightInG: convertWeightUnits(
      parseFloat(weight.toString()),
      weightUnit,
      WeightUnit.Grams
    ),
    neckCircumferenceInMm: neckCircumference
      ? convertLengthUnits(
          parseFloat(neckCircumference.toString()),
          lengthUnit,
          LengthUnit.Millimeters
        )
      : undefined,
    waistCircumferenceInMm: waistCircumference
      ? convertLengthUnits(
          parseFloat(waistCircumference.toString()),
          lengthUnit,
          LengthUnit.Millimeters
        )
      : undefined,
    chestSkinfold: chestSkinfold
      ? parseInt(chestSkinfold.toString(), 10)
      : undefined,
    abSkinfold: abSkinfold ? parseInt(abSkinfold.toString(), 10) : undefined,
    thighSkinfold: thighSkinfold
      ? parseInt(thighSkinfold.toString(), 10)
      : undefined,
  };

  try {
    await insertBodyCompEntry(entry);
  } catch (err) {
    return {
      message: err instanceof Error ? err.message : String(err),
    };
  }

  redirect("/body-comp/log");
};
