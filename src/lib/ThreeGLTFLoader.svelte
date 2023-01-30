<script>
	import * as THREE from 'three';
	import { browser } from '$app/environment';

	export let file;

	if (browser) {
		//////////////////////////
		const canvasSize = 1000;

		async function main() {
			const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
			const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
			const canvas = document.querySelector('#c');
			const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
			renderer.setClearColor(0x000000, 0); // transparent canvas
			const fov = 45;
			const aspect = 2; // the canvas default
			const near = 0.1;
			const far = 50;
			const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
			{
				camera.position.set(4, 0, 0);
				camera.aspect = canvasSize / canvasSize; //canvas.clientWidth / canvas.clientHeight;
				camera.updateProjectionMatrix();
			}

			const controls = new OrbitControls(camera, canvas);
			{
				controls.target.set(0, 0, 0);
				controls.update();
			}

			const scene = new THREE.Scene();

			{
				const skyColor = 0xb1e1ff; // light blue
				const groundColor = 0xb97a20; // brownish orange
				const intensity = 1;
				const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
				scene.add(light);
			}

			let light;
			{
				const color = 0xffffff;
				const intensity = 1;
				light = new THREE.DirectionalLight(color, intensity);
				light.position.set(0, 10, 0);
				light.target.position.set(-5, 0, 0);
				scene.add(light);
				scene.add(light.target);
			}

			{
				const gLTFLoader = new GLTFLoader();
				gLTFLoader.load(
					file,
					(gltf) => {
						scene.add(gltf.scene);
						requestAnimationFrame(render);
					},
					undefined,
					() => {
						throw new Error(`Error loading 3D file`);
					}
				);
			}

			function render() {
				const timer = Date.now() * 0.0005;
				const lightDistance = 1;
				const cameraDistance = 4;

				light.position.set(
					Math.sin(timer + 45) * lightDistance,
					0,
					Math.cos(timer + 45) * lightDistance
				);
				light.target.position.set(0, 0, 0);
				camera.position.x = Math.sin(timer) * cameraDistance;
				camera.position.z = Math.cos(timer) * cameraDistance;
				camera.lookAt(0, 0, 0);
				renderer.render(scene, camera);

				requestAnimationFrame(render);
			}
		}

		main();
	}
</script>

<!-- <svelte:head>
	<script id="fragment_shader1" type="x-shader/x-fragment">

		uniform float time;

		varying vec2 vUv;

		void main(void) {

			vec2 p = - 1.0 + 2.0 * vUv;
			float a = time * 40.0;
			float d, e, f, g = 1.0 / 40.0 ,h ,i ,r ,q;

			e = 400.0 * ( p.x * 0.5 + 0.5 );
			f = 400.0 * ( p.y * 0.5 + 0.5 );
			i = 200.0 + sin( e * g + a / 150.0 ) * 20.0;
			d = 200.0 + cos( f * g / 2.0 ) * 18.0 + cos( e * g ) * 7.0;
			r = sqrt( pow( abs( i - e ), 2.0 ) + pow( abs( d - f ), 2.0 ) );
			q = f / r;
			e = ( r * cos( q ) ) - a / 2.0;
			f = ( r * sin( q ) ) - a / 2.0;
			d = sin( e * g ) * 176.0 + sin( e * g ) * 164.0 + r;
			h = ( ( f + d ) + a / 2.0 ) * g;
			i = cos( h + r * p.x / 1.3 ) * ( e + e + a ) + cos( q * g * 6.0 ) * ( r + h / 3.0 );
			h = sin( f * g ) * 144.0 - sin( e * g ) * 212.0 * p.x;
			h = ( h + ( f - e ) * q + sin( r - ( a + h ) / 7.0 ) * 10.0 + i / 4.0 ) * g;
			i += cos( h * 2.3 * sin( a / 350.0 - q ) ) * 184.0 * sin( q - ( r * 4.3 + a / 12.0 ) * g ) + tan( r * g + h ) * 184.0 * cos( r * g + h );
			i = mod( i / 5.6, 256.0 ) / 64.0;
			if ( i < 0.0 ) i += 4.0;
			if ( i >= 2.0 ) i = 4.0 - i;
			d = r / 350.0;
			d += sin( d * d * 8.0 ) * 0.52;
			f = ( sin( a * g ) + 1.0 ) / 2.0;
			gl_FragColor = vec4( vec3( f * i / 1.6, i / 2.0 + d / 13.0, i ) * d * p.x + vec3( i / 1.3 + d / 8.0, i / 2.0 + d / 18.0, i ) * d * ( 1.0 - p.x ), 1.0 );
		}
	</script>
</svelte:head> -->

<canvas id="c" width="500" height="500" />

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
