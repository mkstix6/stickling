import slugify from 'slugify';
const slugifyOptions = { strict: true };

export const socialDetails = [
	{
		service: 'twitter',
		serviceDisplayCase: 'Twitter',
		handle: '@mkstix6',
		contactUrl: 'https://twitter.com/mkstix6',
		kind: 'contactInfo',
	},
	{
		service: 'linkedin',
		serviceDisplayCase: 'Linkedin',
		contactUrl: 'https://www.linkedin.com/in/mark-stickling-b77ba246/',
		kind: 'contactInfo',
	},
	{
		service: 'codepen',
		serviceDisplayCase: 'CodePen',
		handle: 'mkstix6',
		contactUrl: 'https://codepen.io/mkstix6/',
		kind: 'codeExamples',
	},
	{
		service: 'github',
		serviceDisplayCase: 'Github',
		handle: 'mkstix6',
		contactUrl: 'https://github.com/mkstix6',
		kind: 'codeExamples',
	},
];

export const photography = [
	{ filename: 'IMG_0794.jpeg', alt: 'Hackney electricity tower' },
	{ filename: 'IMG_1408.jpeg', alt: 'Happy sea lion' },
	{ filename: 'IMG_0522.jpeg', alt: 'Hello there red billed gull' },
	{ filename: 'IMG_0882.jpeg', alt: 'Beady swan' },
	{ filename: 'IMG_2024.jpeg', alt: `My Dad's Bees moving home` },
	{ filename: 'IMG_2214.jpeg', alt: 'Sunlight through leaves' },
	{ filename: 'IMG_2258.jpeg', alt: 'Parliament at night' },
	{ filename: 'IMG_2452.jpeg', alt: 'Tower Bridge accross the Thames' },
	{ filename: 'IMG_2515.jpeg', alt: 'Tower Bridge lights' },
	{ filename: 'IMG_2937.jpeg', alt: 'Rolling hills' },
	{ filename: 'IMG_4312.jpeg', alt: 'Iceberg' },
	{ filename: 'IMG_4487.jpeg', alt: 'Black sand and surf' },
	{ filename: 'IMG_4728.jpeg', alt: 'Crystal clear water at Kefalonia Myrtos beach' },
	{ filename: 'IMG_4801.jpeg', alt: 'Sea sailing' },
	{ filename: 'IMG_4847.jpeg', alt: 'Luna' },
	{ filename: 'IMG_5076ir.jpeg', alt: 'Infrared of Mawgan Porth' },
	{ filename: 'IMG_5131.jpeg', alt: 'Surf time' },
	{ filename: 'IMG_5231.jpeg', alt: 'Rainbow over South London tower blocks' },
	{ filename: 'IMG_5233.jpeg', alt: 'Sunrise over South London tower blocks' },
	{ filename: 'IMG_5235.jpeg', alt: 'Water wheel' },
	{ filename: 'IMG_5400ir.jpeg', alt: 'Infrared of Mawgan Porth' },
	{ filename: 'IMG_5645.jpeg', alt: 'Hampstead blooms' },
	{ filename: 'IMG_5665.jpeg', alt: 'Infrared London from Parliament Hill' },
	{ filename: 'IMG_5712.jpeg', alt: 'Iceland greenhouses' },
	{ filename: 'IMG_5924.jpeg', alt: 'Hi Robbin' },
	{ filename: 'IMG_6339.jpeg', alt: 'Buzzy bees' },
	{ filename: 'IMG_6752.jpeg', alt: 'Sunrise condensation' },
	{ filename: 'IMG_8397.jpeg', alt: 'Hackney Wick heavens' },
];

