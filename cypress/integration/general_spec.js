import { postItems } from '../../src/lib/sitedata';

const pages = ['/', '/posts', '/about', '/contact', ...postItems.map((post) => post.link)];

describe('All pages load', () => {
	pages.forEach((page) => {
		it(`Page loads: ${page}`, () => {
			cy.visit(page);
		});
	});
});

describe('Posts pages', () => {
	it(`Newer Older navigation works`, () => {
		cy.visit('/posts/confetti');
		cy.get('footer .prevnext').contains(`Newer`);
		cy.get('footer .prevnext').contains(`Older`);
	});
});

describe('BubbleString art page', () => {
	it(`Vanilla page loads today's art`, () => {
		cy.visit('/posts/bubblestring-generative-art');
		cy.contains(`Today's BubbleString`);
	});
	it(`URLquery chooses art`, () => {
		cy.visit('/posts/bubblestring-generative-art?seed=1234');
		cy.contains(`BubbleString: 1234`);
	});
});

describe('SpiroFlare art page', () => {
	it(`Vanilla page loads today's art`, () => {
		cy.visit('/posts/spiroflare-generative-art');
		cy.get('h2').contains(`TorusSpectre`);
	});
	it(`URLquery chooses art`, () => {
		cy.visit('/posts/spiroflare-generative-art?preset=5&seed=1234');
		cy.get('h2').contains(`SpiroCoil`);
		cy.get('h2').contains(`#1234`);
	});
});
