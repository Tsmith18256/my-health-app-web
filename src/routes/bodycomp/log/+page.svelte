<script lang="ts" module>
  import type { PageData } from './$types';

  export interface IBodyCompLogPageProps {
    data: PageData;
  }
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import {
    addBodyCompEntry,
    bodyCompEntries,
  } from '$lib/body-comp/stores/body-comp-entries/body-comp-entries.store';
  import Icon from '$lib/shared/components/display/icon/icon.svelte';
  import type { IBodyCompEntry } from '$lib/body-comp/types/body-comp-entry.type';
  import { IconImage } from '$lib/shared/types/icon-image.type';
  import { getBodyCompLogEntryRoute, getBodyCompLogNewRoute } from '$lib/shared/utils/get-route';
  import BodyCompTable from './body-comp-table.svelte';

  let { data }: IBodyCompLogPageProps = $props();

  if ($bodyCompEntries.length === 0) {
    data.entries.forEach((entry) => {
      addBodyCompEntry(entry);
    });
  }

  const createEntry = () => {
    goto(getBodyCompLogNewRoute());
  };

  const editEntry = (entry: IBodyCompEntry) => {
    goto(getBodyCompLogEntryRoute(entry.id!));
  };
</script>

<button
  class="variant-filled-secondary btn"
  type="button"
  onclick={createEntry}
>
  <span><Icon iconImage={IconImage.Plus} /></span>
  <span>New entry</span>
</button>

<BodyCompTable entries={$bodyCompEntries} onEntryClick={editEntry} />
