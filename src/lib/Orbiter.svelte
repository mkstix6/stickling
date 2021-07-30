<script>
	import { workFavicons } from '$lib/sitedata.js';
</script>

<ul class="orbiter">
	{#each workFavicons as faviconSrc}
		<li><img width="32" height="32" src="/project-favicons/{faviconSrc}" /></li>
	{/each}
</ul>

<style lang="scss">
	@use "sass:math";

	// .orbiter {
	// 	position: relative;
	// 	width: 500px;
	// 	height: 500px;
	// 	list-style: none;
	// 	padding-left: 0;
	// }

	// .orbiter li {
	// 	position: absolute;
	// 	top: 50%;
	// 	left: 50%;
	// 	animation: orbit 5s infinite;
	// 	animation-timing-function: linear;
	// 	animation-fill-mode: backwards;
	// 	transform-origin: center -200px;
	// }

	// @for $i from 1 through 10 {
	// 	.orbiter li:nth-child(#{$i}) {
	// 		transform-origin: center #{random(200) * 1px};
	// 		animation-delay: 1s * random(5);
	// 		animation-duration: 4s + random(5);
	// 	}
	// }

	// @keyframes orbit {
	// 	0% {
	// 		transform: rotate(0deg);
	// 	}
	// 	100% {
	// 		transform: rotate(360deg);
	// 	}
	// }

	.orbiter img {
		display: block;
		// padding: 2px;
		background: white;
		border-radius: 2px;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
		/* This is better for small screens, once min() is better supported */
		/* grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr)); */
		gap: 0.1rem;
		list-style: none;
		place-items: center;

		perspective: 180px;
		perspective-origin: bottom center;

		li {
			padding: 0;
			margin: 0;

			&::after {
				$length: 200px;
				content: '';
				position: absolute;
				width: 1px;
				height: $length;
				background: white;
				background-color: var(--card-backgroundcolor);
				background: linear-gradient(to top, #fff3, #fff1, #fff2 70%, #fff0);
				top: -$length - 1;
				left: 16.5px;
			}

			img {
				animation: spinny 30s infinite;
				// animation-fill-mode: backwards;
				animation-timing-function: ease-in-out;
			}
			@for $i from 1 through 50 {
				&:nth-child(50n + #{$i}) {
					$forward: random() * 40;
					transform: rotateY(#{(random() * 12)-6}deg)
						translateX(#{(random() * 100)}px)
						translateY(#{((random() * 100) + $forward - $i) - 40}px)
						translateZ(#{$forward}px);
					z-index: $forward;

					img {
						animation-duration: #{random() * 20s + 25s};
						animation-delay: #{random() * 20s};
						filter: blur(
							#{math.div(40 - $forward, 10) - 2}px
						); // brightness(#{($forward / 40) + 0.25});
						opacity: #{math.div($forward, 40) + 0.25};
					}
				}
			}
		}

		@keyframes spinny {
			0% {
				transform: rotateY(0deg);
			}
			40% {
				transform: rotateY(40deg);
			}
			50% {
				transform: rotateY(360deg);
			}
			80% {
				transform: rotateY(310deg);
			}
			90% {
				transform: rotateY(20deg);
			}
		}

		img {
			width: 32px;
			height: 32px;
			object-fit: cover;
			object-position: center center;
			display: block;
		}
	}
</style>
