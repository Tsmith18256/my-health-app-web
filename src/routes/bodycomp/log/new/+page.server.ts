import { redirect } from '@sveltejs/kit';
import type { IBodyCompEntry } from '$lib/body-comp/types/body-comp-entry.type';
import { insertBodyCompEntry } from '$lib/shared/database/models/body-comp-entry.model';
import { getBodyCompLogEntryRoute } from '$lib/shared/utils/get-route';
import {
  convertInsToMms,
  convertLbsToGs,
} from '$lib/shared/utils/unit-converter/unit-converter.util';
import { parseIntsFromFormFields } from '$lib-server/utils/parse-ints-from-form-fields.util';
import type { Actions } from './$types';
import { parseFloatsFromFormFields } from '$lib-server/utils/parse-floats-from-form-fields.util';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const date = data.get('date') as string;

    const { neck, waist, weight } = parseFloatsFromFormFields(
      ['neck', 'waist', 'weight'],
      data,
    );
    const { ab, chest, thigh } = parseIntsFromFormFields(
      ['ab', 'chest', 'thigh'],
      data,
    );

    const newEntry: IBodyCompEntry = {
      date,
      abSkinfold: ab,
      chestSkinfold: chest,
      neckCircumference: convertInsToMms(neck),
      thighSkinfold: thigh,
      waistCircumference: convertInsToMms(waist),
      weight: convertLbsToGs(weight),
    };

    const createdEntry = await insertBodyCompEntry(newEntry);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    redirect(303, getBodyCompLogEntryRoute(createdEntry.id!));
  },
};
