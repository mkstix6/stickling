<script>
	import LogoSticker from '$lib/LogoSticker.svelte';
</script>

<header>
	<h1 class="angletext">Brandirectory website build</h1>
	<a class="sitelink button" href="https://brandirectory.com"><code>brandirectory.com</code></a>
	<div style="display: flex; align-items: baseline; font-size: 3em;">
		<LogoSticker logokey="vue" />
		<LogoSticker logokey="nuxt" />
	</div>
</header>

<div class="articlecols">
	<div>
		<p>
			Brandirectory was an exciting and challenging project I worked on between 2019 and 2021 at my
			previous agency job.
		</p>
		<p>
			Our client had lots of numerical data they wanted to display to their customers using charts
			and graphs alongside interactive tables.
		</p>
		<p>
			<strong class="gradient">
				I primarily wrote the front-end code using <LogoSticker logokey="vue" /> Vue.js and the <LogoSticker
					logokey="nuxt"
				/> Nuxt.js framework.
			</strong>
			Data was communicated via REST APIs we collaboratively designed. My colleagues built the APIs over
			a Laravel PHP backend.
		</p>
		<p>
			We found the app <LogoSticker logokey="postman" /> Postman especially useful for developing the
			REST APIs. Postman allowed us to plan the response contract, write JSON schema to match the plan,
			then consistently test our APIs as the number of APIs grew.
		</p>
	</div>

	<div>
		<div class="imgcontainer">
			<img
				src="/posts/brandirectory-screenshot1.png"
				width="131"
				height="93"
				alt="Brandirectory.com homepage"
			/>
		</div>
		<div class="imgcontainer">
			<img
				src="/posts/brandirectory-screenshot3.png"
				width="131"
				height="93"
				alt="Various data offerings on Brandirectory.com"
			/>
		</div>
		<div class="imgcontainer">
			<img
				src="/posts/brandirectory-screenshot2.png"
				width="131"
				height="93"
				alt="Bar charts and doughnut charts on Brandirectory.com"
			/>
		</div>
	</div>
</div>

<style>
	.sitelink {
		margin: 1rem 0;
	}

	.articlecols {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	@media screen and (max-width: 600px) {
		.articlecols {
			display: block;
		}
	}

	.imgcontainer {
		--imgrotation: 15deg;
		perspective: 1000px;
	}
	.imgcontainer:nth-child(odd) img {
		transform: rotateY(calc(-1 * var(--imgrotation)));
	}
	.imgcontainer:nth-child(even) img {
		transform: rotateY(var(--imgrotation));
	}
	.imgcontainer img:focus,
	.imgcontainer img:hover {
		transform: rotateY(0deg);
	}

	img {
		max-width: 100%;
		width: 100%;
		height: auto;
		display: block;
		transition: transform 600ms;
	}
</style>
