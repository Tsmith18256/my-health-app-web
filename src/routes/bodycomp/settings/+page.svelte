<script lang="ts">
  import { MEASUREMENT_SYSTEMS } from '$lib/shared/constants/measurement-systems.constants';
  import {
    settings,
    updateSettings,
  } from '$lib/shared/stores/settings/settings.store';
  import dayjs from 'dayjs';
  import { get } from 'svelte/store';
  import {
    LengthMeasurement,
    LengthUnit,
  } from '$lib/shared/utils/measurements/length-measurement/length-measurement.util';

  let birthday = get(settings).birthday.format('YYYY-MM-DD');

  let heightUnit =
    $settings.heightSystem === MEASUREMENT_SYSTEMS.imperial
      ? LengthUnit.Inches
      : LengthUnit.Centimetres;
  let height = get(settings).height.getValue({ unit: heightUnit });
  let { bodyweightSystem, heightSystem, circumferenceSystem } = get(settings);

  $: areValuesSameAsSaved =
    birthday === $settings.birthday.format('YYYY-MM-DD') &&
    height == $settings.height.getValue({ unit: heightUnit }) &&
    bodyweightSystem === $settings.bodyweightSystem &&
    heightSystem === $settings.heightSystem &&
    circumferenceSystem === $settings.circumferenceSystem;

  $: isButtonDisabled = !birthday || !height || areValuesSameAsSaved;

  const save = () => {
    if (birthday && height) {
      updateSettings({
        birthday: dayjs(birthday),
        height: new LengthMeasurement({ value: height, unit: heightUnit }),
        bodyweightSystem,
        heightSystem,
        circumferenceSystem,
      });
    }
  };
</script>

<div class="container">
  <h1 class="h1">Settings</h1>

  <label class="label">
    <span>Birthday</span>
    <input class="input" type="date" bind:value={birthday} />
  </label>

  <label class="label">
    <span>Height (in)</span>
    <input class="input" type="number" step="0.1" bind:value={height} />
  </label>

  <h2 class="h2">Measurement systems</h2>

  <label class="label">
    <span>Bodyweight</span>

    <select class="select" bind:value={bodyweightSystem}>
      <option value={MEASUREMENT_SYSTEMS.imperial}>Imperial</option>
      <option value={MEASUREMENT_SYSTEMS.metric}>Metric</option>
    </select>
  </label>

  <label class="label">
    <span>Height</span>

    <select class="select" bind:value={heightSystem}>
      <option value={MEASUREMENT_SYSTEMS.imperial}>Imperial</option>
      <option value={MEASUREMENT_SYSTEMS.metric}>Metric</option>
    </select>
  </label>

  <label class="label">
    <span>Circumferences</span>

    <select class="select" bind:value={circumferenceSystem}>
      <option value={MEASUREMENT_SYSTEMS.imperial}>Imperial</option>
      <option value={MEASUREMENT_SYSTEMS.metric}>Metric</option>
    </select>
  </label>

  <button
    class="variant-filled-secondary btn"
    type="button"
    disabled={isButtonDisabled}
    on:click={save}
  >
    Save Settings
  </button>
</div>
