import React from 'react'

import PropTypes from 'prop-types'
// import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

// import { kaizenFetch } from './utilities'

const styles = {
	le: {
		padding: "0.3em",
		display: "inline-block"
	},
	name: {
		fontWeight: "bold",
		paddingRight: "0.3em"
	}
}

const InspectionLine = ({ data, change }) => {
	return (
		<div>
			<div style={ styles.le } ><span style={ styles.name } >Question:</span><input value={ data.q } placeholder="question" onChange={ e => change("q")(e.target.value) } type="text" /></div>
			<div style={ styles.le } ><span style={ styles.name } >Type:</span><input value={ data.type } placeholder="type" onChange={ e => change("type")(e.target.value) } type="text" /></div>
			<div style={ styles.le } ><span style={ styles.name } >Answers:</span><input value={ data.answerArray } placeholder="answers" onChange={ e => change("answerArray")(e.target.value) } type="text" /></div>
		</div>
	)
}

InspectionLine.propTypes = {
	data: PropTypes.object,
	change: PropTypes.func
}

export default InspectionLine