<div class="postcard">
	<div class="postcard-image">
		<svg height="400" width="400" viewBox="0 0 400 400" class="sun">
			<linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
				<stop stop-color="#FDFC45" offset="0%" />
				<stop stop-color="#FC7C23" offset="50%" />
				<stop stop-color="#EC571D" offset="100%" />
			</linearGradient>
			<defs>
				<filter id="distortionFilter">
					<feTurbulence
						id="turbolence"
						type="fractalNoise"
						baseFrequency="5"
						numOctaves="10"
						seed="10"
						stitchTiles="noStitch"
						x="0%"
						y="0%"
						width="100%"
						height="100%"
						result="noise"
					/>
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						scale="50"
						xChannelSelector="R"
						yChannelSelector="B"
						x="0%"
						y="0%"
						width="100%"
						height="100%"
						filterUnits="userSpaceOnUse"
					/>
					<animate
						xlink:href="#turbolence"
						attributeName="baseFrequency"
						dur="20s"
						keyTimes="0;0.5;1"
						values="5;5.1;5;"
						repeatCount="indefinite"
					/>
				</filter>
			</defs>
			<circle cx="200" cy="200" r="70" fill="url(#Gradient1)" filter="url(#distortionFilter)" />
		</svg>

		<h1 class="postcard-title">sunset paradise</h1>
	</div>
</div>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

	:root {
		// The standard postcard size in the UK is 148mm x 105mm (14.8 cm x 10.5cm) which is the equivalent of A6. The postcard size in inches is 5.8 inches x 4.2 inches. https://www.postsnap.com/blog/postcard-size/
		--A6paperRatio: calc(105 / 148);
		--postcardWidth: 60vw;
	}

	body {
		display: grid;
		place-items: center;
		background: #bdc7d9;
		min-height: 100%;
	}

	svg {
		max-width: 100%;
		max-height: 100%;
	}

	.postcard {
		width: var(--postcardWidth);
		height: calc(var(--postcardWidth) * var(--A6paperRatio));
		display: block;
		margin: 5vw;
		display: grid;
		place-items: center;
		// border: 6vw solid white;
		transform: rotate(-3deg);
		position: relative;
	}

	.postcard-title {
		color: #fff;
		opacity: 0.9;
		text-shadow: 0.04em 0.04em 0 #0002;
		font-size: calc(var(--postcardWidth) * 0.08);
		font-family: pacifico;
		position: absolute;
		--text-offset: 0.5em;
		top: var(--text-offset);
		left: calc(var(--text-offset) * 2);
		text-align: left;
		margin: 0;
		padding: 0 0.1em;
	}

	// Horizontal Vignette
	.postcard::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(110deg, #fff0, #ffff, #fff0);
		mix-blend-mode: overlay;
		box-shadow: inset 1px 1px 0 #fff7, inset -1px -1px 0 #0001, -0.05em 0.15em 0.1em #0003;
	}

	// Postcard shimmer
	.postcard::after {
		content: '';
		position: absolute;
		inset: 0;
		--color: #fffdcc;
		--colorAlpha: #fffdcc00;

		background: linear-gradient(
			5deg,
			var(--color),
			var(--colorAlpha) 15%,
			var(--colorAlpha) 80%,
			var(--color)
		);

		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: right center;
		opacity: 0.4;
	}

	.postcard-image {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		background-color: #5a2b15;
		background-color: #402214;
		background-image: linear-gradient(to bottom, #fda528, #ba4d15, #5a2b15),
			linear-gradient(to bottom, #402214, #673b12);
		background-size: 100% 75%, 100% 26%;
		background-repeat: no-repeat, repeat;
		background-position: top center, bottom center;
	}

	.sun {
		width: 50vw;
		height: 50vw;
	}

	.water {
		width: 100%;
		height: 100%;
	}
</style>
