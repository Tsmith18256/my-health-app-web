<script lang="ts" module>
  import type { IBodyCompEntryV2 } from '$lib/body-comp/types/body-comp-entry.type';

  export interface IBodyCompTableProps {
    /**
     * The entries to show in the table.
     */
    entries: IBodyCompEntryV2[];
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import BodyCompTableHeading from './body-comp-table-heading.svelte';
  import BodyCompTableRow from './body-comp-table-row.svelte';

  let { entries }: IBodyCompTableProps = $props();

  const dispatch = createEventDispatcher<{
    entryClick: IBodyCompEntryV2;
  }>();

  const onEntryClick = (entry: IBodyCompEntryV2) => {
    dispatch('entryClick', entry);
  };
</script>

<div class="table-container">
  <table class="table table-hover">
    <BodyCompTableHeading />

    <tbody>
      {#each entries as entry}
        <BodyCompTableRow {entry} onclick={() => onEntryClick(entry)} />
      {/each}
    </tbody>
  </table>
</div>
