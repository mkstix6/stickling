<script lang="ts">
	import SocialIcon from '$lib/SocialIcon.svelte';

	type ArtWork = {
		title: string;
		date: string;
		localVideoSourceMP4: string;
		localVideoSourceWEBM: string;
		poster: string;
		instagramURL: string | null;
		codepenURL: string | null;
	};

	const artworks: ArtWork[] = [
		{
			title: 'Calibrating Webb',
			date: '15/02/2022',
			localVideoSourceWEBM: '/posts/code-art-2022/calibrating-webb.webm',
			localVideoSourceMP4: '/posts/code-art-2022/calibrating-webb.mp4',
			poster: '/posts/code-art-2022/posters/calibrating-webb.jpeg',
			instagramURL: 'https://www.instagram.com/p/CdA33uzD5XX/',
			codepenURL: 'https://codepen.io/mkstix6/pen/abVyGow',
		},
		{
			title: 'Dahlia Dance',
			date: '13/02/2022',
			localVideoSourceWEBM: '/posts/code-art-2022/dahliadance01.webm',
			localVideoSourceMP4: '/posts/code-art-2022/dahliadance01.mp4',
			poster: '/posts/code-art-2022/posters/dahliadance01.jpeg',
			instagramURL: 'https://www.instagram.com/p/CZ7qYaWrBz6/',
			codepenURL: 'https://codepen.io/mkstix6/details/KKyvvyN',
		},
		{
			title: 'Silver Ripple',
			date: '12/02/2022',
			localVideoSourceWEBM: '/posts/code-art-2022/silverripple.webm',
			localVideoSourceMP4: '/posts/code-art-2022/silverripple.mp4',
			poster: '/posts/code-art-2022/posters/silverripple.jpeg',
			instagramURL: 'https://www.instagram.com/p/CZ4_gXqD9R-/',
			codepenURL: 'https://codepen.io/mkstix6/pen/dyZzbVY',
		},
		{
			title: 'Hively',
			date: '11/02/2022',
			localVideoSourceWEBM: '/posts/code-art-2022/hively.webm',
			localVideoSourceMP4: '/posts/code-art-2022/hively.mp4',
			poster: '/posts/code-art-2022/posters/hively.jpeg',
			instagramURL: 'https://www.instagram.com/p/CZ2SUTFD-tq/',
			codepenURL: 'https://codepen.io/mkstix6/pen/ExbXvgE',
		},
		{
			title: 'Midnight Crystal Field',
			date: '10/02/2022',
			localVideoSourceWEBM: '/posts/code-art-2022/midnight-crystal-field.webm',
			localVideoSourceMP4: '/posts/code-art-2022/midnight-crystal-field.mp4',
			poster: '/posts/code-art-2022/posters/midnight-crystal-field.jpeg',
			instagramURL: 'https://www.instagram.com/p/CZzA7pXjOc8/',
			codepenURL: 'https://codepen.io/mkstix6/pen/dyZWPbr',
		},
		{
			title: 'Party Refraction',
			date: '07/02/2022',
			localVideoSourceWEBM: '/posts/code-art-2022/party-refraction.webm',
			localVideoSourceMP4: '/posts/code-art-2022/party-refraction.mp4',
			poster: '/posts/code-art-2022/posters/party-refraction.jpeg',
			instagramURL: 'https://www.instagram.com/p/CZsW8d-jtO9/',
			codepenURL: 'https://codepen.io/mkstix6/pen/NWwbOGm',
		},
		{
			title: 'Refraction Field',
			date: '07/02/2022',
			localVideoSourceWEBM: '/posts/code-art-2022/magicrefractionfield.webm',
			localVideoSourceMP4: '/posts/code-art-2022/magicrefractionfield.mp4',
			poster: '/posts/code-art-2022/posters/magicrefractionfield.jpeg',
			instagramURL: 'https://www.instagram.com/p/CZrk05xj5DF/',
			codepenURL: 'https://codepen.io/mkstix6/pen/wvPoRjX',
		},
		{
			title: 'Tree Growth',
			date: '26/01/2022',
			localVideoSourceWEBM: '/posts/code-art-2022/treegrowth.webm',
			localVideoSourceMP4: '/posts/code-art-2022/treegrowth.mp4',
			poster: '/posts/code-art-2022/posters/treegrowth.jpeg',
			instagramURL: 'https://www.instagram.com/p/CZNVEL7lSaR/',
			codepenURL: null,
		},
		{
			title: 'Snowflake Drift',
			date: '10/12/2021',
			localVideoSourceWEBM: '/posts/code-art-2022/snowflake-drift-20211210.webm',
			localVideoSourceMP4: '/posts/code-art-2022/snowflake-drift-20211210.mp4',
			poster: '/posts/code-art-2022/posters/snowflake-drift-20211210.jpeg',
			instagramURL: 'https://www.instagram.com/tv/CXUVR-KD1GW/',
			codepenURL: null,
		},
		{
			title: 'Grassy Green',
			date: '23/11/2021',
			localVideoSourceWEBM: '/posts/code-art-2022/grassy-green.webm',
			localVideoSourceMP4: '/posts/code-art-2022/grassy-green.mp4',
			poster: '/posts/code-art-2022/posters/grassy-green.jpeg',
			instagramURL: 'https://www.instagram.com/tv/CWn9NtZDdkK/',
			codepenURL: 'https://codepen.io/mkstix6/pen/ExvBYVK',
		},
		{
			title: 'Chromie Wiggly',
			date: '19/11/2021',
			localVideoSourceWEBM: '/posts/code-art-2022/chromiewigglyloop01.webm',
			localVideoSourceMP4: '/posts/code-art-2022/chromiewigglyloop01.mp4',
			poster: '/posts/code-art-2022/posters/chromiewigglyloop01.jpeg',
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
	{#each artworks as { title, date, localVideoSourceWEBM, localVideoSourceMP4, poster, instagramURL, codepenURL }}
		<li>
			<figure>
				<video preload="none" {poster} controls loop muted playsinline width="480" height="480">
					<source src={localVideoSourceWEBM} type="video/webm" />
					<source src={localVideoSourceMP4} type="video/mp4" />
					{title}
				</video>
				<figcaption>
					<div>
						<span>{title}</span>
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
