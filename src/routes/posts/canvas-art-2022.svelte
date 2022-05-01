<script lang="ts">
	import SocialIcon from '$lib/SocialIcon.svelte';

	type ArtWork = {
		title: string;
		date: string;
		localVideoSource: string;
		instagramURL: string;
		codepenURL: string;
	};

	const artworks: ArtWork[] = [
		{
			title: 'Calibrating Webb',
			date: '15/02/2022',
			localVideoSource: '/posts/code-art-2022/calibrating-webb.mp4',
			instagramURL: 'https://www.instagram.com/p/CdA33uzD5XX/',
			codepenURL: 'https://codepen.io/mkstix6/pen/abVyGow',
		},
		{
			title: 'Dahlia Dance',
			date: '13/02/2022',
			localVideoSource: '/posts/code-art-2022/dahliadance01.mp4',
			instagramURL: 'https://www.instagram.com/p/CZ7qYaWrBz6/',
			codepenURL: 'https://codepen.io/mkstix6/details/KKyvvyN',
		},
		{
			title: 'Silver Ripple',
			date: '12/02/2022',
			localVideoSource: '/posts/code-art-2022/silverripple.mp4',
			instagramURL: 'https://www.instagram.com/p/CZ4_gXqD9R-/',
			codepenURL: 'https://codepen.io/mkstix6/pen/dyZzbVY',
		},
		{
			title: 'Hively',
			date: '11/02/2022',
			localVideoSource: '/posts/code-art-2022/hively.mp4',
			instagramURL: 'https://www.instagram.com/p/CZ2SUTFD-tq/',
			codepenURL: 'https://codepen.io/mkstix6/pen/ExbXvgE',
		},
		{
			title: 'Midnight Crystal Field',
			date: '10/02/2022',
			localVideoSource: '/posts/code-art-2022/midnight-crystal-field.mp4',
			instagramURL: 'https://www.instagram.com/p/CZzA7pXjOc8/',
			codepenURL: 'https://codepen.io/mkstix6/pen/dyZWPbr',
		},
		{
			title: 'Party Refraction',
			date: '07/02/2022',
			localVideoSource: '/posts/code-art-2022/party-refraction.mp4',
			instagramURL: 'https://www.instagram.com/p/CZsW8d-jtO9/',
			codepenURL: 'https://codepen.io/mkstix6/pen/NWwbOGm',
		},
		{
			title: 'Refraction Field',
			date: '07/02/2022',
			localVideoSource: '/posts/code-art-2022/magicrefractionfield.mp4',
			instagramURL: 'https://www.instagram.com/p/CZrk05xj5DF/',
			codepenURL: 'https://codepen.io/mkstix6/pen/wvPoRjX',
		},
		{
			title: 'Tree Growth',
			date: '26/01/2022',
			localVideoSource: '/posts/code-art-2022/treegrowth.mp4',
			instagramURL: 'https://www.instagram.com/p/CZNVEL7lSaR/',
			codepenURL: null,
		},
		{
			title: 'Snowflake Drift',
			date: '10/12/2021',
			localVideoSource: '/posts/code-art-2022/snowflake-drift-20211210.mp4',
			instagramURL: 'https://www.instagram.com/tv/CXUVR-KD1GW/',
			codepenURL: null,
		},
		{
			title: 'Chromie Wiggly',
			date: '19/11/2021',
			localVideoSource: '/posts/code-art-2022/chromiewigglyloop01.mp4',
			instagramURL: null,
			codepenURL: null,
		},
	];
</script>

<h1>Canvas Art 2022</h1>

<p>
	I spent some time in late 2021 and early 2022 learning the Javascript Canvas API. Mostly I played
	with colors and shapes, looping and interactive animations. Here are some of my favourites. Most
	have a CodePen version; some I developed on my local machine.
</p>

<ul>
	{#each artworks as { title, date, localVideoSource, instagramURL, codepenURL }}
		<li>
			<figure>
				<video src={localVideoSource} autoplay loop muted width="480" height="480" />
				<figcaption>
					<div>
						<span>{title} {date}</span>
					</div>
					<div>
						{#if instagramURL}
							<a href={instagramURL}><SocialIcon service="instagram" /></a>
						{/if}
						{#if codepenURL}
							<a href={codepenURL}><SocialIcon service="codepen" /></a>
						{/if}
					</div>
				</figcaption>
			</figure>
		</li>
	{/each}
</ul>

<style scoped>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		/* This is better for small screens, once min() is better supported */
		/* grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr)); */
		gap: 1rem;

		list-style: none;
	}

	figure {
		display: block;
		margin: 0;
	}

	figure video {
		display: block;
		margin: 0;
		aspect-ratio: 1 / 1;
	}

	figcaption {
		display: block;
		width: 100%;
		text-align: left;
		font-size: 14px;
		/* opacity: 0.3; */
		transition: opacity 1000ms;
		padding: 0.5em 0;
	}

	figcaption:hover,
	figcaption:focus {
		opacity: 1;
		transition: opacity 200ms;
	}

	figcaption a {
		text-decoration: none;
	}
</style>
