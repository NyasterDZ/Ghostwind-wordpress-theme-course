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
	const { title, slug, description, followers, following, picProfile, picCover, link } = attributes;
	return ([
		<InspectorControls>
			<PanelBody title="Block Settings" initialOpen={ true }>
				<PanelRow>Change Settings</PanelRow>
				<PanelRow>
					Title: 
				</PanelRow>
				<RichText 
						placeholder='Card Title'
						tagName="h2"
						value={ title }
					/>
				<PanelRow>
					Slug: 
				</PanelRow>
				<RichText 
					placeholder='Card Slug'
					tagName="h2"
					value={ slug }
				/>
				<PanelRow>
					Description:
				</PanelRow>
				<RichText 
						placeholder='Card Description'
						tagName="h2"
						value={ description }
					/>
				<PanelRow>
					Followers:
				</PanelRow>
				<RichText 
						placeholder='Card Followers'
						tagName="h2"
						value={ followers }
				/>
				<PanelRow>
					Following:
				</PanelRow>
				<RichText 
						placeholder='Card Following'
						tagName="h2"
						value={ following }
				/>
				<PanelRow>
					Profile Picture:
				</PanelRow>
				<RichText 
						placeholder='Profile Picture'
						tagName="h2"
						value={ picProfile }
				/>
				<PanelRow>
					Cover Picture:
				</PanelRow>
				<RichText 
						placeholder='Cover Picture'
						tagName="h2"
						value={ picCover }
				/>	
				<PanelRow>
					Facebook Page Link:
				</PanelRow>
				<RichText 
						placeholder='Facebook Page Link'
						tagName="h2"
						value={ link }
				/>	
			</PanelBody>
		</InspectorControls>,
		<div className='container'>
			<div className="card-atm">
				<div style={{backgroundImage : `url(${picCover})`}} className="banner" >
					<div className="profile-image">
						<img src={picProfile} alt=""/>
					</div>
				</div>
				<div className="menu">
					<div className="opener"><span></span><span></span><span></span></div>
				</div>
				<h2 className="name">{ title }</h2>
				<div className="title">{ slug }</div>
				<div className="actions">
					<div className="follow-info">
					<h2><a href="#"><span>{ followers }</span><small>Followers</small></a></h2>
					<h2><a href="#"><span>{ following }</span><small>Following</small></a></h2>
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
	]
		
	);
}
