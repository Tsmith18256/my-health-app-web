<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const onClick = () => {
    dispatch('click');
  };
</script>

<button class="new-entry-button" on:click={onClick}>
  <i class="far fa-plus icon" />
  NEW ENTRY
</button>

<style lang="scss">
  @use '$lib/styles/variables/colors';

  .new-entry-button {
    padding: 1rem;

    background-color: colors.$secondary;
    border: none;
    border-radius: 0.25rem;

    font-weight: bold;
  }

  .icon {
    padding-right: 0.25rem;
  }
</style>
