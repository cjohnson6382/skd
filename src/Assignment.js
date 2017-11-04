import React from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// import { kaizenFetch } from './utilities'

// 		color: "white",
const styles = {
	assignment: {
		cursor: "pointer",
		padding: "0.5em",
		margin: "0.5em",
		width: "25%",
		borderRadius: "0.2em",
		textDecoration: "none"
	},
	label: {
		fontWeight: "bold",
		paddingRight: "0.3em"
	},
	border: {
		width: "30%",
		margin: "0.5em",
		borderRadius: "0.3em",
		backgroundColor: "deepskyblue",
		color: "white",
		display: "inline-block"
	}
}

const Assignment = ({ assignment, onClick }) => (
	<Link to={ `/assignment/${assignment.id}` } onClick={ onClick } style={ styles.assignment } >
		<div style={ styles.border } >
			<div><span style={ styles.label } >Id:</span>{ String(assignment.id) }</div>
			<div><span style={ styles.label } >Contractors:</span>{ String(assignment.contractors) }</div>
			<div><span style={ styles.label } >Sites:</span>{ String(assignment.sites) }</div>
			<div><span style={ styles.label } >Inspections:</span>{ String(assignment.inspections) }</div>
		</div>
	</Link>
)

Assignment.propTypes = {
	assignment: PropTypes.object,
	onClick: PropTypes.func
}

export default Assignment