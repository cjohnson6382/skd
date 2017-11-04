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

/*
	name = db.Column(db.String(64))
	street_number = db.Column(db.String(64))
	street_name= db.Column(db.String(64))
	city = db.Column(db.String(64))
	state = db.Column(db.String(64))
	zipcode = db.Column(db.Integer)
	country = db.Column(db.String(64))
	phone = db.Column(db.String(64))
	email = db.Column(db.String(64))
*/

const fieldnames = [
	"name",
	"street_number",
	"street_name",
	"city",
	"state",
	"zipcode",
	"country",
	"phone",
	"email"
]

const SiteForm = ({ change, submit, site }) => (
	<div style={ styles.form } >
		{ fieldnames.map((n, i) => <TextField { ...{ change, submit } } name={ n } key={ i } />) }
	</div>
)

// ANALYZE INSPECTIONS WITH DATA SCIENCE
export default class NewSite extends React.Component {
	static propTypes = {}

	constructor (props) {
		super(props)

		this.change = this.change.bind(this)
		this.submit = this.submit.bind(this)
	}

	state = { loading: false, site: {} }

	async change (field, value) { await this.setState({ site: Object.assign({}, this.state.site, { [field]: value }) }) }

	async submit () {
		console.log(this.state.site)
		let r = await kaizenFetch("POST")("sites")(this.state.site)
		if (r) r = await r.json()
		console.log(r)
	}

	render () {
		const c = field => value => this.change(field, value)
		return (
			<div>
				<h1>CREATE A NEW SITE</h1>
				<SiteForm change={ c } submit={ this.submit } site={ this.state.site } />
				<div style={ styles.button } onClick={ this.submit } >Submit</div>
			</div>
		)
	}
}