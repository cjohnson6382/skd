import React from 'react'

import PropTypes from 'prop-types'
// import { Button, Glyphicon, Modal } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

import Inspection from './Inspection'

// import { kaizenFetch } from './utilities'

const styles = {
	button: {
		border: "0.1em solid black",
		padding: "0.3em",
		cursor: "pointer",
		width: "25%",
		margin: "0.3em",
		borderRadius: "0.2em",
		backgroundColor: "darkblue",
		color: "white"
	}
}

// "MANAGE INSPECTIONS"
const Home = ({ getInspections, inspections, loading }) => {
	return (
		<div>
			<h1>THESE ARE YOUR CURRENT INSPECTIONS</h1>
			<h3>Select one to view details</h3>
			<div>
				{ !loading && inspections && inspections.length > 0 && inspections.map((inspection, i) => (
					<div><Inspection
						onClick={ console.log("clicked network") } 
						inspection={ inspection } 
						key={ i } 
					/></div>
				)) }
			</div>
			<div style={ styles.button } onClick={ getInspections } >Refresh the List</div>
		</div>
	)
}

Home.propTypes = {
	getInspections: PropTypes.func,
	inspections: PropTypes.array,
	loading: PropTypes.bool
}

export default Home