import React from 'react'

import PropTypes from 'prop-types'
// import { Button, Glyphicon, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// import { kaizenFetch } from './utilities'

const styles = {
	inspection: {
		padding: "0.5em",
		cursor: "pointer",
		width: "25%",
		margin: "0.3em",
		borderRadius: "0.2em",
		backgroundColor: "deepskyblue",
		color: "white",
		textDecoration: "none"		
	}
}

const Inspection = ({ inspection, onClick }) => (
	<Link to={ `/detailed/${inspection.name}` } onClick={ onClick } style={ styles.inspection } >{ inspection.name }</Link>
)

Inspection.propTypes = {
	inspection: PropTypes.object,
	onClick: PropTypes.func
}

export default Inspection