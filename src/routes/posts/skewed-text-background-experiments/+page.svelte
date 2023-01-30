<script>
	import SocialLink from '$lib/SocialLink.svelte';

	import CSSHighlight from '$lib/CSSHighlight.svelte';

	let codeA = `em {
  display: inline-block;
  font-style: normal;
  position: relative;
  transform: skewX(-10deg);
  
  border-radius: 0.2em;
  background: var(--gradient);
  padding: 0.1em 0.3em;
}`;

	let codeB = `
em {
  font-style: normal;
  padding: 0.1em 0.3em;
  position: relative;
  display: inline-block;
}

em::after {
  content: '';
  position: absolute;
  background: var(--gradient);
  inset: 0;
  z-index: -1;
  border-radius: 0.2em;
  transform: skewX(-10deg);
}
`;

	let codeC = `
em {
  font-style: normal;
  position: relative;
  display: inline;
  box-decoration-break: clone;
  padding: 0.1em 0.2em;
  border-radius: 0.2em;
  background: white;
  background: $g1;
  transform: skewX(-10deg);
  /* transform skew is ignored
    on inline elements
    (in Webkit at least). */
}	
`;

	let codeD = `
em {
  display: inline-block;
  font-style: normal;
  padding: 0.1em 0.3em;
  border-radius: 0.2em;
  position: relative;
  background: white;
  background: $g1;
  transform: skewX(-10deg);
}

em span {
  display: inline-block;
  transform: skewX(10deg);
}
`;

	let codeE = `
em {
  font-style: normal;
  padding: 0.1em 0;
  margin-left: 0.5em;
  margin-right: 0.5em;
  position: relative;
  background: var(--gradient);
  display: inline-block;
}

em::before,
em::after {
  content: '';
  border-radius: 0.2em;
  background: white;
  display: inline-block;
  width: 1em;
  transform: skewX(-10deg);
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: -1;
}

em::before {
  left: -0.3em;
  background: var(--color1);
}

em::after {
  right: -0.3em;
  background: var(--color2);
}
`;
</script>

<h1 class="angletext">CSS attempts at text with inline skewed background</h1>
<p>
	I've been looking for a reliable way to add a styalised background behind strings of text. It
	would allow more stylalised designs for emphasis tags such as <code>&lt;em&gt;</code> and
	<code>&lt;strong&gt;</code>.
</p>

<h2>Notes:</h2>
<ul>
	<li>Using skew is only rendered if the item is display block or inline-block.</li>
	<li>
		Some of these look the same on a wide viewport but fail differently as the viewport width is
		decreased.
	</li>
</ul>

<section class="card attempt">
	<h2>Attempt A<br /> — 1 element</h2>
	<div>
		<ul>
			<li class="icon shrug">
				Text will be skewed the same as the background. Don't know how to straighten the text, if
				straight text is desired.
			</li>
			<li class="icon warning">
				If multiline, preceding and following text is ejected to the next line even if there is
				space for it inline.
			</li>
			<li class="icon check">Text always stays within background.</li>
		</ul>
		<div class="test">
			<p class="attempt-1">Test with a <em>very short</em> string of text.</p>
			<p class="attempt-1">
				Test with a <em>much longer string of text that would wrap onto multiple lines</em> to check
				for artifacting or other unintended consequences of the attempt's code.
			</p>
		</div>
	</div>
	<div class="code">
		<CSSHighlight code={codeA} />
	</div>
</section>

<section class="card attempt">
	<h2>Attempt B<br /> — 1 element and a pseudo element</h2>
	<div>
		<ul>
			<li class="icon warning">
				If multiline, preceding and following text is ejected to the next line.
			</li>
			<li class="icon warning">
				Multi line text like this won't always sit on the background properly or will escape outside
				the background.
			</li>
			<li class="icon warning">Some weird z-index to get the background behind the text.</li>
		</ul>
		<div class="test">
			<p class="attempt-2">Test with a <em>very short</em> string of text.</p>
			<p class="attempt-2">
				Test with a <em>much longer string of text that would wrap onto multiple lines</em> to check
				for artifacting or other unintended consequences of the attempt's code.
			</p>
		</div>
	</div>
	<div class="code">
		<CSSHighlight code={codeB} />
	</div>
</section>

<section class="card attempt">
	<h2>Attempt C<br /> — 1 element, box-decoration-break: clone;</h2>
	<div>
		<ul>
			<li class="icon stop">
				No skew - seems to be ignored on inline elements (in Webkit at least).
			</li>
			<li class="icon check">Multi line consistency</li>
			<li class="icon check">No multiline following text eject to next line.</li>
			<li class="icon warning">
				If multiline, following lines can cover the decenders of previous line's characters.
			</li>
			<li class="icon warning">
				Poor multiline left-to-right gradient background color; visible lines in most cases.
			</li>
		</ul>
		<div class="test">
			<p class="attempt-3">Test with a <em>very short</em> string of text.</p>
			<p class="attempt-3">
				Test with a <em>much longer string of text that would wrap onto multiple lines</em> to check
				for artifacting or other unintended consequences of the attempt's code.
			</p>
		</div>
	</div>
	<div class="code">
		<CSSHighlight code={codeC} />
	</div>
