<script lang="ts">
  import type { IRadioButton } from '$lib/components/shared/inputs/radio-buttons/radio-buttons.types';

  export let heading: string;
  export let groupName: string;
  export let radioButtons: IRadioButton[];
  export let value: string;
</script>

<div>
  <h4 class="group-heading">{heading}</h4>
  {#each radioButtons as radioButton}
    <div class="radio-button">
      <input
        type="radio"
        id="{groupName}.{radioButton.value}"
        name={groupName}
        value={radioButton.value}
        bind:group={value}
      />
      <label for="{groupName}.{radioButton.value}">{radioButton.label}</label>
    </div>
  {/each}
</div>

<style lang="scss">
  // TODO: create a heading component.
  .group-heading {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .radio-button {
    margin-bottom: 0.3rem;
  }
</style>
