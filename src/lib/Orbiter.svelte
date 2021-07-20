<script></script>

ORBITER OF FAVICONS
<ul class="orbiter">
	<li><img width="16" height="16" src="/project-favicons/project-favicon-01.jpg" /></li>
	<li><img width="16" height="16" src="/project-favicons/project-favicon-02.jpeg" /></li>
	<li><img width="16" height="16" src="/project-favicons/project-favicon-03.png" /></li>
	<li><img width="16" height="16" src="/project-favicons/project-favicon-04.png" /></li>
	<li><img width="16" height="16" src="/project-favicons/project-favicon-05.png" /></li>
	<li><img width="16" height="16" src="/project-favicons/project-favicon-06.png" /></li>
	<li><img width="16" height="16" src="/project-favicons/project-favicon-07.png" /></li>
	<li><img width="16" height="16" src="/project-favicons/project-favicon-08.png" /></li>
	<li><img width="16" height="16" src="/project-favicons/project-favicon-09.png" /></li>
	<li><img width="16" height="16" src="/project-favicons/project-favicon-10.png" /></li>
	<li><img width="16" height="16" src="/project-favicons/project-favicon-11.png" /></li>
</ul>

<style lang="scss">
	.orbiter {
		position: relative;
		width: 500px;
		height: 500px;
		list-style: none;
		padding-left: 0;
	}

	.orbiter li {
		position: absolute;
		top: 50%;
		left: 50%;
		animation: orbit 5s infinite;
		animation-timing-function: linear;
		animation-fill-mode: backwards;
		transform-origin: center -200px;
	}

	@for $i from 1 through 10 {
		.orbiter li:nth-child(#{$i}) {
			transform-origin: center #{random(200) * 1px};
			animation-delay: 1s * random(5);
			animation-duration: 4s + random(5);
		}
	}

	.orbiter img {
		display: block;
		padding: 2px;
		background: white;
		border-radius: 2px;
	}

	@keyframes orbit {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
