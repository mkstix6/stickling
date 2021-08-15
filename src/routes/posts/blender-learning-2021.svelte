<script>
	import LogoSticker from '$lib/LogoSticker.svelte';
</script>

<article>
	<h1><LogoSticker logokey="blender" /> Blender learnin's</h1>
	<p>
		I've taken some time off in 2021 and I'm using some of it to get to grips with a little 3D
		modelling. 3D media is growing rapidly, on the web and accross the tech industry, and it's only
		going to become larger. In the near future I reckon we'll think of working with 3D files just
		like we work with videos and photos.
	</p>
	<p>
		Blender <LogoSticker logokey="blender" /> gets a lot of good publicity and it sounds like it has
		had a lot of recent development to make it easier than ever to get going with. Also it's completely
		free! I found some great tutorials online [link tutorial] and some fun demonstrations [link cool]
		of the new Blender features and I felt inspired to dive in.
	</p>
	<p>
		Ok so I'm going to note down the major terms and concepts I've come accross so far and I'll skip
		over the basics of navigating the 3D space, adding objects and other options in Blender. Other
		people have covered everything here in much better detail than I could with my current skills.
		I'm thinking of this article as a handy reference.
	</p>

	<section>
		<h2>First up…</h2>
		<ul>
			<li>Lights</li>
			<li>Surfaces and materials</li>
			<li>Physics collisions</li>
			<li>Environment surrounds HDRI (what's the proper name again?)</li>
			<li>reflections</li>
		</ul>

		<figure>
			<video controls loop src="/posts/blender-learning-2021/bouncymirror.mp4" alt="___ALT TEXT___"
				>Fallback text…</video
			>
			<figcaption>
				Some of my materials choices don't even start to emulate reality 😆; I haven't often seen a
				squishy chromed metal ball.
			</figcaption>
		</figure>
	</section>

	<section>
		<h2>Ghost ball</h2>
		<ul>
			<li>Transparency</li>
			<li>Emmitance lighting</li>
		</ul>
		<figure>
			<img src="/posts/blender-learning-2021/ghostpurple.png" alt="___ALT TEXT___" />
			<figcaption>Ghostly</figcaption>
		</figure>
	</section>

	<section>
		<h2>Ducky</h2>
		<figure>
			<img src="/posts/blender-learning-2021/ducky-og.jpeg" alt="___ALT TEXT___" class="portrait" />
			<figcaption>Here's our original subject.</figcaption>
		</figure>

		<figure>
			<img src="/posts/blender-learning-2021/pluckyducky-scan-image.jpeg" alt="___ALT TEXT___" />
			<figcaption>
				I decided to sketch ducky a couple of times to get a feeling for the personality and
				positioning of elements before I spent time animating in Blender. If I was more familiar
				with Blender at this point I'd try out the Blender Greecepencil tool for this step.
			</figcaption>
		</figure>

		<ul>
			<li>Displacement maps</li>
			<li>rigging</li>
			<li>keyframe animations.</li>
		</ul>
		<figure>
			<figcaption>RIG OF DUCKY SCREENSHOT</figcaption>
		</figure>

		<figure>
			<video
				controls
				loop
				src="/posts/blender-learning-2021/pluckyduckykicky.mp4"
				alt="___ALT TEXT___">Our ducky character kicking its feet.</video
			>
			<figcaption>Alright! First character done ✅.</figcaption>
		</figure>
	</section>

	<h2>What's next?</h2>
	<p>
		So clearly 😅 I'm in need of some more time understanding and using these skills but it's at
		about this point where I start to wonder which of these disciplines will work in the browser.
		Most likely I'm going to reach for the Three.js library when using 3D models on the web so I'm
		going to be limited by both Three's featureset as well as the normal web considerations such as
		performance and asset download size.
	</p>

	<aside>
		Links
		<ol>
			<li>https://apm-designs.com/blender/hdri-maps-realistic-lighting-blender/</li>
		</ol>
	</aside>
</article>

<style>
	h2 {
		clear: both;
	}
	figure {
		max-width: 30rem;
	}

	figcaption {
		display: block;
		width: 100%;
		text-align: left;
		font-size: 1rem;
		padding: 0.5em 0;
	}

	img,
	video {
		width: 30rem;
		height: auto;
		max-height: 20rem;
		object-fit: cover;
		border-radius: 0.5em;
	}
	img.portrait {
		width: auto;
		height: 20rem;
	}
</style>
