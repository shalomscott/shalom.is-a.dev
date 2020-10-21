<script>
	import { tweened } from 'svelte/motion';
	import { quartOut } from 'svelte/easing';

	let innerHeight, innerWidth;
	const verticalOffset = tweened(0, { easing: quartOut }),
		horizontalOffset = tweened(0, { easing: quartOut });

	function randomOffset(range) {
		const sign = Math.random() > 0.5;
		const offset = Math.round(
			(range / 2) * Math.random() * (sign ? 1 : -1)
		);
		return offset;
	}

	function reposition() {
		$verticalOffset = randomOffset(innerHeight - 50);
		$horizontalOffset = randomOffset(innerWidth - 50);
	}
</script>

<style>
	button {
		position: relative;
		display: block;
		margin: 0 auto;
		font-size: 1.5rem;
		padding: 0.2em 0.5em;
		border: 2px solid #6b1b00;
		border-radius: 4px;
		box-shadow: 0 8px 6px -6px #000;
		background-color: #ff3e00;
	}
</style>

<svelte:window bind:innerHeight bind:innerWidth />

<button
	style="top: {$verticalOffset}px; left: {$horizontalOffset}px"
	on:pointerenter={reposition}>Click Me 😄</button>
