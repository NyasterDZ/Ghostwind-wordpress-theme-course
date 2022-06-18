
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */

 import { RichText, InspectorControls} from '@wordpress/block-editor';
 import {PanelBody, PanelRow  } from '@wordpress/components';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
	const { title, description, slug, followers, following, picProfile, picCover, link } = attributes;
	return ([
		<InspectorControls>
			<PanelBody title="ATM Block Settings" initialOpen={ true }>
				<PanelRow> Title: </PanelRow>
				<RichText 
					tagName="h3"
					value={title}
					onChange={(value) => setAttributes({title: value})}
				/>
				<PanelRow> Description: </PanelRow>
				<RichText 
					tagName="h3"
					value={description}
					onChange={(value) => setAttributes({description: value})}
				/>
				<PanelRow> Link: </PanelRow>
				<RichText 
					tagName="h3"
					value={link}
					onChange={(value) => setAttributes({link: value})}
				/>
				<PanelRow> Followers: </PanelRow>
				<RichText 
					tagName="h3"
					value={followers}
					onChange={(value) => setAttributes({followers: value})}
				/>
				<PanelRow> Following: </PanelRow>
				<RichText 
					tagName="h3"
					value={following}
					onChange={(value) => setAttributes({following: value})}
				/>
				<PanelRow> Profile Picture: </PanelRow>
				<RichText 
					tagName="h3"
					value={picProfile}
					onChange={(value) => setAttributes({picProfile: value})}
				/>
				<PanelRow> Cover Picture: </PanelRow>
				<RichText 
					tagName="h3"
					value={picCover}
					onChange={(value) => setAttributes({picCover: value})}
				/>
			</PanelBody>
		</InspectorControls>
		,
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
	]);
}
