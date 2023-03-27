/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	title: metadata.title,

	description: metadata.description,

	icon: metadata.icon,

	category: metadata.category,

	attributes: {
		title: {
			type: 'string',
			default: 'Algerian Tech Makers',
		},
		description: {
			type: 'string',
			default: 'Algerian Tech Makers is a computer company that specializes in the development of software and hardware. We are a team of dedicated and talented people who are passionate about technology and the development of new products.',
		},
		slug: {
			type: 'string',
			default: '@algeriantechmakersdz2021',
		},
		followers: {
			type: 'string',
			default: '23730',
		},
		following: {
			type: 'string',
			default: '1',
		},
		picProfile: {
			type: 'string',
			default: 'https://i.ibb.co/Hh1M0Tn/241102056-107805911635346-6817508508462524214-n.jpg',
		},
		picCover: {
			type: 'string',
			default: 'https://i.ibb.co/QQwc5rL/241092875-107806334968637-7676942246446422452-n.jpg',
		},
		link: {
			type: 'string',
			default: 'https://www.facebook.com/Algeriantechmakersdz2021/',
		}
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save,
} );
