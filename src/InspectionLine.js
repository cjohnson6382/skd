import React from 'react'

import PropTypes from 'prop-types'
import { Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { kaizenFetch } from './utilities'

const styles = {
	le: {
		padding: "0.3em",
		display: "inline-block"
	}
}

const InspectionLine = ({ data, change }) => (
	<div>
		<div style={ styles.le } onChange={ e => change("q")(e.target.value) } >{ data.q }</div>
		<div style={ styles.le } onChange={ e => change("answerArray")(e.target.value) } >{ data.answerArray }</div>
		<div style={ styles.le } onChange={ e => change("type")(e.target.value) } >{ data.type }</div>
	</div>
)

InspectionLine.propTypes = {
	data: PropTypes.object,
	change: PropTypes.func
}

export default InspectionLine