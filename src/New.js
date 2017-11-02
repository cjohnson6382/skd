import React from 'react'

// import PropTypes from 'prop-types'
// import { Button, Glyphicon, Modal } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

import InspectionLine from './InspectionLine'

import { kaizenFetch } from './utilities'

const styles = {
	inlineButton: {
		display: "inline-block"
	},
	button: {
		border: "0.1em solid black",
		padding: "0.3em",
		cursor: "pointer",
		width: "25%",
		margin: "0.3em",
		borderRadius: "0.2em",
		backgroundColor: "darkblue",
		color: "white"
	},
	name: {
		fontWeight: "bold",
		paddingRight: "0.3em"
	}
}

// ANALYZE INSPECTIONS WITH DATA SCIENCE
export default class New extends React.Component {
	static propTypes = {}

	constructor (props) {
		super(props)

		this.change = this.change.bind(this)
		this.addLine = this.addLine.bind(this)
		this.submit = this.submit.bind(this)
	}

	state = { loading: false, inspection: [], current: { q: "", type: "", answerArray: ""}, name: "" }

	async change (field, value) {
		await this.setState({ current: Object.assign({}, this.state.current, { [field]: value }) })
	}

	async addLine () {
		if (
			this.state.current.q && 
			this.state.current.answerArray && 
			this.state.current.type
		) await this.setState({ inspection: this.state.inspection.concat([this.state.current]), current: {} })
		else console.log("you are missing data!")

		console.log(this.state.current)
	}

	async submit () {
		let { name, inspection } = this.state 
		let r = await kaizenFetch("POST")("create")({ inspection, name })
		if (r) r = await r.json()
		console.log(r)
	}

	render () {
		const c = field => value => this.change(field, value)
		return (
			<div>
				<h1>CREATE A NEW INSPECTION FORM</h1>
				<div><span style={ styles.name } >Inspection Name:</span><input placeholder="name" value={ this.state.name } onChange={ e => this.setState({ name: e.target.value }) } /></div>
				<div>
					{ this.state.inspection.map((l, i) => <InspectionLine key={ i } data={ l } change={ c } />) }
				</div>
				<div style={ styles.inlineButton } ><InspectionLine data={ this.state.current } change={ c } /></div><div style={ { ...styles.button, ...styles.inlineButton } } onClick={ this.addLine } >Add Field</div>
				<div style={ styles.button } onClick={ this.submit } >Submit</div>
			</div>
		)
	}
}