export const developmentLogos = [
	{
		key: 'ava',
		name: 'AVA',
		image: 'ava.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2020,
		aspectratio: 300 / 170,
	},
	{
		key: 'aws',
		name: 'AWS',
		image: 'aws.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2020,
		aspectratio: 1,
	},
	{
		key: 'bitbucket',
		name: 'Bitbucket',
		image: 'bitbucket.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2016,
		aspectratio: 1,
	},
	{
		key: 'blender',
		name: 'Blender 3D',
		image: 'blender.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2021,
		aspectratio: 1,
	},
	{
		key: 'bootstrap',
		name: 'Bootstrap',
		image: 'bootstrap.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2015,
		aspectratio: 1,
	},
	{
		key: 'bower',
		name: 'Bower',
		image: 'bower.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2014,
		aspectratio: 360 / 320,
	},
	{
		key: 'codekit',
		name: 'CodeKit',
		image: 'codekit.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2014,
		aspectratio: 1,
	},
	{
		key: 'css',
		name: 'CSS',
		image: 'css3.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2007,
		aspectratio: 0.8,
	},
	{
		key: 'cypress',
		name: 'Cypress.js',
		image: 'cypress.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2020,
		aspectratio: 350 / 130,
	},
	{
		key: 'docker',
		name: 'Docker',
		image: 'docker.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2019,
		aspectratio: 1.3,
	},
	{
		key: 'es6',
		name: 'ES6',
		image: 'es6.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2016,
		aspectratio: 1,
	},
	{
		key: 'git',
		name: 'Git',
		image: 'git.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2018,
		aspectratio: 1,
	},
	{
		key: 'github',
		name: 'GitHub',
		image: 'github.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2016,
		aspectratio: 1,
	},
	{
		key: 'graphql',
		name: 'GraphQL',
		image: 'graphql.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2021,
		aspectratio: 1,
	},
	{
		key: 'gsap',
		name: 'GSAP',
		image: 'gsap.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1.3,
		rotation: 0,
		zindex: 0,
		order: 2017,
		aspectratio: 1,
	},
	{
		key: 'gulp',
		name: 'Gulp',
		image: 'gulp.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2015,
		aspectratio: 0.7,
	},
	{
		key: 'illustrator',
		name: 'Illustrator',
		image: 'illustrator.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2012,
		aspectratio: 1,
	},
	{
		key: 'creative cloud',
		name: 'Creative Cloud',
		image: 'creativecloud.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2017,
		aspectratio: 1,
	},
	{
		key: 'html',
		name: 'HTML',
		image: 'html5.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2003,
		aspectratio: 0.9,
	},

	{
		key: 'invision',
		name: 'InVision',
		image: 'invision.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2019,
		aspectratio: 1,
	},
	{
		key: 'js',
		name: 'JS',
		image: 'js.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2014,
		aspectratio: 1,
	},
	{
		key: 'jira',
		name: 'Jira',
		image: 'jira.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2018,
		aspectratio: 1,
	},
	{
		key: 'jquery',
		name: 'jQuery',
		image: 'jquery.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2016,
		aspectratio: 2,
	},
	{
		key: 'node',
		name: 'Node',
		image: 'node.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2017,
		aspectratio: 630 / 400,
	},
	{
		key: 'npm',
		name: 'npm',
		image: 'npm.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2017,
		aspectratio: 1.4,
	},
	{
		key: 'nuxt',
		name: 'Nuxt.js',
		image: 'nuxt.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2019,
		aspectratio: 1,
	},
	{
		key: 'parcel',
		name: 'Parcel',
		image: 'parcel.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2020,
		aspectratio: 1,
	},
	{
		key: 'photoshop',
		name: 'PhotoShop',
		image: 'photoshop.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2010,
		aspectratio: 1,
	},
	{
		key: 'php',
		name: 'PHP',
		image: 'php.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2009,
		aspectratio: 1.2,
	},
	{
		key: 'pm2',
		name: 'PM2',
		image: 'pm2.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2020,
		aspectratio: 2,
	},
	{
		key: 'prepros',
		name: 'PrePros',
		image: 'prepros.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2016,
		aspectratio: 1,
	},
	{
		key: 'postcss',
		name: 'PostCSS',
		image: 'postcss.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2018,
		aspectratio: 1,
	},
	{
		key: 'postman',
		name: 'Postman',
		image: 'postman.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2019,
		aspectratio: 1,
	},
	{
		key: 'rollup',
		name: 'Rollup',
		image: 'rollup.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2019,
		aspectratio: 0.7,
	},
	{
		key: 'scrollmagic',
		name: 'ScrollMagic',
		image: 'scrollmagic.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2017,
		aspectratio: 1,
	},
	{
		key: 'sass',
		name: 'Sass',
		image: 'sass.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2017,
		aspectratio: 1,
	},
	{
		key: 'sketch',
		name: 'Sketch',
		image: 'sketch.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2018,
		aspectratio: 1,
	},
	{
		key: 'slack',
		name: 'Slack',
		image: 'slack.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2018,
		aspectratio: 1.7,
	},
	{
		key: 'snowpack',
		name: 'Snowpack',
		image: 'snowpack.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2021,
		aspectratio: 1,
	},
	{
		key: 'sublimetext',
		name: 'SublimeText',
		image: 'sublimetext.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2013,
		aspectratio: 1,
	},
	{
		key: 'svelte',
		name: 'Svelte.js',
		image: 'svelte.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2021,
		aspectratio: 1,
	},
	// { No separate logo for SvelteKit yet
	//  key: 'sveltekit',
	// 	name: 'SvelteKit.js',
	// 	image: 'sveltekit.png',
	// 	link: undefined,
	// 	posX: 0,
	// 	posY: 0,
	// 	scale: 1,
	// 	rotation: 0,
	// 	zindex: 0,
	// 	order: 2021,
	// 	aspectratio: 1
	// },
	{
		key: 'three',
		name: 'Three.js',
		image: 'threejs.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2020,
		aspectratio: 1,
	},
	{
		key: 'trello',
		name: 'Trello',
		image: 'trello.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2017,
		aspectratio: 1,
	},
	{
		key: 'typescript',
		name: 'TypeScript',
		image: 'typescript.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2020,
		aspectratio: 1,
	},
	{
		key: 'vs code',
		name: 'VS Code',
		image: 'vscode.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2019,
		aspectratio: 1,
	},
	{
		key: 'vue',
		name: 'Vue.js',
		image: 'vue.png',
		link: 'https://vuejs.org',
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2018,
		aspectratio: 1,
	},
	{
		key: 'webpack',
		name: 'Webpack',
		image: 'webpack.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2018,
		aspectratio: 1,
	},
	{
		key: 'wordpress',
		name: 'WordPress',
		image: 'wordpress.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2012,
		aspectratio: 1,
	},
	{
		key: 'wp advanced custom fields',
		name: 'WP Advanced Custom Fields',
		image: 'wordpressacf.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2018,
		aspectratio: 1,
	},
	{
		key: 'yarn',
		name: 'Yarn',
		image: 'yarn.png',
		link: undefined,
		posX: 0,
		posY: 0,
		scale: 1,
		rotation: 0,
		zindex: 0,
		order: 2019,
		aspectratio: 1,
	},
];

