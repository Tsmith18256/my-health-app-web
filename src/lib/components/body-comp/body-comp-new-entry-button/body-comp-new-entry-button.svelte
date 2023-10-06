<script lang="ts">
  import Button from '$lib/components/shared/button/button.svelte';
  import FloatingActionButton from '$lib/components/shared/floating-action-button/floating-action-button.svelte';
  import { ICON_IMAGE } from '$lib/components/shared/icon/icon.constants';

  let innerWidth: number;

  $: isMobile = innerWidth <= 769;
</script>

{#if isMobile}
  <FloatingActionButton on:click icon={ICON_IMAGE.plus} />
{:else}
  <Button on:click>
    <i class="far fa-plus icon" />
    NEW ENTRY
  </Button>
{/if}

<svelte:window bind:innerWidth />

<style>
  .icon {
    padding-right: 0.25rem;
  }
</style>
