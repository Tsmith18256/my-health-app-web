<script lang="ts">
  import { TEST_IDS } from '$lib/constants/test-ids.constants';
  import { isMobileWidth } from '$lib/utils/shared/breakpoint/breakpoint.util';
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
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    right: 0;
    // TODO: Share the bottom nav height in a variable.
    bottom: 5rem;
    left: 0;

    background-color: #000000dd;

    @media (min-width: breakpoints.$desktop-small) {
      bottom: 0;
    }
  }

  .modal {
    width: 100%;
    height: 100%;
    padding: 2rem;

    /* TODO: Hide the scroll bar */
    overflow-y: scroll;
    scrollbar-width: none;

    background-color: colors.$background;

    @media (min-width: breakpoints.$desktop-small) {
      width: 80%;
      height: 80%;
      min-width: 40rem;
      min-height: 40rem;

      border-radius: 2rem;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