// Remember there is forEach code at the end of this array acting on some of this data.
export interface PostItem {
	year: number;
	title: string;
	slug?: string;
	thumbnail?: string;
	videothumbnail?: string;
	type: string;
	tech?: string[];
	codethumbnail?: string;
	link?: string;
	liveLink?: string;
	codepenLink?: string;
}

export const postItems: PostItem[] = [
	{
		year: 2021,
		title: 'Blender learnings',
		slug: 'blender-learning-2021',
		thumbnail: '',
		videothumbnail: '/posts/blender-learning-2021/bouncymirror.mp4',
		type: 'codeart',
		tech: ['blender'],
		codethumbnail: `background-color: #572c85;`,
	},
	{
		year: 2021,
		title: 'Pixel Sand Mixer',
		thumbnail: '',
		videothumbnail: '/posts/pixel-sand-mixer.mp4',
		type: 'codeart',
		tech: ['js'],
		codethumbnail: `background-color: #572c85;`,
	},
	{
		year: 2021,
		title: `Hex38 Aristotle's Puzzle`,
		type: 'experiment',
		tech: ['js'],
		videothumbnail: '/posts/hex38.mp4',
		codethumbnail: `background-color: #81b98d;`,
	},
	{
		year: 2020,
		title: 'Brandirectory website',
		slug: 'brandirectory-project',
		liveLink: 'https://brandirectory.com',
		type: 'work',
		thumbnail: '', // '/posts/brandirectory-thumb.png'
		codethumbnail:
			'background-position: -100% 45%; background-size: 200% 200%; background-image: conic-gradient(#a024ad 0%,5%,white 5%,6%,#ed962c 6%,10%,white 10%,11%,#f9eb53 11%,15%,white 15%,16%,#51af56 16%,20%,white 20%,21%,#cedc4e 21%,25%,white 25%,26%,#e95432 26%,30%,white 30%,31%,#4e97ef 31%,35%,white 35%,36%,#e72f63 36%,40%,white 40%,41%,#5cbdd2 41%,45%,white 45%,46%,#469688 46%,50%,white 50%,white);',
		tech: ['vue', 'nuxt'],
	},
	{
		year: 2021,
		title: 'Photography',
		slug: 'photography',
		type: 'list',
	},
	{
		year: 2019,
		title: 'Confetti',
		codepenLink: 'https://codepen.io/mkstix6/pen/arZWbE',
		videothumbnail: '/posts/confetti.mp4',
		codethumbnail: `background-color: #050d22;`,
		type: 'art',
		tech: ['css', 'js'],
	},
	{
		year: 2019,
		title: 'Skewed text background experiments',
		codepenLink: 'https://codepen.io/mkstix6/full/ERLLvb',
		type: 'article',
		// thumbnail: '/posts/skewed-text-background-experiments-thumb.png',
		codethumbnail: 'background: linear-gradient(to right, mediumturquoise, mediumpurple);',
		tech: ['css'],
	},
	{
		year: 2018,
		title: 'Flexbox only responsive components',
		codepenLink: 'https://codepen.io/mkstix6/full/dPmYvV',
		// thumbnail: '/posts/flexbox-responsive-components.png',
		codethumbnail: 'background: linear-gradient(to right, #57c6ad, 60%, #0d0fbc 60%, #0d0fbc);',
		type: 'article',
		tech: ['css'],
	},
	{
		year: 2021,
		title: 'Useful Web Dev Bookmarks',
		slug: 'bookmarks',
		type: 'list',
		// tech: [],
		codethumbnail:
			'background:  var(--herogradient),repeating-radial-gradient(var(--pallette3), 20px, var(--pallette5) 20px, var(--pallette5) 40px); background-blend-mode: screen;',
	},
	// {
	// 	year: 2017,
	// 	title: 'IE and Edge detection',
	// 	codepenLink: 'https://codepen.io/mkstix6/full/pRbErK',
	// 	type: 'article',
	// 	tech: ['css']
	// },
	{
		year: 2021,
		title: 'Shimmering SVG effect',
		slug: 'sunset-paradise-postcard',
		codepenLink: 'https://codepen.io/mkstix6/pen/LYyLrEO?editors=0100',
		videothumbnail: '/posts/sunset-paradise-postcard.mp4',
		codethumbnail: `background-color: #985e26;`,
		type: 'codeart',
		tech: ['css'],
	},
].map((post: PostItem) => {
	if (!post.slug) {
		post.slug = slugify(post.title, slugifyOptions).toLowerCase();
	}
	post.link = `/posts/${post.slug}`;
	// Photography specific code
	if (post.slug === 'photography') {
		post.thumbnail = `/photos/${photography[0].filename}`;
	}
	return post;
});
// .sort((a, b) => b.year - a.year);

