"use server";

import {
  INewBodyCompEntry,
  insertBodyCompEntry,
} from "@/database/models/body-comp-entry.model";
import { EmailAddress } from "@/utils/validation/validate-email-address";
import { currentUser } from "@clerk/nextjs/server";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

export const createBodyCompEntry = async (
  _: { message: string },
  formData: FormData
): Promise<{ message: string }> => {
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

  const user = await currentUser();
  const emailAddress = user?.emailAddresses[0]?.emailAddress;

  if (!emailAddress) {
    return {
      message: "Authentication failed",
    };
  }

  const entry: INewBodyCompEntry = {
    date: dayjs(date.toString()),
    userEmail: emailAddress as EmailAddress,
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
