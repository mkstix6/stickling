<script>
	import JSHighlight from '$lib/JSHighlight.svelte';
	let code = `export function* pseudoRandom(seed) {
	let value = seed;

	while (true) {
		value = (value * 16807) % 2147483647;
		yield value;
	}
}`;

	const artworks = [
		'experiment-20210914155321-01download.png',
		'experiment-20210914160821-01-experiment163163570479710.png',
		'experiment-20210914162250-01.png',
		'experiment-20210914163440-09.png',
		'experiment-20210914163446-07.png',
		'experiment-20210914164304-01.png',
		'experiment-20210914165815-07.png',
		'experiment-20210914184907-02.png',
		'experiment-20210914185521-01.png',
		'experiment-20210914185533-01.png',
		'experiment-20210914195039-01.png',
		'experiment-20210915122648-01.png',
		'experiment-20210915122733-01.png',
		'experiment-20210915134137-01.png',
		'experiment-20210915134251-01.png',
		'experiment-20210915135002-01.png',
		'experiment-20210915142706-01.png',
		'experiment-20210915142825-01.png',
		'experiment-20210915143002-01.png',
		'experiment-20210915144957-01.png',
		'experiment-20210915145045-01.png',
		'experiment-20210915145233-01.png',
		'experiment-20210915145727-01.png',
		'experiment-20210915151719-01.png',
		'experiment-20210915154616-01.png',
		'experiment-20210915172828-01.png',
		'experiment-20210915174200-01.png',
		'experiment-20210915175819-01.png',
		'experiment-20210915191654-01.png',
		'experiment-20210915203456-08.png',
		'experiment-20210916075703-01.png',
		'experiment-20210916170448-03.png',
		'experiment-20210916170942-01.png',
		'experiment-20210916171604-05.png',
		'experiment-20210916182002-09.png',
		'experiment-20210917153112-06.png',
		'experiment-20210920180259-05.png',
		'experiment-20210920180311-04.png',
		'experiment-20210920180315-02.png',
		'experiment-20210920180319-01.png',
	].sort();
</script>

<h1 class="angletext">Canvas generative art</h1>

<section>
	<p>
		JS Canvas is a little tricky to get your head around at first but once you've got the basics
		down it's a lot of fun to play around.
	</p>
	<p>
		I've been working on some generative art code and one of the best decisions I made was to only
		use
		<em>predictable</em> random numbers throughout. This means that you can feed a single
		<em>seed</em> integer into the algorithm and you get the same artwork out each time. This is a really
		nice property of an algorithm if you're playing and debugging a lot and if you really need properly
		random numbers for production you can switch out the random numbers code later.
	</p>
	<p>
		I found this <a href="https://javascript.info/task/pseudo-random-generator"
			>pseudo-random number algorithm</a
		>
		online which produces numbers that jump about enough to look random, without actually being random
		at all. It implements the
		<a
			href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#generator_functions"
			>JS Generators</a
		> syntax, which is very handy.
	</p>
	<JSHighlight {code} />
</section>

<section>
	<h2>First generative art evolution</h2>
	<p>
		I haven't saved every version of the code each step of the way but I enjoy looking back through
		the renders to see how it's progressed over the hours. Enjoy!
	</p>

	<div class="gallery">
		{#each artworks as art}
			<img
				src="/posts/canvas-generative-art-202109/{art}"
				loading="lazy"
				width="256"
				height="256"
				alt="Generative art file {art}"
			/>
		{/each}
	</div>
</section>

<style>
	section {
		margin-bottom: 5rem;
	}

	.gallery {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	img {
		margin: 0.25em;
		border-radius: 0.25em;
		background: white;
	}
</style>
