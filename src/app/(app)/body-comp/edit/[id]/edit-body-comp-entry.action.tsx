'use server';

import { INewBodyCompEntry } from '@/database/models/body-comp-entry.model';
import dayjs from 'dayjs';
import { redirect } from 'next/navigation';

export const editBodyCompEntry = async (formData: FormData) => {
  const date = formData.get("date");
  const weight = formData.get("weight");
  const neckCircumference = formData.get("neckCircumference");
  const waistCircumference = formData.get("waistCircumference");
  const chestSkinfold = formData.get("chestSkinfold");
  const abSkinfold = formData.get("abSkinfold");
  const thighSkinfold = formData.get("thighSkinfold");

  if (!date || !weight) {
    console.error("INVALID INPUT");

    return;
  }

  const entry: INewBodyCompEntry = {
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
    abSkinfold:
      abSkinfold ? parseFloat(abSkinfold.toString()) : undefined,
    thighSkinfold:
      thighSkinfold ? parseFloat(thighSkinfold.toString()) : undefined,
  };

  console.log("EDITING ENTRY:", entry);

  redirect("/body-comp/log");
};
