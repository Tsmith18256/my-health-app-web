import { redirect } from '@sveltejs/kit';
import type { IBodyCompEntry } from '$lib/body-comp/types/body-comp-entry.type';
import { insertBodyCompEntry } from '$lib/shared/database/models/body-comp-entry.model';
import type { Actions } from './$types';
import { getBodyCompLogEntryRoute } from '$lib/shared/utils/get-route';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const date = data.get('date') as string;
    const weight = parseInt(data.get('weight') as string, 10);

    const newEntry: IBodyCompEntry = {
      date,
      weight,
    };

    const createdEntry = await insertBodyCompEntry(newEntry);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    redirect(303, getBodyCompLogEntryRoute(createdEntry.id!));
  },
};
