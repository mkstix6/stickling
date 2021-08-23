<script lang="ts">
	import SocialIcon from '$lib/SocialIcon.svelte';
	import { socialDetails } from '$lib/sitedata';

	const contactDetails = socialDetails.filter((item) => item.kind === 'contactInfo');
	const codeExamples = socialDetails.filter((item) => item.kind === 'codeExamples');
</script>

<svelte:head>
	<title>Contact Mark | Stickling.co.uk</title>
</svelte:head>

<main id="main">
	<div class="page" style="padding-top: 10vw;">
		<section class="section px3 py3">
			<h1>You can reach me here…</h1>
			<ul>
				{#each contactDetails as { handle, contactUrl, serviceDisplayCase, service }}
					<li>
						<a href={contactUrl}>
							<span class="icon">
								<SocialIcon {service} />
							</span>
							{handle || 'Mark'} on {serviceDisplayCase}
						</a>
					</li>
				{/each}
			</ul>
		</section>

		<aside class="section px3 py3">
			<h2>I upload code to these places</h2>
			<ul>
				{#each codeExamples as { handle, contactUrl, serviceDisplayCase, service }}
					<li>
						<a href={contactUrl}>
							<span class="icon">
								<SocialIcon {service} />
							</span>
							{handle || 'Mark'} on {serviceDisplayCase}
						</a>
					</li>
				{/each}
			</ul>
		</aside>

		<section class="section px3 py3">
			<h2>Face to face…</h2>
			<p>I live in London and can travel thoughout the city (national restrictions providing).</p>
		</section>
	</div>
</main>

<style>
	ul {
		list-style: none;
		padding-left: 0;
	}

	a {
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		background-color: var(--card-backgroundcolor);
		padding: 0.5em 1.5em;
		clip-path: polygon(1em 0, 100% 0, calc(100% - 1em) 100%, 0 100%);
	}

	.icon {
		display: inline-grid;
		place-items: center;
		font-size: 1.3em;
		margin-right: 0.45em;
		/* width: 2em; */
		/* height: 2em; */
		background-color: var(--card-backgroundcolor);
		border-radius: 3em;
	}
</style>