export interface Bookmark {
	title: string;
	url: string;
	date?: string;
	year?: number;
	tech: string[];
	kind: string;
	domain?: string;
	order?: number;
}

export const bookmarks: Bookmark[] = [
	{
		title: 'Styling list bullets with emoji',
		url: 'https://www.clairecodes.com/blog/2019-04-26-styling-list-bullets-with-emoji/',
		date: '26 April 2019',
		year: 2019,
		tech: ['css'],
		kind: 'article',
	},
	{
		title: 'CSS Grid fluid columns snippet',
		url: 'https://css-tricks.com/snippets/css/complete-guide-grid/#fluid-columns-snippet',
		date: 'Jul 21, 2021',
		year: 2021,
		tech: ['css'],
		kind: 'snippet',
	},
	{
		title: 'System Font Stack',
		url: 'https://systemfontstack.com',
		year: 2021,
		tech: ['css'],
		kind: 'snippet',
	},
	{
		title: 'How to get the domain name from a URL in JavaScript',
		url: 'https://w3collective.com/get-domain-name-url-javascript/',
		year: 2021,
		tech: ['js'],
		kind: 'snippet',
	},
	{
		title: 'ECMAScript 6 Cheatsheet',
		url: 'http://help.wtf/es6',
		year: 2020,
		tech: ['js'],
		kind: 'reference',
	},
	{
		title: 'FunFunFunction – JavaScript functional programming videos',
		url: 'https://www.youtube.com/c/funfunfunction/playlists',
		year: 2020,
		tech: ['js'],
		kind: 'tutorial',
	},
	{
		title: 'PX, EM or REM Media Queries?',
		url: 'https://zellwk.com/blog/media-query-units/',
		year: 2016,
		tech: ['css'],
		kind: 'article',
	},
	{
		title: 'Screensiz.es',
		url: 'https://screensiz.es',
		year: 2018,
		tech: ['css'],
		kind: 'reference',
	},
	{
		title: 'Srcset and sizes – Responsive images',
		url: 'https://ericportis.com/posts/2014/srcset-sizes/',
		year: 2014,
		tech: ['html', 'css'],
		kind: 'article',
	},
	{
		title: 'Object Property Value Shorthand in JavaScript with ES6',
		url: 'https://alligator.io/js/object-property-shorthand-es6/',
		year: 2020,
		tech: ['js'],
		kind: 'article',
	},
	{
		title: 'Learn Git Branching – interactive sandbox',
		url: 'https://learngitbranching.js.org',
		year: 2014,
		tech: ['git'],
		kind: 'tutorial',
	},
	{
		title: 'ES6features – GitHub',
		url: 'https://github.com/lukehoban/es6features',
		year: 2014,
		tech: ['js'],
		kind: 'reference',
	},
	{
		title: 'Real Favicon Generator',
		url: 'https://realfavicongenerator.net/',
		year: 2014,
		tech: ['html'],
		kind: 'tool',
	},
	{
		title: 'CanIUse.com – front-end web browser support tables',
		url: 'https://caniuse.com/',
		year: 2021,
		tech: ['html', 'css', 'js'],
		kind: 'reference',
	},
	{
		title: 'Web Design is 95% Typography',
		url: 'https://ia.net/topics/the-web-is-all-about-typography-period',
		year: 2006,
		tech: ['css', 'design'],
		kind: 'article',
	},
	{
		title: 'Free easy image optimisation',
		url: 'https://imageoptim.com/mac',
		// year: 2006,
		tech: ['html'],
		kind: 'app',
	},
	{
		title: '5 steps to faster web fonts',
		url: 'https://iainbean.com/posts/2021/5-steps-to-faster-web-fonts/',
		year: 2021,
		tech: ['html'],
		kind: 'article',
	},
	{
		title: 'How to rotate a HDRI in Blender',
		url: 'https://www.versluis.com/2020/07/rotate-hdri-in-blender/',
		year: 2020,
		tech: ['blender'],
		kind: 'article',
	},
	{
		title: 'Transparent PNG in Blender',
		url:
			'https://blender.stackexchange.com/questions/1303/can-blender-render-pngs-with-the-background-transparent',
		year: 2013,
		tech: ['blender'],
		kind: 'article',
	},
].map((bookmark: Bookmark, index) => {
	// Compute domain
	let domain = new URL(bookmark.url);
	bookmark.domain = domain.hostname.replace('www.', '');
	// Add original order reminder
	bookmark.order = index;
	// Sort arrays
	// bookmark.tech.sort();
	return bookmark;
});

