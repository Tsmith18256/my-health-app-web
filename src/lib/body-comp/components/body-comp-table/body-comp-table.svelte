<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import BodyCompTableRow from '$lib/body-comp/components/body-comp-table/body-comp-table-row.svelte/body-comp-table-row.svelte';
  import { BodyCompEntry } from '$lib/body-comp/utils/body-comp-entry/body-comp-entry.util';
  import BodyCompTableHeading from './body-comp-table-heading/body-comp-table-heading.svelte';

  export let entries: BodyCompEntry[];

  const dispatch = createEventDispatcher<{
    entryClick: BodyCompEntry;
  }>();

  const onEntryClick = (entry: BodyCompEntry) => {
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