</section>

<section class="card attempt">
	<h2>Attempt D<br /> — double wrapping elements</h2>
	<div>
		<ul>
			<li class="icon check">Avoids pseudo element z-index issues.</li>
			<li class="icon shrug">
				Don't know if double skewing elements causes subtle text rendering changes
			</li>
			<li class="icon warning">
				If multiline, preceding and following text is ejected to the next line.
			</li>
		</ul>
		<div class="test">
			<p class="attempt-4">Some text with some <em><span>skewed words</span></em> in the middle.</p>
			<p class="attempt-4">
				Lorem ipsum dolor sit amet, consectetur <em
					><span
						>adipisicing elit. Assumenda, eius consequuntur. Culpa possimus rem quibusdam odit
						facilis dolorum mollitia, voluptates</span
					></em
				> sapiente dolor doloribus quos nam quasi, repellendus blanditiis saepe fuga.
			</p>
		</div>
	</div>
	<div class="code">
		<CSSHighlight code={codeD} />
	</div>
</section>

<section class="card attempt">
	<h2>Attempt E<br /> — double pseudo elements at ends</h2>
	<div>
		<ul>
			<li class="icon warning">
				Poor multiline rendering. Pseudo elements don't always line up nicely. Can cause sharp
				corners or gaps.
			</li>
			<li class="icon warning">
				If multiline, preceding and following text is ejected to the next line.
			</li>
		</ul>
		<div class="test">
			<p class="attempt-5">Test with a <em>very short</em> string of text.</p>
			<p class="attempt-5">
				Test with a <em>much longer string of text that would wrap onto multiple lines</em> to check
				for artifacting or other unintended consequences of the attempt's code.
			</p>
		</div>
	</div>
	<div class="code">
		<CSSHighlight code={codeE} />
	</div>
</section>

<SocialLink href="https://codepen.io/mkstix6/pen/ERLLvb" service="codepen"
	>I originally wrote this on CodePen</SocialLink
>

<style lang="scss">
	$c1: mediumturquoise;
	$c2: mediumpurple;
	$g1: linear-gradient(to right, $c1, $c2);

	.test em {
		color: white;
	}

	ul {
		margin-bottom: 2rem;
	}

	.attempt-1 {
		em {
			font-style: normal;
			padding: 0.1em 0.3em;
			border-radius: 0.2em;
			position: relative;
			background: $g1;
			transform: skewX(-10deg);
			display: inline-block;
		}
	}

	.attempt-2 {
		position: relative;
		z-index: 0;

		em {
			font-style: normal;
			padding: 0.1em 0.3em;
			position: relative;
			display: inline-block;

			&::after {
				content: '';
				position: absolute;
				background: $g1;
				inset: 0;
				z-index: -1;
				border-radius: 0.2em;
				transform: skewX(-10deg);
			}
		}
	}

	.attempt-3 {
		em {
			font-style: normal;
			position: relative;
			display: inline;
			box-decoration-break: clone;
			padding: 0.1em 0.2em;
			border-radius: 0.2em;
			background: $g1;
			transform: skewX(-10deg); // this is ignored on inline elements, in Webkit at least.
		}
	}

	.attempt-4 {
		em {
			display: inline-block;
			font-style: normal;
			padding: 0.1em 0.3em;
			border-radius: 0.2em;
			position: relative;
			background: $g1;
			transform: skewX(-10deg);

			span {
				display: inline-block;
				transform: skewX(10deg);
			}
		}
	}

	.attempt-5 {
		position: relative;
		z-index: 0;

		em {
			font-style: normal;
			padding: 0.1em 0;
			margin-left: 0.5em;
			margin-right: 0.5em;
			position: relative;
			background: $g1;
			display: inline-block;

			&::before,
			&::after {
				content: '';
				border-radius: 0.2em;
				background: white;
				display: inline-block;
				width: 1em;
				transform: skewX(-10deg);
				position: absolute;
				z-index: -1;
			}

			&::before {
				top: 0;
				bottom: 0;
				left: -0.3em;
				background: $c1;
			}

			&::after {
				top: 0;
				bottom: 0;
				right: -0.3em;
				background: $c2;
			}
		}
	}

	li.icon {
		position: relative;
		list-style: none;
		padding-left: 0.1em;
		margin-left: 2em;

		&::before {
			font-size: 1.25em;
			position: absolute;
			left: -1.5em;
			top: -0.15em;
		}

		&.stop::before {
			content: '🛑';
		}
		&.warning::before {
			content: '⚠️';
		}
		&.shrug::before {
			content: '🤷';
		}
		&.check::before {
			content: '✅';
		}
	}

	.card.attempt {
		display: grid;
		grid-template-areas: 'header header' 'content code';
		gap: 1.5rem;
		margin-bottom: 1.5rem;

		h2 {
			grid-area: header;
			max-width: none;
		}

		> div {
			grid-area: content;
		}

		.test {
			padding: 0.25em 1em;
			border-radius: 1.5rem;
		}
		.code {
			grid-area: code;
		}
		.test {
			grid-area: content;
			background: var(--bgc);
			border-radius: 0.5em;
			width: 100%;
		}

		@media screen and (max-width: 550px) {
			display: block;
		}
	}
</style>
