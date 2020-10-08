module.exports = function (eleventyConfig) {
	const markdownIt = require('markdown-it');
	const md = markdownIt({
		html: true,
		linkify: true,
	})
		.use(require('markdown-it-footnote'))
		.use(require('markdown-it-attrs'))
		.use(
			require('@kwvanderlinde/markdown-it-wikilinks')({
				baseURL: '/notes/',
				makeAllLinksAbsolute: true,
				uriSuffix: '/',
				linkPattern: /\[\[([\w\s/-]+)(.\w+)?(\|([\w\s/]+))?\]\]/,
				postProcessPageName: (pageName) => {
					return pageName.trim().toLowerCase();
				},
			})
		);

	eleventyConfig.setLibrary('md', md);

	eleventyConfig.addCollection('notes', function (collectionApi) {
		return collectionApi.getFilteredByGlob(['notes/**/*.md', 'index.md']);
	});

	eleventyConfig.addPassthroughCopy('assets');

	return {
		dir: {
			layouts: 'layouts',
			includes: 'includes',
			data: 'data',
		},
	};
};
