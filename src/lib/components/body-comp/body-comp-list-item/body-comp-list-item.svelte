<script lang="ts">
	export let date: string;
	export let weight: string;
	export let bodyFat: string | undefined = undefined;
	export let waistCirc: string | undefined = undefined;
	export let neckCirc: string | undefined = undefined;
	export let chestSkinfold: string | undefined = undefined;
	export let abSkinfold: string | undefined = undefined;
	export let thighSkinfold: string | undefined = undefined;
</script>

<div class="item-container">
	<span class="date-label">{date}</span>

	<span class="weight-label">{weight} lbs</span>

	{#if bodyFat}
		<span class="body-fat-label">{bodyFat}% BF</span>
	{/if}

	{#if waistCirc}
		<span class="small-desktop-label">{waistCirc}"</span>
	{/if}

	{#if neckCirc}
		<span class="small-desktop-label">{neckCirc}"</span>
	{/if}

	{#if chestSkinfold}
		<span class="large-desktop-label">{chestSkinfold} mm</span>
	{/if}

	{#if abSkinfold}
		<span class="large-desktop-label">{abSkinfold} mm</span>
	{/if}

	{#if thighSkinfold}
		<span class="large-desktop-label">{thighSkinfold} mm</span>
	{/if}
</div>

<style>
	.item-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		align-items: center;

		height: 4.5rem;
		padding: 0.9rem 1rem;

		border-bottom: 1px solid #ddd;

		@media (min-width: 769px) {
			grid-template-columns: 1fr 1fr 1fr;

			height: 3rem;
		}

		@media (min-width: 1025px) {
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		}

		@media (min-width: 1201px) {
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		}
	}

	.date-label {
		grid-row-start: 1;
		grid-row-end: span 2;
		font-size: 1.5rem;

		@media (min-width: 769px) {
			font-weight: normal;
			font-size: 1rem;
		}
	}

	.weight-label {
		grid-row-start: 1;
		grid-row-end: span 1;
		justify-self: end;

		font-weight: bold;
		font-size: 1.3rem;

		@media (min-width: 769px) {
			grid-row-start: initial;
			grid-row-end: initial;
			justify-self: initial;

			font-size: 1rem;
		}
	}

	.body-fat-label {
		grid-row-start: 2;
		grid-row-end: span 1;
		justify-self: end;

		font-size: 0.9rem;

		@media (min-width: 769px) {
			grid-row-start: initial;
			grid-row-end: initial;
			justify-self: initial;

			font-size: 1rem;
		}
	}

	.small-desktop-label {
		display: none;

		@media (min-width: 1025px) {
			display: initial;
		}
	}

	.large-desktop-label {
		display: none;

		@media (min-width: 1201px) {
			display: initial;
		}
	}
</style>
