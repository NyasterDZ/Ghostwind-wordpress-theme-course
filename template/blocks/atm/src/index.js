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
registerBlockType(metadata.name, {
	title: metadata.title,

	description: metadata.description,

	category: metadata.category,

	icon: metadata.icon,

	attributes: {
		title: {
			type: 'string',
			default: 'Algerian Tech Makers',
		},
		slug: {
			type: 'string',
			default: '@Algeriantechmakersdz2021',
		},
		description: {
			type: 'string',
			default: 'Algerian Tech Makers is a computer company that specializes in the development of software and hardware. We are a team of dedicated and talented people who are passionate about technology and the development of new products.',
		},
		followers: {
			type: 'string',
			default:'23,523'
		},
		following: {
			type: 'string',
			default: '1'
		},
		picProfile: {
			type: 'string',
			default:'https://scontent.faae2-2.fna.fbcdn.net/v/t39.30808-6/241102056_107805911635346_6817508508462524214_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=-nna8EL9mz4AX_cpxsw&tn=6SdklYGjOakQrLQ0&_nc_ht=scontent.faae2-2.fna&oh=00_AT8AqHcf94qHYB67Qzq67T-Xrrwv4VZrk_yjKfOsL633jQ&oe=62AE1153'
		},
		picCover: {
			type: 'string',
			default: 'https://scontent.faae2-1.fna.fbcdn.net/v/t39.30808-6/241092875_107806334968637_7676942246446422452_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=bDyaJUCE4VoAX_y5dkc&tn=6SdklYGjOakQrLQ0&_nc_ht=scontent.faae2-1.fna&oh=00_AT9TKxZi0Gc7NarvTeYY5DIUUwo31Cg6CR0nJbitx1TtFw&oe=62AFB5B0'
		},
		link: {
			type: 'string',
			default: 'https://www.facebook.com/Algeriantechmakersdz2021/'
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
});
