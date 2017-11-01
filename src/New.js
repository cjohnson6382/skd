import React from 'react'

// import PropTypes from 'prop-types'
// import { Button, Glyphicon, Modal } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

import InspectionLine from './InspectionLine'

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

// ANALYZE INSPECTIONS WITH DATA SCIENCE
export default class New extends React.Component {
	static propTypes = {}

	constructor (props) {
		super(props)

		this.change = this.change.bind(this)
		this.addLine = this.addLine.bind(this)
	}

	state = { loading: false, inspection: [], current: {} }

	// async getData () {
	// 	this.setState({ loading: true })
	// 	let data = await (await kaizenFetch("GET")("data")()).json()
	// 	this.setState({ data, loading: false })
	// }

	change (field, value) {
		this.setState({ current: Object.assign({}, this.state.current, { [field]: value }) })
	}

	addLine (line) {
		if (line.q && line.answerArray && line.type) this.setState({ inspection: this.state.inspection.push(line) })
		else console.log("you are missing data!")
	}

	render () {
		const c = field => value => this.change(field, value)
		return (
			<div>
				<h1>CREATE A NEW INSPECTION FORM</h1>
				<div>
					{ this.state.inspection.map((l, i) => <InspectionLine key={ i } data={ l } change={ c } />) }
				</div>
				<div>{ <InspectionLine data={ {} } change={ c } /> }</div><div style={ styles.button } onClick={ this.addLine } >Add Line</div>
			</div>
		)
	}
}