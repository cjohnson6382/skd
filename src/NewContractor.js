import React from 'react'

// import PropTypes from 'prop-types'
// import { Button, Glyphicon, Modal } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

// import InspectionLine from './InspectionLine'

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
	},
	textfield: {
		fontWeight: "bold",
		paddingRight: "0.5em"
	},
	form: {
		textAlign: "left",
		padding: "2em"
	}
}


const TextField = ({ name, change }) => (
	<div>
		<span style={ styles.textfield } >{ name }</span>
		<input placeholder={ name } onChange={ e => change(name)(e.target.value) } type="text" />
	</div>
)

const fieldnames = [
	"name_first",
	"name_last",
	"street_number",
	"street_name",
	"city",
	"state",
	"zipcode",
	"country",
	"phone",
	"email"
]

const ContractorForm = ({ change, submit, contractor }) => (
	<div style={ styles.form } >
		{ fieldnames.map((n, i) => <TextField { ...{ change, submit } } name={ n } key={ i } />) }
	</div>
)

// ANALYZE INSPECTIONS WITH DATA SCIENCE
export default class NewContractor extends React.Component {
	static propTypes = {}

	constructor (props) {
		super(props)

		this.change = this.change.bind(this)
		this.submit = this.submit.bind(this)
	}

	state = { loading: false, contractor: {} }

	async change (field, value) { await this.setState({ contractor: Object.assign({}, this.state.contractor, { [field]: value }) }) }

	async submit () {
		console.log(this.state.contractor)
		let r = await kaizenFetch("POST")("contractors")(this.state.contractor)
		if (r) r = await r.json()
		console.log(r)
	}

	render () {
		const c = field => value => this.change(field, value)
		return (
			<div>
				<h1>CREATE A NEW CONTRACTOR</h1>
				<ContractorForm change={ c } submit={ this.submit } contractor={ this.state.contractor } />
				<div style={ styles.button } onClick={ this.submit } >Submit</div>
			</div>
		)
	}
}