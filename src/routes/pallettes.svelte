<script>
	const palletteClasses = [
		'theme-light',
		'theme-dark',
		'theme-evening',
		'theme-morning',
		'theme-spring',
		'theme-summer',
		'theme-autumn',
		'theme-winter',
		'theme-christmas',
		'theme-halloween'
	];
</script>

<div class="page">
	<main id="main">
		<ul class="pallettelist">
			{#each palletteClasses as palletteClass}
				<li class={palletteClass}>
					<h2>{palletteClass}</h2>
					<div class="pallettecard">
						<div class="herograd">
							<h1 class="heroheading">Hero text</h1>
						</div>
						<ul class="pallettesquares">
							<li>pallette1</li>
							<li>pallette2</li>
							<li>pallette3</li>
							<li>pallette4</li>
							<li>pallette5</li>
						</ul>
						<h2>Heading</h2>
						<p>
							Body …Lorem <a href="/">ipsum dolor sit amet</a> consectetur adipisicing elit. Perferendis
							impedit iusto ut nam minus nihil, magnam alias cumque harum quos nobis aliquid quas mollitia
							laudantium architecto nostrum. Debitis, error dolore.
						</p>
						<div class="card">
							<p>
								Body …Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis impedit
								iusto ut nam minus nihil, magnam alias cumque harum quos nobis aliquid quas mollitia
								laudantium architecto nostrum. Debitis, error dolore.
							</p>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</main>
</div>

<style>
	.pallettelist {
		margin: 5rem 0;
		/* display: flex;
		flex-wrap: wrap;
		align-items: stretch; */
		list-style: none;
		padding-left: 0;
	}

	.pallettelist > li {
		/* flex: 0 1 250px; */
		display: block;
		width: 100%;
		max-width: none;
		margin: 5rem 0;
		/* margin: 2rem; */
	}

	.pallettecard {
		padding: var(--pallettecard-padding);
		border: 1px solid #0003;
		background-color: var(--pallette5);
	}

	.pallettelist p {
		color: var(--bodycolor);
	}

	.pallettesquares {
		display: inline-flex;
		list-style: none;
		padding-left: 0;
		border-radius: 5px;
		border: 4px solid #0001;
	}

	.pallettesquares li {
		display: block;
		width: 2em;
		height: 2em;
		background-color: #0001;
		color: transparent;
		overflow: hidden;
		box-shadow: inset 0 0 0 1px #00000008;
	}

	.pallettesquares li:first-child {
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
	}

	.pallettesquares li:last-child {
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
	}

	.pallettesquares li:nth-child(1) {
		background-color: var(--pallette1);
	}
	.pallettesquares li:nth-child(2) {
		background-color: var(--pallette2);
	}
	.pallettesquares li:nth-child(3) {
		background-color: var(--pallette3);
	}
	.pallettesquares li:nth-child(4) {
		background-color: var(--pallette4);
	}
	.pallettesquares li:nth-child(5) {
		background-color: var(--pallette5);
	}

	.pallettecard .herograd {
		margin: calc(-1 * var(--pallettecard-padding)) calc(-1 * var(--pallettecard-padding))
			calc(var(--pallettecard-padding)) calc(-1 * var(--pallettecard-padding));
		/* height: 3em; */
		background-image: var(--herogradient);
	}

	.herograd .heroheading {
		color: white;
		padding: 1em;
	}
</style>
