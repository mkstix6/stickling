<script>
	import LogoSticker from '$lib/LogoSticker.svelte';
	import ThreeGLTFLoader from '$lib/ThreeGLTFLoader.svelte';
</script>

<article>
	<h1><LogoSticker logokey="blender" /> Blender learnin's</h1>
	<section>
		<figure class="gallery" style="float: right;">
			<div>
				<div class="threecontainer">
					<ThreeGLTFLoader file="/SticklingM4.glb" />
				</div>
				<figcaption style="max-width: 20em;">
					I'm using the Three.js <LogoSticker logokey="three" /> library to bring this model into the
					browser
				</figcaption>
			</div>
		</figure>
		<p>
			I've taken some time off in 2021 and I'm using some of it to get to grips with a little 3D
			modelling. 3D media is growing rapidly, on the web and accross the tech industry and in the
			near future as web developers I reckon be working with 3D files just like we work with videos
			and photos.
		</p>
		<p>
			Blender <LogoSticker logokey="blender" /> gets a lot of good publicity and it sounds like it has
			had a lot of recent development to make it easier than ever to get going with. Also it's completely
			free! I found some great tutorials online [link tutorial] and some fun demonstrations [link cool]
			of the new Blender features and I felt inspired to dive in.
		</p>
		<p>
			Ok so I'm going to note down the major terms and concepts I've come accross so far and I'll
			skip over the basics of navigating the 3D space, adding objects and other options in Blender.
			Other people have covered everything here in much better detail than I could with my current
			skills. I'm thinking of this article as a handy reference.
		</p>
	</section>

	<section>
		<h2>First up…</h2>
		<ul>
			<li>Meshes</li>
			<li>Materials</li>
			<li>Shaders</li>
			<li>Lights</li>
			<li>Physics collisions</li>
			<li>Environment surrounds HDRI (what's the proper name again?)</li>
			<li>reflections</li>
		</ul>
		<div class="gallery">
			<figure>
				<video
					controls
					loop
					src="/posts/blender-learning-2021/bouncymirror.mp4"
					alt="A physics simulation of some objects bouncing and colliding"
					>A physics simulation of some objects bouncing and colliding</video
				>
				<figcaption>
					Some of my materials choices don't even start to emulate reality 😆; I haven't often seen
					a squishy chromed metal ball.
				</figcaption>
			</figure>
		</div>
	</section>

	<section>
		<h2>Ghost ball</h2>
		<ul>
			<li>Transparency</li>
			<li>Emmitance lighting</li>
		</ul>
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
		<dl>
			<dt>Displacement maps</dt>
			<dd>
				Making very detailed meshes can be a lot of work. One tool we have at our disposal to help
				with this are displacement maps. These can allow us to reduce the number of vertices and
				polygons we need in our mesh.
			</dd>
		</dl>
		<div class="gallery">
			<figure>
				<img
					controls
					loop
					src="/posts/blender-learning-2021/FoldsSurface2021081702-transparent1000.png"
					alt="a deformed sphere with a blue metallic material"
				/>
				<figcaption>
					Using generated noise to create a displacement map to deform a blue metallic sphere
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
					Using generated noise to displace a white ceramic sphere with kintsugi effect
				</figcaption>
			</figure>
		</div>
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
					Working with tools you already know can help speed you along when you're learning.
				</figcaption>
			</figure>
		</div>
		<dl>
			<dt>Keyframe animations</dt>
			<dd>
				We have keyframe animations in CSS with the <code>@keyframe</code> which really helps understand
				working with them in 3D. In CSS I often write keyframe code myself and set a duration but in
				3D it's convenient to move objects or a character rig in the 3D viewer, then snapshot that position
				as a keyframe. Blender handles the transitions between the keyframes much like in CSS.
			</dd>

			<dt>Rigging</dt>
			<dd>
				Particularly useful for animating characters but can be used to assist any object with
				moving parts. It's like setting up a skeleton; each part of a rig is even called a <em
					>'bone'</em
				>. A whole skeleton is known as an armature.
			</dd>
		</dl>
		<div class="gallery">
			<figure>
				<img
					controls
					loop
					src="/posts/blender-learning-2021/ducky-rig.png"
					alt="A simple bone rig of a ducky model"
				/>
				<figcaption>A simple bone rig</figcaption>
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
		</div>
	</section>

	<section>
		<h2>What's next?</h2>
		<p>
			So clearly 😅 I'm in need of some more time understanding and using these skills but it's at
			about this point where I start to wonder which of these disciplines will work in the browser.
			Most likely I'm going to reach for the Three.js library when using 3D models on the web so I'm
			going to be limited by both Three's featureset as well as the normal web considerations such
			as performance and asset download size.
		</p>
	</section>

	<aside>
		Links
		<ol>
			<li>https://apm-designs.com/blender/hdri-maps-realistic-lighting-blender/</li>
		</ol>
	</aside>
</article>

<style lang="scss">
	h2 {
		clear: both;
	}

	figcaption {
		display: block;
		text-align: left;
		font-size: 1rem;
		padding: 0.5em 0;
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
			width: min-content;
		}
	}

	.threecontainer {
		width: 40vw;
		height: 40vw;
	}
</style>
