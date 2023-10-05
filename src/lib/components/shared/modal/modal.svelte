<script lang="ts">
  export let isVisible = false;

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      hideModal();
    }
  };

  const hideModal = () => {
    isVisible = false;
  };
</script>

<div
  class="background"
  class:visible={isVisible}
  on:click|stopPropagation|self={hideModal}
  on:keyup={onKeyUp}
  role="presentation"
>
  <div class="modal" role="dialog">
    <slot />
  </div>
</div>

<style lang="scss">
  @use '$lib/styles/variables/breakpoints';
  @use '$lib/styles/variables/colors';

  .background {
    display: none;

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

  .visible {
    display: initial;
  }
</style>
