import React from 'react'

import PropTypes from 'prop-types'
// import { Button, Glyphicon, Modal } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

// import Inspection from './Inspection'

import { kaizenFetch } from './utilities'

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
	},
	panel: {
		width: "33.3%",
		display: "inline-block"
	},
	listItems: (type, id) => ({
		backgroundColor: this.state.assignment[type][id] ? "purple" : "white",
		padding: "0.2em",
		borderBottom: "0.1em solid lightgrey"
	})
}

// ASSIGN INSPECTION TO CONTRACTOR
export default class Assign extends React.Component {
	static propTypes = {
		inspections: PropTypes.array
	}

	constructor (props) {
		super(props)

		this.getContractors = this.getContractors.bind(this)
	}

	// contractors, inspections, and sites: { name: "", id: "" }
	state = { loading: false, contractors: [], sites: [], assignment: { inspections: {}, contractors: {}, sites: {} } }

	componentDidMount () {
		this.getContractors()
		this.getSites()
	}

	async getContractors () {
		this.setState({ loading: true })
		let contractors = await kaizenFetch("GET")("contractors")()
		contractors = contractors ? await contractors.json() : []
		this.setState({ contractors, loading: false })
	}

	async getSites () {
		this.setState({ loading: true })
		let sites = await kaizenFetch("GET")("sites")()
		sites = sites ? await sites.json() : []
		this.setState({ sites, loading: false })
	}

	async submit () {
		this.setState({ loading: true })
		let { inspections, contractors, sites } = this.state.assignment
		if (inspections.length > 0 && contractors.length > 0 && sites.length > 0) {
			let r = await (await kaizenFetch("POST")("assign")(this.state.assignment)).json()
			console.log(r)
			this.setState({ assignment: { inspections: {}, contractors: {}, sites: {} } })
		} else {
			console.log("you need at least one of each of these: inspections, contractors, sites")
		}
		this.setState({ loading: false })
	}

	async select (e) { this.setState({ [e.target.attributes.type.value]: e.target.value }) }

	render () {
		return (
			<div>
				<h1>ASSIGN ONE OR MORE INSPECTIONS TO A CONTRACTORS</h1>
				<div style={ styles.panel } >
					{ !this.state.loading && this.state.contractors && this.state.contractors.length > 0 && this.state.contractors.map((c, i) => (
						<div
							style={ this.listItem("contractors", c.id) }
							onClick={ this.select }
							type="contractors" 
							value={ c.id } 
							key={ i } 
						>{ c.name }</div>
					)) }
				</div>
				<div style={ styles.panel } >
					{ !this.state.loading && this.state.inspections && this.state.inspections.length > 0 && this.state.inspections.map((insp, i) => (
						<div
							style={ this.listItem("inspections", insp.id) }
							onClick={ this.select }
							type="inspections"
							value={ insp.id } 
							key={ i } 
						>{ insp.name }</div>
					)) }				
				</div>
				<div style={ styles.panel } >
					{ !this.state.loading && this.state.sites && this.state.sites.length > 0 && this.state.sites.map((s, i) => (
						<div
							style={ this.listItem("sites", s.id) }
							onClick={ this.select } 
							type="sites"
							value={ s.id } 
							key={ i } 
						>{ s.name }</div>
					)) }				
				</div>
				<div style={ styles.button } onClick={ this.submit } >Assign</div>
			</div>
		)
	}
}