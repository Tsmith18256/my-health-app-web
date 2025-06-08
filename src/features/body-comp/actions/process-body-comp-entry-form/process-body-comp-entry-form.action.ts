"use server";

import { getAuthSessionDetails } from "@/features/auth/get-auth-session-details.util";
import {
  BodyCompEntryId,
  IBodyCompEntry,
  INewBodyCompEntry,
  insertBodyCompEntry,
  updateBodyCompEntry,
} from "@/features/body-comp/daos/body-comp-entry.dao";
import { selectUserProfileByEmail } from "@/shared/database/daos/user-profile.dao";
import { LengthUnit } from "@/shared/enums/length-unit.enum";
import { MeasurementSystem } from "@/shared/enums/measurement-system.enum";
import { WeightUnit } from "@/shared/enums/weight-unit.enum";
import { getFormStrings } from "@/shared/utils/forms/get-form-strings/get-form-strings";
import { convertLengthUnits } from "@/shared/utils/units/convert-length-units.util";
import { convertWeightUnits } from "@/shared/utils/units/convert-weight-units.util";
import { permanentRedirect, redirect } from "next/navigation";

/**
 * Shared form action used by the body comp entry form. If an entry ID is passed
 * from the form, the entry will be edited. Otherwise, a new entry will be
 * created.
 */
export const processBodyCompEntryForm = async (
  _: { message: string },
  formData: FormData,
): Promise<{ message: string }> => {
  const { emailAddress, updateUserMetadata } = await getAuthSessionDetails();
  const userProfile = await selectUserProfileByEmail(emailAddress);
  if (!userProfile) {
    await updateUserMetadata({
      onboardingComplete: false,
    });

    redirect("/onboarding");
  }

  const {
    id,
    date,
    weight,
    neckCircumference,
    waistCircumference,
    chestSkinfold,
    abSkinfold,
    thighSkinfold,
  } = getFormStrings(formData, [
    "id",
    "date",
    "weight",
    "neckCircumference",
    "waistCircumference",
    "chestSkinfold",
    "abSkinfold",
    "thighSkinfold",
  ]);

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

  const entryWithoutId: INewBodyCompEntry = {
    date: date,
    userEmail: emailAddress,
    weightInG: convertWeightUnits(
      parseFloat(weight.toString()),
      weightUnit,
      WeightUnit.Grams,
    ),
    neckCircumferenceInMm: neckCircumference
      ? convertLengthUnits(
          parseFloat(neckCircumference.toString()),
          lengthUnit,
          LengthUnit.Millimeters,
        )
      : undefined,
    waistCircumferenceInMm: waistCircumference
      ? convertLengthUnits(
          parseFloat(waistCircumference.toString()),
          lengthUnit,
          LengthUnit.Millimeters,
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

  let idString: string;
  try {
    if (id) {
      // Edit entry behaviour.
      idString = id.toString();
      const entryWithId: IBodyCompEntry = {
        ...entryWithoutId,
        id: parseInt(idString, 10) as BodyCompEntryId,
      };

      await updateBodyCompEntry(entryWithId);
    } else {
      // Create new entry behaviour.
      const { id: newEntryId } = await insertBodyCompEntry(entryWithoutId);

      idString = newEntryId.toString();
    }
  } catch (err) {
    return {
      message: err instanceof Error ? err.message : String(err),
    };
  }

  const redirectUrl = `/body-comp/${idString}`;
  if (id) {
    // Redirect if in edit mode (back button will return to edit form).
    redirect(redirectUrl);
  } else {
    // Permanent redirect if in new mode (back button will return to page before
    // new entry form).
    permanentRedirect(redirectUrl);
  }
};
