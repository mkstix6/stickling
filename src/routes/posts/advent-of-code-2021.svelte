<script>
	import LogoSticker from '$lib/LogoSticker.svelte';
	import ImageLean from '$lib/ImageLean.svelte';
	import SocialLink from '$lib/SocialLink.svelte';
</script>

<div class="page page--post">
	<header>
		<h1>
			Advent of code 2021<br />
			<LogoSticker logokey="python" />
		</h1>
		<p>
			<a href="https://adventofcode.com/2021">Advent of Code 2021</a>
		</p>
	</header>
	<div class="articlecols">
		<div>
			<p>
				This year's Advent of Code story was about exploring a deep ocean trench in a mini-submarine
				and solving problems with the instruments and navigation as you diver deeper and deeper.
			</p>
			<p>
				This year I decided to break from my JavaScript day-to-day and attempt every puzzle using <LogoSticker
					logokey="python"
				/> <strong>Python</strong>:
			</p>
			<ul>
				<li>I practiced a lot of data manipulation in Python.</li>
				<li>
					Learned how to use List Comprehensions where I would usually reach for JavaScript
					<code>Array.prototype.map()</code>
				</li>
				<li>
					Unerstood that I had to import reduce rather than relying on it just being there as in
					JavaScript.
				</li>
				<li>
					Used a Lambda function or two which <em>feel</em> a lot like JavaScript Arrow Functions.
				</li>
				<li>
					Figured out basic unit-testing in Python. As Python's <code>unittest</code> is readily importable
					this was much nicer than the JavaScript experience of having to decide which of many test runners
					to choose.
				</li>
			</ul>
			<p>
				I managed a score of <span class="adventYellow">21*</span>. A little better than last year.
				Looking forward to completing every star one year 💪.
			</p>
		</div>
		<div>
			<div class="mb2">
				<ImageLean
					src="/posts/adventofcodeasciicodeart2021.png"
					width={1334}
					height={1254}
					alt="The Advent of Code 2021 website front page ASCII code art"
					frame={true}
				/>
			</div>
			<div>
				<SocialLink href="https://github.com/mkstix6/adventofcode2021" service="github"
					>My GitHub repository for Advent of Code 2021.</SocialLink
				>
			</div>
		</div>
	</div>
</div>

<style>
	.adventYellow {
		color: #ffff66;
	}
</style>
