<script lang="ts" module>
  import type { IBodyCompEntry } from '$lib/body-comp/types/body-comp-entry.type';

  export interface IBodyCompTableProps {
    /**
     * The entries to show in the table.
     */
    entries: IBodyCompEntry[];
    /**
     * Called when an entry in the table is clicked.
     */
    onEntryClick: (entry: IBodyCompEntry) => void;
  }
</script>

<script lang="ts">
  import BodyCompTableHeading from './body-comp-table-heading.svelte';
  import BodyCompTableRow from './body-comp-table-row.svelte';

  let { entries, onEntryClick }: IBodyCompTableProps = $props();
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
