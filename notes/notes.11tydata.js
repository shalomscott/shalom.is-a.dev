const { titleCase } = require('title-case');

// This regex finds all wikilinks in the note
const wikilinkRegExp = /\[\[([\w\s/-]+)(.\w+)?\s?(\|\s?([\w\s/]+))?\]\]/g;

function removeFrontmatter(content = '') {
	content = content.trimStart();
	let yamlFm = content.substring(3, content.indexOf('---', 3)).trim();

	if (!yamlFm || !content.startsWith('---')) return content; // Content has no frontmatter

	return content.replace(`---\n${yamlFm}\n---`, '');
}

module.exports = {
	layout: 'note',
	type: 'note',
	eleventyComputed: {
		title: (data) => titleCase(data.title || data.page.fileSlug),
		backlinks: (data) => {
			const notes = data.collections.notes;
			const currentFileSlug = data.page.fileSlug;

			let backlinks = [];

			// Search every other note for backlinks
			for (const otherNote of notes) {
				const noteContent = removeFrontmatter(
					otherNote.template.inputContent
				);

				// Get all links from otherNote
				const outboundLinks = (
					noteContent.match(wikilinkRegExp) || []
				).map((link) =>
					// Extract link location
					link
						.slice(2, -2)
						.split('|')[0]
						.toLowerCase()
						.replace(/[^\w\s/-]+/g, '')
				);

				// If the other note links here, return related info
				if (outboundLinks.includes(currentFileSlug)) {
					backlinks.push({
						url: otherNote.url,
						title: otherNote.data.title,
					});
				}
			}

			return backlinks;
		},
	},
};
