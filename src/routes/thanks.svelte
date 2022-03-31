<section class="section slice px3 py5">
	<h2 class="angletext">📣 Shoutouts and thanks 🙏</h2>
	<ul class="thankslist">
		<li class="card">
			Recently I've been enjoying the <a href="https://cassidoo.co/newsletter/"
				>Rendezvous with Cassidoo</a
			>
			newsletter by <a href="https://twitter.com/cassidoo">@cassidoo</a>. The weekly code challenge
			is especially good to participate in.
		</li>
		<li class="card">
			The GSAP forum has been very helpful answering my questions about keyframing many items.
		</li>
		<li class="card">…and my wonderful partner Sarah.</li>
	</ul>
</section>

<style lang="scss">
	.thankslist {
		list-style: none;
		display: grid;
		// grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		grid-auto-flow: dense;
		gap: 1rem 2rem;
	}
</style>
