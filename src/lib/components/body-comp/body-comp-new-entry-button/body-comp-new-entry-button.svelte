<script lang="ts">
  import Button from '$lib/components/shared/buttons/button/button.svelte';
  import FloatingActionButton from '$lib/components/shared/buttons/floating-action-button/floating-action-button.svelte';
  import IconButton from '$lib/components/shared/buttons/icon-button/icon-button.svelte';
  import { ICON_IMAGE } from '$lib/components/shared/icon/icon.constants';

  const icon = ICON_IMAGE.plus;

  let innerWidth: number;

  $: isMobile = innerWidth <= 769;
</script>

{#if isMobile}
  <FloatingActionButton on:click {icon} />
{:else}
  <IconButton on:click {icon}>
    NEW ENTRY
  </IconButton>
{/if}

<svelte:window bind:innerWidth />

<style>
  .icon {
    padding-right: 0.25rem;
  }
</style>
