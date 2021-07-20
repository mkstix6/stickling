<main id="main" class="slice">
	<div class="gutterpadding">
		<h1 class="angletext">Mark Stickling CV</h1>
		<ul class="cvlist">
			<li style="--durationyears: 6;">
				<time datetime="2015">2015</time>-<time datetime="2021">2021</time> —
				<a href="https://www.minttwist.com">MintTwist digital agency</a> — Senior Frontend Developer
			</li>
			<li style="--durationyears: 2;">
				<time datetime="2013">2013</time>-<time datetime="2015">2015</time> —
				<a href="https://www.minttwist.com">MintTwist digital agency</a> — Frontend Developer
			</li>
			<li style="--durationyears: 1;">
				<time datetime="2012-05">2012</time>-<time datetime="2013">2013</time> —
				<a href="https://www.minttwist.com">MintTwist digital agency</a> — Development Intern
			</li>
			<li style="--durationyears: 3;">
				<time datetime="2009-09">2009</time>-<time datetime="2012-07">2012</time> —
				<a href="https://www.glebe.bromley.sch.uk">Glebe School</a>
				—
				<abbr title="Special Educational Needs">S.E.N.</abbr> Teaching Assistant
			</li>
			<li style="--durationyears: 3;">
				<time datetime="2005-09">2005</time>-<time datetime="2008-08">2008</time> —
				<a href="https://warwick.ac.uk">University of Warwick</a> — Physics BSc
			</li>
		</ul>
	</div>
</main>

<style lang="scss">
	.cvlist {
		list-style: none;

		li {
			padding-bottom: 1.5em;
			position: relative;
			min-height: calc(3vw * var(--durationyears));
			padding-left: 1.5em;

			&::after {
				content: '';
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				width: 1em;
				transform: skewY(-6deg);
				background: var(--herogradient);
			}
		}
	}

	.slice {
		// background-color: green;
	}
</style>
