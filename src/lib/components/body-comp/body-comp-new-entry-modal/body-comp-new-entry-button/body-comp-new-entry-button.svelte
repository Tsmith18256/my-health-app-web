<script lang="ts">
  import FloatingActionButton from '$lib/components/shared/buttons/floating-action-button/floating-action-button.svelte';
  import IconButton from '$lib/components/shared/buttons/icon-button/icon-button.svelte';
  import { ICON_IMAGE } from '$lib/components/shared/icon/icon.constants';
  import { BREAKPOINTS } from '$lib/constants/breakpoints.constants';

  const icon = ICON_IMAGE.plus;

  let innerWidth: number;

  $: isMobile = innerWidth < BREAKPOINTS.tablet;
</script>

{#if isMobile}
  <FloatingActionButton on:click {icon} />
{:else}
  <IconButton on:click {icon}>
    NEW ENTRY
  </IconButton>
{/if}

<svelte:window bind:innerWidth />
