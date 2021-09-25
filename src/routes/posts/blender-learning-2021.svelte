<script>
	import LogoSticker from '$lib/LogoSticker.svelte';
	import ThreeGLTFLoader from '$lib/ThreeGLTFLoader.svelte';
</script>

<article>
	<h1 class="angletext"><LogoSticker logokey="blender" /> Blender learnin's</h1>
	<section>
		<p>
			I've taken time off in 2021 and I'm using some of it to get to grips with a little 3D
			modelling.
		</p>
		<p>
			3D media is growing rapidly, on the web and accross the tech industry and in the near future
			as web developers I reckon be working with 3D files just like we work with videos and photos.
		</p>
		<p>
			<strong
				><a href="https://www.blender.org"><LogoSticker logokey="blender" /> Blender</a></strong
			>
			gets a lot of good publicity and it sounds like it has had a lot of recent development to make
			it easier than ever to get going with. Also it's completely free! I found some great tutorials
			online [link tutorial] and some fun demonstrations [link cool] of the new Blender features and
			I felt inspired to dive in.
		</p>
	</section>

	<section>
		<p>
			Blender provides many tools for creating 3D objects and animations. Here are a few I've found
			useful so far (there are many, many, more).
		</p>

		<ul class="wordcloud">
			<li>Mesh</li>
			<li>Materials</li>
			<li>Shaders</li>
			<li>Lights</li>
			<li>Physics simulations</li>
			<li>HDRI Environment Backgrounds</li>
			<li>Reflections</li>
			<li>Transparency</li>
			<li>Emmitance lighting</li>
			<li>Displacement maps</li>
			<li>Keyframe animations</li>
			<li>Rigging</li>
		</ul>
	</section>
	<section>
		<p>
			Playing with materials, HDRI backgrounds, reflections, soft-body simulations. You can see the
			orange ball doesn't reflect properly whilst rolling.
		</p>
		<div class="gallery">
			<figure>
				<video
					controls
					loop
					muted
					playsinline
					src="/posts/blender-learning-2021/bouncymirror.mp4"
					alt="A physics simulation of some objects bouncing and colliding"
					>A physics simulation of some objects bouncing and colliding</video
				>
				<figcaption>
					I haven't often seen a squishy chromed metal ball but that's the fun and challenge of
					tools like Blender, you can create anything you like.
				</figcaption>
			</figure>
		</div>
	</section>

	<section>
		<h2>Ghost ball</h2>
		<p>Using emission & transmission.</p>
		<div class="gallery">
			<figure>
				<img
					src="/posts/blender-learning-2021/ghostpurple.png"
					alt="A ghostly orb of fire floating against a purple backdrop"
				/>
				<figcaption>A ghostly orb of fire floating against a purple backdrop</figcaption>
			</figure>
		</div>
	</section>

	<section>
		<h2>Displacement orbs</h2>
		<p>
			It may not look like it but for each of the objects below the mesh is a perfect sphere but
			with a displacement map applied. Usually displacement maps are used to create small bumps and
			dips on objects but here the same technique has been pushed to the extreme to produce heavily
			distorted alien looking objects.
		</p>
		<p>
			Thanks to <a href="https://www.youtube.com/watch?v=xoKdneGFXnE">Chris P's tutorial</a> for teaching
			me to create these.
		</p>
		<div class="gallery">
			<figure>
				<img
					controls
					loop
					src="/posts/blender-learning-2021/FoldsSurface2021081702-transparent1000.png"
					alt="a deformed sphere with a blue metallic material"
				/>
				<figcaption>
					Using noise to create a displacement map to deform a blue metallic sphere
				</figcaption>
			</figure>
			<figure>
				<img
					controls
					loop
					src="/posts/blender-learning-2021/FoldsSurfaceCeramic2021082201.png"
					alt="a deformed sphere with a white ceramic material with kintsugi effect"
				/>
				<figcaption>
					Using noise to displace a white ceramic sphere with added kintsugi effect
				</figcaption>
			</figure>
		</div>
		<p>
			<small
				><em>Note:</em> this is one of the cases where your choice of rendering engine within Blender
				makes a dramatic difference. Initially I'd selected the Eevee rendering engine but the displacement
				maps didn't do anything. As soon as I switched to the Cycles engine it all came together.</small
			>
		</p>
	</section>

	<section>
		<h2>Ducky</h2>
		<p>
			I decided to sketch ducky a couple of times to get a feeling for the personality and
			positioning of elements before I spent time animating in Blender. If I was more familiar with
			Blender at this point I'd try out the Blender Greecepencil tool for this step.
		</p>
		<div class="gallery">
			<figure>
				<img
					src="/posts/blender-learning-2021/ducky-og.jpeg"
					alt="___ALT TEXT___"
					class="portrait"
				/>
				<figcaption>Here's our original subject.</figcaption>
			</figure>
			<figure>
				<img src="/posts/blender-learning-2021/pluckyducky-scan-image.jpeg" alt="___ALT TEXT___" />
				<figcaption>
					Working with tools you already know, like pen and paper, can help speed you along when
					you're learning.
				</figcaption>
			</figure>
		</div>

		<div class="gallery">
			<figure>
				<img
					controls
					loop
					src="/posts/blender-learning-2021/ducky-rig.png"
					alt="A bone rig of a ducky model"
				/>
				<figcaption>A bone rig</figcaption>
			</figure>
			<figure>
				<video
					controls
					loop
					muted
					playsinline
					src="/posts/blender-learning-2021/pluckyduckykicky.mp4"
					alt="___ALT TEXT___">Our ducky character kicking its feet.</video
				>
				<figcaption>Alright! First character done 🦆.</figcaption>
			</figure>
		</div>
	</section>

	<section>
		<h2>What's next?</h2>
		<p>
			I've got a ways to go with learning Blender but at the end of the day I'm a web developer so
			next I'm going to play with loading 3D assets into the browser. I'll probably reach for the
			<LogoSticker logokey="three" /> Three.js library and I'm going to be limited by both Three's featureset
			as well as the normal web considerations such as performance and asset download size.
		</p>
	</section>
</article>

<style lang="scss">
	h2 {
		clear: both;
	}

	section {
		margin-bottom: 5rem;
	}

	figcaption {
		display: block;
		text-align: left;
		font-size: 1rem;
		padding: 0.5em 0;
		max-width: 35em;
	}

	img,
	video {
		width: auto;
		height: auto;
		max-height: 20rem;
		object-fit: cover;
		border-radius: 0.5em;
	}

	img.portrait {
		width: auto;
		height: 20rem;
	}

	.gallery {
		background: var(--card-backgroundcolor);
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		gap: 1.5rem;
		margin: 1.5em 0;

		figure {
			margin: 0;
		}
	}

	.threecontainer {
		width: 40vw;
		height: 40vw;
	}

	.wordcloud {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: center;
		list-style: none;
		padding-left: 0;

		li {
			margin: 0.5em;
			background: var(--card-backgroundcolor);
			border-radius: 0.5em;
			padding: 0.5em 1em;
			font-weight: 600;
			letter-spacing: 0.1em;

			&:nth-child(odd) {
				position: relative;
				// top: -1em;
			}
		}
	}
</style>
