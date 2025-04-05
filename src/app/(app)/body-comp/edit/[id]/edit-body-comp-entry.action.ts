"use server";

import {
  BodyCompEntryId,
  IBodyCompEntry,
  updateBodyCompEntry,
} from "@/body-comp/body-comp-entry/body-comp-entry.dao";
import { EmailAddress } from "@/shared/utils/validation/validate-email-address.util";
import { currentUser } from "@clerk/nextjs/server";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

export const editBodyCompEntry = async (
  _: { message: string },
  formData: FormData
): Promise<{ message: string }> => {
  const id = formData.get("entryId");
  const date = formData.get("date");
  const weight = formData.get("weight");
  const neckCircumference = formData.get("neckCircumference");
  const waistCircumference = formData.get("waistCircumference");
  const chestSkinfold = formData.get("chestSkinfold");
  const abSkinfold = formData.get("abSkinfold");
  const thighSkinfold = formData.get("thighSkinfold");

  if (!id || !date || !weight) {
    // This error shouldn't be possible if the client-side validation runs.
    return {
      message: "Missing required field",
    };
  }

  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]?.emailAddress;

  if (!emailAddress) {
    return {
      message: "Authentication failed",
    };
  }

  const entry: IBodyCompEntry = {
    id: parseInt(id.toString(), 10) as BodyCompEntryId,
    date: dayjs(date.toString()),
    weight: parseFloat(weight.toString()),
    neckCircumference: neckCircumference
      ? parseFloat(neckCircumference.toString())
      : undefined,
    waistCircumference: waistCircumference
      ? parseFloat(waistCircumference.toString())
      : undefined,
    chestSkinfold: chestSkinfold
      ? parseFloat(chestSkinfold.toString())
      : undefined,
    abSkinfold: abSkinfold ? parseFloat(abSkinfold.toString()) : undefined,
    thighSkinfold: thighSkinfold
      ? parseFloat(thighSkinfold.toString())
      : undefined,
    userEmail: emailAddress as EmailAddress,
  };

  try {
    await updateBodyCompEntry(entry);
  } catch (err) {
    return {
      message: err instanceof Error ? err.message : String(err),
    };
  }

  redirect("/body-comp/log");
};
