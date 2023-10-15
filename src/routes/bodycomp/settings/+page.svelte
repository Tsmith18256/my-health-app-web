<script lang="ts">
  import Button from '$lib/components/shared/buttons/button/button.svelte';
  import DateInput from '$lib/components/shared/inputs/date-input/date-input.svelte';
  import RadioButtons from '$lib/components/shared/inputs/radio-buttons/radio-buttons.svelte';
  import type { IRadioButton } from '$lib/components/shared/inputs/radio-buttons/radio-buttons.types';
  import TextInput from '$lib/components/shared/inputs/text-input/text-input.svelte';
  import { MEASUREMENT_SYSTEMS } from '$lib/constants/measurement-systems.constants';
  import { settings, updateSettings } from '$lib/stores/shared/settings/settings.store';
  import { convertInsToMms, convertMmsToIns } from '$lib/utils/shared/unit-converter/unit-converter.util';
  import dayjs from 'dayjs';
  import { get } from 'svelte/store';

  let birthday = get(settings).birthday.format('YYYY-MM-DD');
  let heightInIn = Math.round(convertMmsToIns(get(settings).heightInMm) * 10) / 10;
  let { bodyweightSystem, heightSystem, circumferenceSystem } = get(settings);

  $: areValuesSameAsSaved =
    birthday === $settings.birthday.format('YYYY-MM-DD') &&
    Math.round(convertInsToMms(heightInIn)) === $settings.heightInMm &&
    bodyweightSystem === $settings.bodyweightSystem &&
    heightSystem === $settings.heightSystem &&
    circumferenceSystem === $settings.circumferenceSystem;
  $: isButtonDisabled = !birthday || !heightInIn || areValuesSameAsSaved;

  const save = () => {
    if (birthday && heightInIn) {
      updateSettings({
        birthday: dayjs(birthday),
        heightInMm: Math.round(convertInsToMms(heightInIn)),
        bodyweightSystem,
        heightSystem,
        circumferenceSystem,
      });
    }
  };

  const measurementSystemRadioButtons: IRadioButton[] = [
    {
      label: 'Imperial',
      value: MEASUREMENT_SYSTEMS.imperial,
    },
    {
      label: 'Metric',
      value: MEASUREMENT_SYSTEMS.metric,
    },
  ];
</script>

<div class="container">
  <h2 class="heading">Settings</h2>

  <div class="fields-container">
    <DateInput id="birthdayField" label="Birthday" bind:value={birthday} />
    <TextInput id="heightField" label="Height (in)" bind:value={heightInIn} />
  </div>

  <h3 class="subheading">Measurement System</h3>

  <div class="fields-container">
    <RadioButtons
      heading="Bodyweight"
      groupName="bodyweightRadio"
      radioButtons={measurementSystemRadioButtons}
      bind:value={bodyweightSystem}
    />
    <RadioButtons
      heading="Height"
      groupName="heightRadio"
      radioButtons={measurementSystemRadioButtons}
      bind:value={heightSystem}
    />
    <RadioButtons
      heading="Circumferences"
      groupName="circumferenceRadio"
      radioButtons={measurementSystemRadioButtons}
      bind:value={circumferenceSystem}
    />
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

  .subheading {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
</style>
