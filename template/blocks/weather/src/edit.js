import { RichText, InspectorControls} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, Button} from '@wordpress/components';
import { more } from '@wordpress/icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from '@wordpress/element';


import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

export default function Edit({attributes, setAttributes}) {
	const {location, temp} = attributes
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const weatherkey = process.env.WEATHER_API_KEY
	const mapboxToken = process.env.MAPBOX_API_KEY

	const [displayValue, setDisplayValue] = useState('none')
	const [allLocations, setAllLocations] = useState([])

	const getLocation = async (location) => {
		if(location.length > 0){
			setDisplayValue('block')
		}else{
			setDisplayValue('none')
		}

		var apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${mapboxToken}`
		var data = await fetch(apiUrl)
		var result = await data.json()

		var locationArray = result.features.map(place => {
			return {
				name: place.text,
				fullName: place.place_name,
				//coordinates: place.geometry.coordinates
			}
		})

		setAllLocations(locationArray)
	}

	const countryWeather = async (event) => {
		var location = event.target.attributes[0].value
		const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherkey}&q=${location}`
		var data = await fetch(apiUrl)
		var result = await data.json()
		var temp = `${result.current.temp_c}°`

		setAttributes({location: location})
		setAttributes({temp: temp})
		setOpen(false)
		setAllLocations([])
		setDisplayValue('none')
	}

	return ([
		<InspectorControls>
			<Panel header="Block Settings">
				<PanelBody title="Weather" icon={ more } initialOpen={ true }>
					<PanelRow>
						<Button onClick={handleOpen}>Choose the place</Button>
					</PanelRow>
				</PanelBody>
			</Panel>
		</InspectorControls>,

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
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Choose a place
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<RichText
							tagName='h2'
							placeholder='Type a name here'
							onChange={getLocation}
						/>
						<div className='display__countries' style={{display: displayValue}}>
							<ul>
								{allLocations.map((item) => {
									return (
										<li style={{display: "flex", flexDirection: "column"}}>
											<span data-place={item.name} onClick={countryWeather} style={{marginLeft: "4px", fontWeight: "bold"}}>{item.name}</span>
											<span style={{marginLeft: "4px"}}>{item.fullName}</span>
										</li>
									)
								})}
							</ul>
						</div>
					</Typography>
				</Box>
			</Modal>
		</div>
	]);
}
