<script lang="ts">
  import BodyCompListItem from '$lib/components/body-comp/body-comp-list-item/body-comp-list-item.svelte';
	import BodyCompTableHeading from '$lib/components/body-comp/body-comp-table-heading/body-comp-table-heading.svelte';
	import type { ComponentProps } from 'svelte';

  const entries: ComponentProps<BodyCompListItem>[] = [
    {
      date: 'August 27, 2023',
      weight: '169.2',
      bodyFat: '13.7',
      waistCirc: '34.5',
      neckCirc: '15.0',
      chestSkinfold: '12',
      abSkinfold: '14',
      thighSkinfold: '13'
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

<BodyCompTableHeading />
{#each entries as entry}
  <BodyCompListItem {...entry} />
{/each}
