<script lang="ts">
  import Button from '$lib/components/shared/buttons/button/button.svelte';
  import DateInput from '$lib/components/shared/inputs/date-input/date-input.svelte';
  import TextInput from '$lib/components/shared/inputs/text-input/text-input.svelte';
  import { settings, updateSettings } from '$lib/stores/shared/settings/settings.store';
  import { convertInsToMms, convertMmsToIns } from '$lib/utils/shared/unit-converter/unit-converter.util';
  import dayjs from 'dayjs';
  import { get } from 'svelte/store';

  let birthday = get(settings).birthday.format('YYYY-MM-DD');
  let heightInIn = Math.round(convertMmsToIns(get(settings).heightInMm) * 10) / 10;

  $: areValuesSameAsSaved =
    birthday === $settings.birthday.format('YYYY-MM-DD') &&
    Math.round(convertInsToMms(heightInIn)) === $settings.heightInMm;
  $: isButtonDisabled = !birthday || !heightInIn || areValuesSameAsSaved;

  const save = () => {
    if (birthday && heightInIn) {
      updateSettings({ birthday: dayjs(birthday), heightInMm: Math.round(convertInsToMms(heightInIn)) });
    }
  };
</script>

<div class="container">
  <h2 class="heading">Settings</h2>

  <div class="fields-container">
    <DateInput id="birthdayField" label="Birthday" bind:value={birthday} />
    <TextInput id="heightField" label="Height (in)" bind:value={heightInIn} />
  </div>

  <div class="button-container">
    <Button disabled={isButtonDisabled} on:click={save}>Save Settings</Button>
  </div>
</div>

<style lang="scss">
  .button-container {
    margin-top: 1rem;
  }

  .container {
    padding: 2rem;
  }

  // TODO: create a shared component for this.
  .fields-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  // TODO: create a heading component.
  .heading {
    margin-bottom: 2rem;
  }
</style>
