<script lang="ts">
  export let id: string;
  export let label: string;
  export let value: string | undefined = undefined;
</script>

<div class="input-container">
  <label class="label" for={id}>{label}</label>
  <input {id} class="input" type="date" bind:value />
</div>

<style lang="scss">
  @use '$lib/shared/styles/variables/colors';

  .label {
    display: inline-block;
    width: 10rem;
  }

  .input {
    flex: 1;

    padding: 0.5rem;

    background-color: colors.$background;
    border: 1px solid colors.$border;
    border-radius: 0.25rem;

    &::-webkit-calendar-picker-indicator {
      color-scheme: dark;
    }
  }

  .input-container {
    display: flex;
    align-items: center;
  }
</style>
