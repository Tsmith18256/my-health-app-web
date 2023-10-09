<script lang="ts">
  import { TEST_IDS } from '$lib/constants/test-ids.constants';
  import { isMobileWidth } from '$lib/utils/shared/breakpoints/breakpoint.util';
  import { fade } from 'svelte/transition';

  export let isVisible = false;

  let innerWidth: number;

  // Setting duration to undefined tells Svelte to use the default duration.
  $: fadeDuration = isMobileWidth(innerWidth) ? 0 : undefined;

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      hideModal();
    }
  };

  const hideModal = () => {
    isVisible = false;
  };
</script>

{#if isVisible}
  <div
    class="background"
    transition:fade={{ duration: fadeDuration }}
    on:click|stopPropagation|self={hideModal}
    on:keyup={onKeyUp}
    role="presentation"
    data-testid={TEST_IDS.modal}
  >
    <div class="modal" role="dialog">
      <slot />
    </div>
  </div>
{/if}

<svelte:window bind:innerWidth />

<style lang="scss">
  @use '$lib/styles/variables/breakpoints';
  @use '$lib/styles/variables/colors';

  .background {
    @media (min-width: breakpoints.$tablet) {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      background-color: #000000dd;
    }
  }

  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    padding: 2rem;

    /* TODO: Hide the scroll bar */
    overflow-y: scroll;

    background-color: colors.$background;

    @media (min-width: breakpoints.$tablet) {
      top: 10rem;
      right: 20rem;
      bottom: 10rem;
      left: 20rem;

      border-radius: 2rem;
    }
  }
</style>