// {
// 	title: 'TITLE',
// 	url: 'URL',
// 	year: 2000,
// 	tech: ['TECHNOLOGY'],
// 	kind: 'KIND',
// },

// .sort((a, b) => b.year - a.year);

export const webInspiration = [['http://acko.net']];

export const workFavicons = [
	'project-favicon-6.png',
	'project-favicon-7.png',
	'project-favicon-8.png',
	'project-favicon-9.png',
	'project-favicon-12.png',
	'project-favicon-13.png',
	'project-favicon-14.png',
	'project-favicon-15.png',
	'project-favicon-16.png',
	'project-favicon-17.png',
	'project-favicon-18.png',
	'project-favicon-19.ico',
	'project-favicon-20.png',
	'project-favicon-21.png',
	'project-favicon-22.png',
	'project-favicon-23.png',
	'project-favicon-24.png',
	'project-favicon-25.ico',
	'project-favicon-26.jpeg',
	'project-favicon-27.png',
	'project-favicon-28.png',
	'project-favicon-1.jpeg',
	'project-favicon-29.jpg',
	'project-favicon-2.png',
	'project-favicon-3.png',
	'project-favicon-30.png',
	'project-favicon-4.png',
	'project-favicon-31.png',
	'project-favicon-5.png',
	'project-favicon-32.png',
	'project-favicon-33.png',
	'project-favicon-34.png',
	'project-favicon-35.png',
	'project-favicon-36.png',
	'project-favicon-37.png',
	'project-favicon-38.png',
	'project-favicon-40.png',
	'project-favicon-39.png',
];
