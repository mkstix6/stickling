<script lang="ts">
	import LogoSticker from '$lib/LogoSticker.svelte';
</script>

<h1 class="angletext"><LogoSticker logokey="js" /> Chromatic Motion Blur</h1>
<div class="layout">
	<div class="chromaticmotionblur">
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
	</div>
	<p>
		This effect is akin to chromatic abberation in camera lenses but I like to think of this effect
		as a motion-design artistic-impression of the astronomy phenomena called red-shift and
		blue-shift <small>(it's not really the same, but I like the parallels)</small>.
	</p>
	<h4>effect breakdown</h4>
	<p>
		I'm only working with circles and dots in 2D here which means we can get to a decent effect with
		a few tricks even if the result isn't "accurate", so to speak.
	</p>
	<p>Let's have a moving (white) dot and trail some colored dots before and after its motion.</p>
	<div class="chromaticmotionblur chromaticmotionblur--expanded">
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
	</div>
	<p>
		If we tighten up the spacing and timing, then decrease the opacity of the dots towards the edges
		we get the final effect.
	</p>
	<div class="chromaticmotionblur">
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
	</div>
	<p>Of course, in art <small>(I hope it's art)</small>, the colors can be whatever you like!</p>
	<div class="chromaticmotionblur chromaticmotionblur chromaticmotionblur--alternativecolor">
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
		<div />
	</div>
	<p>
		If you'd like a more in depth breakdown of this effect I recommend <a
			href="https://ippsketch.com/posts/chromatic-motion-blur/"
			>Jeff's i++ Sketch post about Chromatic Motion Blur</a
		>, it's great.
	</p>
</div>

<style lang="scss">
	$chromaticBlurSize: 1em;
	$chromaticBlurDistance: 8 * $chromaticBlurSize;
	@keyframes toAndFro {
		0%,
		100% {
			transform: translateX(-$chromaticBlurDistance);
		}
		50% {
			transform: translateX($chromaticBlurDistance);
		}
	}

	$numDots: 10;

	.chromaticmotionblur {
		margin: $chromaticBlurSize * 0.5 auto;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		height: $chromaticBlurSize;
		animation: toAndFro 2s infinite;
		// animation-delay: 1.95s;
		animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);

		> div {
			position: absolute;
			left: 50%;
			margin-left: -0.5 * $chromaticBlurSize;
			top: 0;
			content: '';
			width: $chromaticBlurSize;
			height: $chromaticBlurSize;
			border-radius: $chromaticBlurSize;
			background: white;
			animation: toAndFro 2s infinite;
			animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
		}

		@for $i from 1 through $numDots {
			> div:nth-child(#{$i}) {
				animation-delay: $i * 12ms;
				z-index: 0;
			}
		}
		@for $i from 1 through $numDots * 0.5 {
			> div:nth-child(#{$i}) {
				background-color: hsl(($i * -15) + 240, 100%, 50%);

				opacity: 0.1 * $i;
			}
			> div:nth-last-child(#{$i}) {
				background-color: hsl(($i * 15) + 340, 100%, 50%);

				opacity: 0.1 * $i;
			}
		}
		> div:nth-child(#{($numDots*0.5) - 1}),
		> div:nth-child(#{($numDots*0.5) + 1}) {
			opacity: 0.5;
			// background-color: white;
			z-index: 1;
		}
		> div:nth-child(#{$numDots*0.5}) {
			opacity: 1;
			background-color: white;
			z-index: 2;
		}
	}
	.chromaticmotionblur--expanded {
		animation-duration: 5s;
		> div {
			animation-duration: 5s;
		}
		@for $i from 1 through $numDots {
			> div:nth-child(#{$i}) {
				opacity: 1;
				animation-delay: $i * 70ms;
			}
		}
		> div:nth-child(#{$numDots*0.5}) {
			opacity: 1;
			background-color: white;
			z-index: 2;
		}
	}

	.chromaticmotionblur--alternativecolor {
		@for $i from 1 through $numDots * 0.5 {
			> div:nth-child(#{$i}) {
				// opacity: 0.1 * $i;
				background-color: hsl((($i * 20)+240), 100%, 50%);
			}
			> div:nth-last-child(#{$i}) {
				// opacity: 0.1 * $i;
				background-color: hsl((($i * -20)+170), 100%, 50%);
			}
		}
		> div:nth-child(#{$numDots*0.5}) {
			opacity: 1;
			background-color: white;
			z-index: 2;
		}
	}
</style>
