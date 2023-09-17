<script lang="ts">
	export let date: string;
	export let weight: string;
	export let bodyFat: string | undefined;
</script>

<div class="item-container">
	<span class="date-label">{date}</span>

	{#if bodyFat}
		<span class="body-fat-label">{bodyFat}% BF</span>
	{/if}
	<span class="weight-label">{weight} lbs</span>
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

		/* @media (min-width: 481px) {

		}

		@media (min-width: 769px) {
		} */

		@media (min-width: 1025px) {
			display: flex;
			justify-content: space-between;

			height: 3rem;
		}

		/* @media (min-width: 1201px) {
		} */
	}

	.date-label {
		grid-row-start: 1;
		grid-row-end: span 2;
		font-size: 1.5rem;

		@media (min-width: 1025px) {
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

		@media (min-width: 1025px) {
			font-size: 1rem;
		}
	}

	.body-fat-label {
		grid-row-start: 2;
		grid-row-end: span 1;
		justify-self: end;

		font-size: 0.9rem;

		@media (min-width: 1025px) {
			font-size: 1rem;
		}
	}
</style>
