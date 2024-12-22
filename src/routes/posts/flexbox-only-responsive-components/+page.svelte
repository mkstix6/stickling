<script>
	import SocialLink from '$lib/SocialLink.svelte';

	import CSSHighlight from '$lib/CSSHighlight.svelte';
	let code = `.container {
  display: flex;
  flex-wrap: wrap;
}

/* Fluid width on same row, full width on own row. */
.fluid-width {
  flex-grow: 99999; /* a big number */
  flex-shrink: 1; /* not zero */
  flex-basis: 400px; /* min-width */
}

/* Fixed width on same row, full width on own row. */
.fixed-width {
  flex-grow: 1; /* a small number but not zero */
  flex-shrink: 1; /* not zero */
  flex-basis: 300px; /* min-width */
}`;

	import { onMount } from 'svelte';
	onMount(() => {
		// Collect heading tag elements into an array (want to use Array.prototype.forEach() later).
		const widthObservers = [...document.querySelectorAll('.widthObserver')];
		// Setup (once).
		widthObservers.forEach((heading) => {
			const child = document.createElement(`span`);
			child.classList.add('sizemeasure');
			heading.appendChild(child);
		});
		// Trigger measurement.
		measurewidthObservers();
		// …and when the window resizes.
		window.onresize = function () {
			measurewidthObservers();
		};
		// Run each time we want to update the measurement displayed.
		function measurewidthObservers() {
			widthObservers.forEach((heading) => {
				const elemwidth = heading.offsetWidth;
				heading.querySelector('.sizemeasure').innerHTML = ` : ${elemwidth}px`;
			});
		}
	});
</script>

<h1 class="angletext">Flexbox for responsive components, without media queries</h1>
<aside class="card">
	<p>
		I wrote this before CSS Container Queries had been given the green light by the powers that be.
		If you're reading in a year where Container Queries have become ubiquitous (I'm jelous) this
		post may only be interesting as a snapshot in history. But in 2021 I still use this technique
		occasionally.
	</p>
</aside>

<section class="my3">
	<h2>TL;DR</h2>
	<CSSHighlight {code} />
</section>

<p>Using flexbox to make responsive widgets without media queries.</p>
<p>
	With one fixed width column (unless its on its own row) [in <span class="fixed-color"
		>dark blue</span
	>].
</p>
<p>
	Allows for widget layout where parts of the widget have minimum widths and <strong
		>when&hellip;:</strong
	>
</p>
<ol>
	<li>
		<strong>&hellip;we don't know</strong> the placement of the widget on a page: whether the widget
		would be in a main column or a side column
	</li>
	<li><strong>&hellip;we don't know</strong> the width of the viewport, ever.</li>
	<li><strong>&hellip;we don't know</strong> which pre-existing media queries exist</li>
</ol>

<h2>Various width containers</h2>
<p>
	Example use case <a href="https://codepen.io/mkstix6/pen/jPxMje"
		>Flexbox responsive sign up widget. No media queries</a
	>
</p>
<h2>Pros</h2>
<ul>
	<li>No media queries</li>
	<li>Items can be set to wrap when they reach their minimum width.</li>
</ul>
<h2>Cons</h2>
<ul>
	<li>
		Predicting exactly when [viewport width] something will wrap is tricky (math!). E.g. when
		something wraps, you also want a different text size (this is a P.I.T.A. to achieve without
		media queries to orchestrate changes to properties other than width).
	</li>
</ul>

<p><em>Change your browser window width to get a feel for how this is responsive.</em></p>

<div class="widthObserver column100">Container 100% width</div>
<div class="container column100">
	<div class="fluidWidthDownToAPoint"></div>
	<div class="fixedUnlessOnOwnRow"></div>
</div>

<div class="widthObserver column80">Container 80% width</div>
<div class="container column80">
	<div class="fluidWidthDownToAPoint"></div>
	<div class="fixedUnlessOnOwnRow"></div>
</div>

<div class="widthObserver column60">Container 60% width</div>
<div class="container column60">
	<div class="fluidWidthDownToAPoint"></div>
	<div class="fixedUnlessOnOwnRow"></div>
</div>

<!-- <div class="widthObserver column40">Container 40% width</div>
<div class="container column40">
	<div class="fluidWidthDownToAPoint"></div>
	<div class="fixedUnlessOnOwnRow"></div>
</div>

