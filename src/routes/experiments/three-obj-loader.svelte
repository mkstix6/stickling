<script>
	// import ThreeOBJLoader from '$lib/ThreeOBJLoader.svelte';
	import ThreeGLTFLoader from '$lib/ThreeGLTFLoader.svelte';
</script>

<!-- <ThreeOBJLoader file="/SticklingM.obj" /> -->

<div class="contain">
	<ThreeGLTFLoader file="/SticklingM4.glb" />
</div>

<style>
	.contain {
		width: 400px;
		height: 400px;
		margin: 10rem;
		border: 10px solid var(--card-backgroundcolor);
	}
</style>
