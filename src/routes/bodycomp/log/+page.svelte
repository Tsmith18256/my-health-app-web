<script lang="ts">
  import BodyCompListItem from '$lib/components/body-comp-list-item/body-comp-list-item.svelte';
  import type { IBodyCompListItemProps } from '$lib/components/body-comp-list-item/body-comp-list-item.types';

  const entries: IBodyCompListItemProps[] = [
    {
      date: 'August 27, 2023',
      weight: '169.2',
      bodyFat: '13.7'
    },
    {
      date: 'August 26, 2023',
      weight: '171.6'
    },
    {
      date: 'August 25, 2023',
      weight: '169.2'
    }
  ];
</script>

{#each entries as entry}
  <BodyCompListItem date={entry.date} weight={entry.weight} bodyFat={entry.bodyFat} />
{/each}
