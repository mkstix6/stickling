<script>
	import LogoSticker from '$lib/LogoSticker.svelte';
	import ThreeGLTFLoader from '$lib/ThreeGLTFLoader.svelte';
</script>

<article>
	<h1><LogoSticker logokey="three" /> 3D M logo</h1>

	<section>
		<figure class="gallery">
			<div>
				<div class="threecontainer">
					<ThreeGLTFLoader file="/SticklingM4.glb" />
				</div>
			</div>
			<figcaption style="max-width: 20em;">
				Try dragging the logo up and down …it's a little bit interactive. I have more to learn about
				setting up the code to control 3D assets.
			</figcaption>
		</figure>
		<div class="text-content">
			<p>
				Ultimately my main reason for learning <LogoSticker logokey="blender" /> Blender is to more easily
				create interactive 3D experiences on the web. As a first trial I created this version of my logo
				in <LogoSticker logokey="blender" /> Blender and export it as a <em>.glb</em> file. Then, by
				using a library called <LogoSticker logokey="three" /> Three.js I load the model into the browser.
			</p>
			<p>
				This workflow avoids the tedious work of building 3D elements with pure code whilst still
				giving the developer amazing control over how the model should look and behave. In this case
				I've set the camera to orbit around but nearly anything is possible.
			</p>
			<p>
				Naturally, loading 3D assets this way takes more processing power than rendering the 3D
				objects to a video and showing that instead but if the model isn't too complicated you gain
				the possibility of user interaction without taxing the user's machine too much. Modern
				smartphones are easily able to deal with 3D but it's worth remembering that your users may
				not all have the latest iPhone in their pocket.
			</p>
		</div>
	</section>
</article>

<style>
	section {
		display: flex;
		flex-wrap: wrap;
	}
	figure {
		flex: 1 0 200px;
		background: var(--card-backgroundcolor);
		padding: 1em;
	}
	.text-content {
		flex: 1 0 280px;
	}
	figcaption {
		font-size: smaller;
	}
</style>
