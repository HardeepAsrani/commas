/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const { InnerBlocks } = wp.blockEditor;

/**
 * Internal dependencies.
 */
import edit from './edit.js';

registerBlockType( 'commas/commas', {
	title: __( 'Commas - Grammar Check' ),
	description: __( 'Commas brings proofreading to the Block Editor.' ),
	icon: 'editor-spellcheck',
	category: 'common',
	keywords: [
		'grammar',
		'spelling',
		'spellcheck'
	],
	supports: {
		customClassName: false
	},
	edit,
	save: () => <InnerBlocks.Content/>
});
