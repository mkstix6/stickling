import { postItems } from '../../src/lib/sitedata';

const pages = ['/', '/posts', '/about', '/contact', ...postItems.map((post) => post.link)];

describe('All pages load', () => {
	pages.forEach((page) => {
		it(`Page loads: ${page}`, () => {
			cy.visit(page);
		});
	});
});
