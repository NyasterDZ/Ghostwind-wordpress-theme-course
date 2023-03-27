/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes}) {
	const { title, description, slug, followers, following, picProfile, picCover, link } = attributes;
	return (
		<div className='container-atm'>
			<div className="card-atm">
				<div className="banner" style={{ backgroundImage: `url(${picCover})` }}>
					<div className="profile-image">
						<img src={picProfile} alt=""/>
					</div>
				</div>
				<div className="menu">
					<div className="opener"><span></span><span></span><span></span></div>
				</div>
				<h2 className="name">{title}</h2>
				<div className="title">{slug} </div>
				<div className="actions">
					<div className="follow-info">
					<h2><a href="#"><span>{followers}</span><small>Followers</small></a></h2>
					<h2><a href="#"><span>{following}</span><small>Following</small></a></h2>
					</div>
					<div className="follow-btn">
					<a href={link}>Follow</a>
					</div>
				</div>
				<div className="desc">
					{description}
				</div>
			</div>
		</div>
	);
}
