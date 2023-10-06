<script lang="ts">
  export let disabled = false;
</script>

<button class="button" class:disabled on:click|stopPropagation {disabled}>
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