<div class="widthObserver column20">Container 20% width</div>
<div class="container column20">
	<div class="fluidWidthDownToAPoint"></div>
	<div class="fixedUnlessOnOwnRow"></div>
</div> -->

<hr />

<h3>Nesting the HTML</h3>
<div class="container">
	<div class="fluidWidthDownToAPoint">
		<div class="container">
			<div class="fluidWidthDownToAPoint"></div>
			<div class="fixedUnlessOnOwnRow"></div>
		</div>
	</div>
	<div class="fixedUnlessOnOwnRow">
		<div class="container">
			<div class="fluidWidthDownToAPoint"></div>
			<div class="fixedUnlessOnOwnRow"></div>
		</div>
	</div>
</div>

<aside class="py3">
	<SocialLink href="https://codepen.io/mkstix6/pen/dPmYvV" service="codepen"
		>I originally wrote this on CodePen</SocialLink
	>
</aside>

<style>
	/* ///////////////// interesting flexbox bits ///////////////////////// */
	.container {
		display: flex;
		flex-wrap: wrap;
	}
	.fluidWidthDownToAPoint {
		flex-grow: 999999; /* a relatively big number: needed for OTHER column to be fixed width // if it's too big IE fails to compute */
		flex-shrink: 1; /* Allows this to shrink below flex-basis if forced to by small container. */
		flex-basis: 400px; /* its natural min-width */
	}
	.fixedUnlessOnOwnRow {
		flex-grow: 1; /* a relatively small number: needed for THIS column to be fixed width. Not "0" so it will also fill to expand a row if it is on it's own in the row. */
		flex-shrink: 1; /* Allows this to shrink below flex-basis if forced to by small container. */
		flex-basis: 300px; /* its natural min-width. */
	}

	/* ///////////////// stylings ///////////////////////// */

	.fluidWidthDownToAPoint {
		background: rgba(#00ffb4, 0.4);
		padding: 20px;
		box-sizing: border-box;
		&::before {
			display: block;
			margin-bottom: 1em;
			content: 'Fluid width down to 400px, then 100% width when on own row.';
		}
		&:empty::before {
			margin-bottom: 0;
		}
	}
	.fixedUnlessOnOwnRow {
		color: white;
		background: rgba(#06006d, 0.5);
		padding: 20px;
		box-sizing: border-box;
		&::before {
			display: block;
			margin-bottom: 1em;
			color: white;
			content: 'Fixed width of 300px unless on own row. Width 100% when on own row.';
		}
		&:empty::before {
			margin-bottom: 0;
		}
	}

	.fixed-color {
		color: white;
		padding: 0 0.2em;
		border-radius: 0.45em;
		background-color: rgba(#06006d, 0.5);
	}

	hr {
		opacity: 0.5;
		font-size: 8px;
		border: none;
		height: 0.5em;
		width: 100%;
		display: block;
		background-color: transparent;
		background-image: radial-gradient(
			circle at center center,
			white,
			white 0.25em,
			transparent 0.25em,
			transparent
		);
		background-repeat: repeat-x;
		background-size: 0.75em 0.5em;
		margin-top: 40px;
		margin-bottom: 40px;
	}

	.widthObserver {
		text-align: center;
		margin-top: 1em;
		margin-bottom: 1em;
		color: inherit;
		margin-left: auto;
		margin-right: auto;
		position: relative;
		border-bottom: 1px solid currentColor;
		opacity: 0.8;
		&:after {
			box-shadow:
				inset 1px 0 0 currentColor,
				inset -1px 0 0 currentColor;
			content: '';
			display: block;
			position: absolute;
			height: 100%;
			top: 50%;
			left: 0;
			right: 0;
		}
	}

	.container {
		box-sizing: border-box;
		background: rgba(white, 0.9);
		background: transparent;
		border: 1px solid rgba(black, 0.1);
		border: 2px solid white;
		border: none;
		/*box-shadow:inset 0 0 0 10px rgba(white,1);*/
		box-shadow: 0 0 0 0.2em white;
		border-radius: 1em;
		overflow: hidden;
		margin-left: auto;
		margin-right: auto;
		padding: 1px;
	}
	.container .container {
		border-radius: 0.5em;
	}
	.column100 {
		width: 100%;
	}
	.column80 {
		width: 80%;
	}
	.column60 {
		width: 60%;
	}

	aside {
		display: inline-block;
	}
</style>
