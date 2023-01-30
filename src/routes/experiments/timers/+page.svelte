<script>
	import RingTimer from '$lib/RingTimer.svelte';

	let workoutSettings = [
		{ heading: 'Quick timer', onDuration: 10, offDuration: 5, loopStyle: 'single' },
		{ heading: 'Pushups', onDuration: 30, offDuration: 15, loopStyle: 'single' },
		{ heading: 'Plank', onDuration: 60, offDuration: 20, loopStyle: 'single' },
	];

	let pomodoroSettings = {
		heading: 'Pomodoro',
		onDuration: 1500,
		offDuration: 300,
		loopStyle: 'double',
	};
</script>

<main id="main" class="page--default">
	<h1>Timer component</h1>
	<h2>Workout timers</h2>
	<div class="workoutList">
		{#each workoutSettings as workout}
			<article>
				<h3>{workout.heading}</h3>
				<RingTimer {...workout} />
			</article>
		{/each}
	</div>

	<h2>Pomodoro timer</h2>
	<article>
		<RingTimer {...pomodoroSettings} />
	</article>
</main>

<style>
	.workoutList {
		display: grid;
		gap: 3rem;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		margin: 5rem 3rem;
	}
</style>
