<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import type { IBodyCompEntryV2 } from '$lib/body-comp/types/body-comp-entry.type';

  import BodyCompTableHeading from './body-comp-table-heading.svelte';
  import BodyCompTableRow from './body-comp-table-row.svelte';

  export let entries: IBodyCompEntryV2[];

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
        <BodyCompTableRow {entry} on:click={() => onEntryClick(entry)} />
      {/each}
    </tbody>
  </table>
</div>
