<script lang="ts">
	import { workFavicons } from '$lib/sitedata';
</script>

<ul class="orbiter">
	{#each workFavicons as faviconSrc}
		<li>
			<img width="32" height="32" src="/project-favicons/{faviconSrc}" alt="a website favicon" />
		</li>
	{/each}
</ul>

<style lang="scss">
	@use 'sass:math';

	.orbiter img {
		display: block;
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
		place-items: start center;
		padding-bottom: 70px;

		perspective: 800px;
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
				background-color: var(--card-backgroundcolor);

				background: linear-gradient(to top, #fff1, #fff0);
				top: -$length - 1;
				left: 16.5px;
			}

			img {
				animation: spinny 30s infinite;
				animation-fill-mode: both;
				animation-timing-function: ease-in-out;
			}
			@for $i from 1 through 50 {
				&:nth-child(50n + #{$i}) {
					$forward: math.random() * 40;
					transform: rotateY(#{math.floor((math.random() * 12) - 6)}deg)
						translateX(#{math.floor((math.random() * 100 - 50))}px)
						translateY(#{math.floor((math.random() * $forward) + $forward)}px)
						translateZ(#{math.floor(($forward - 20) * 10)}px);
					z-index: math.floor($forward);

					img {
						animation-duration: #{math.random() * 20s + 25s};
						animation-delay: #{math.random() * 20s};
						filter: blur(
							#{max(0, math.floor(math.div(40 - $forward, 10) - 2))}px
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
			50% {
				transform: rotateY(340deg);
			}
			60% {
				transform: rotateY(60deg);
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
