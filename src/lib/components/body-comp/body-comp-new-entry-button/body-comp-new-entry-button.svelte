<button class="new-entry-button">
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
