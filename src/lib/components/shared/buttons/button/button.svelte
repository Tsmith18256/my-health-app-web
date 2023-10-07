<script lang="ts">
  import { TEST_IDS } from '$lib/constants/test-ids.constants';

  export let disabled = false;
</script>

<button class="button" class:disabled on:click|stopPropagation {disabled} data-testid={TEST_IDS.button}>
  <slot />
</button>

<style lang="scss">
   @use '$lib/styles/variables/colors';

  .button {
    padding: 1rem;

    background-color: colors.$secondary;
    border: none;
    border-radius: 0.25rem;

    font-weight: bold;
  }

  .disabled {
    opacity: 0.5;
  }
</style>
