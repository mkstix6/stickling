<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let playing = true;

	const triggerPlayPauseTimer = () => {
		dispatch('toggle');
	};
</script>

<button
	class="ringtimer__playpause ringtimer__playpause--{playing ? 'paused' : 'playing'}"
	onclick={triggerPlayPauseTimer}
>
	<span class="screen-reader-text">{playing ? 'Pause' : 'Play'}</span>
	<span class="ringtimer__playpauseicon">
		{#if playing}
			<!-- prettier-ignore -->
			<svg class="pauseicon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 295 295" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><clipPath id="a"><path clip-rule="evenodd" d="m0 0h294.166v294.166h-294.166z"/></clipPath><path d="m0 0h294.166v294.166h-294.166z" fill="none"/><g clip-path="url(#a)"><path d="m106.23 26.465c0-14.584-11.84-26.424-26.424-26.424h-52.849c-14.584 0-26.425 11.84-26.425 26.424v241.318c0 14.584 11.841 26.424 26.425 26.424h52.849c14.584 0 26.424-11.84 26.424-26.424z"/><path d="m294.699 26.465c0-14.584-11.841-26.424-26.425-26.424h-52.848c-14.584 0-26.425 11.84-26.425 26.424v241.318c0 14.584 11.841 26.424 26.425 26.424h52.848c14.584 0 26.425-11.84 26.425-26.424z"/></g></svg>
		{:else}
			<!-- prettier-ignore -->
			<svg class="playicon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 291 328" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><clipPath id="a"><path clip-rule="evenodd" d="m0 0h290.341v327.317h-290.341z"/></clipPath><path d="m0 0h290.341v327.317h-290.341z" fill="none"/><g clip-path="url(#a)"><path d="m278.734 142.044c7.739 4.465 12.507 12.72 12.507 21.655 0 8.934-4.768 17.19-12.507 21.655-60.69 35.013-179.678 103.66-240.341 138.658-7.736 4.463-17.264 4.46-24.997-.006s-12.496-12.718-12.496-21.649v-277.316c0-8.931 4.763-17.183 12.496-21.649s17.261-4.469 24.997-.006c60.663 34.998 179.651 103.645 240.341 138.658z"/></g></svg>
		{/if}
	</span>
</button>

<style>
	.ringtimer__playpause {
		cursor: pointer;
		opacity: 0;
		display: block;
		background-color: #fff5;
		-webkit-backdrop-filter: blur(2px);
		border: 1px solid white;
		position: absolute;
		top: calc(var(--innerRingInset) + 2px);
		left: calc(var(--innerRingInset) + 2px);
		width: calc(var(--innerRingSize) - 4px);
		height: calc(var(--innerRingSize) - 4px);
		border-radius: 100%;
		z-index: 15;
		transform: rotate(0deg);
		transition:
			opacity 0.4s,
			transform 0.3s,
			background-color 0.5s;
		&:focus {
			outline: red solid 2px;
		}
		&:hover {
			background-color: #fffc;
			box-shadow: inset 0 -0.75em 1em #0001;
			opacity: 1;
		}
		&:active {
			background-color: #fff;
			transition: background-color 150ms;
			box-shadow: inset 0 0.5em 2em #0002;
			color: black;
		}
	}

	.ringtimer__playpauseicon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3em;
		height: 3em;
		margin: 0 auto;

		svg {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: contain;

			&.playicon {
				position: relative;
				left: 0.25em;
			}
		}
	}
</style>
