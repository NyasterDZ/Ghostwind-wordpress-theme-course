/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes, setAttributes}) {
	const {location, temp} = attributes
	return (
		<div className="container-weather">
			<div className="card">
				<h2>{location}</h2>
				<div className='temp__sky'>
					<h1>{temp}</h1>
					<div className="sky">
						<div className="sun"></div>
						<div className="cloud">
							<div className="circle-small"></div>
							<div className="circle-tall"></div>
							<div className="circle-medium"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
