import React from 'react'

// import PropTypes from 'prop-types'
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
	listItem: (assignment, type, id) => {
		return ({
			backgroundColor: assignment[type].includes(String(id)) ? "purple" : "white",
			color: assignment[type].includes(String(id)) ? "white" : "purple",
			padding: "0.2em",
			borderBottom: "0.1em solid lightgrey",
			borderRight: "0.1em solid lightgrey",
			cursor: "pointer"
		})
	}
}

// ASSIGN INSPECTION TO CONTRACTOR
export default class Assign extends React.Component {
	constructor (props) {
		super(props)

		this.getInspections = this.getInspections.bind(this)
		this.getSites = this.getSites.bind(this)
		this.getContractors = this.getContractors.bind(this)

		this.select = this.select.bind(this)
		this.submit = this.submit.bind(this)
	}

	// contractors, inspections, and sites: { name: "", id: "" }
	state = { loading: false, inspections: [], contractors: [], sites: [], assignment: { inspections: [], contractors: [], sites: [] } }

	componentDidMount () {
		this.getContractors()
		this.getSites()
		this.getInspections()
	}

	async getInspections () {
		this.setState({ loading: true })
		let inspections = await kaizenFetch("GET")("inspections")()
		inspections = inspections ? await inspections.json() : []
		this.setState({ inspections, loading: false })		
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
			this.setState({ assignment: { inspections: [], contractors: [], sites: [] } })
		} else {
			console.log("you need at least one of each of these: inspections, contractors, sites")
		}
		this.setState({ loading: false })
	}

	async select (e) {
		let { assignment } = this.state
		let type = e.target.attributes.type.value
		let value = e.target.attributes.value.value

		if (assignment[type].includes(value)) {
			assignment[type].splice(assignment[type].indexOf(value), 1)
			this.setState({ assignment: Object.assign({}, this.state.assignment, { [type]: assignment[type] }) })
		} else {
			let v = assignment[type].concat([value])
			this.setState({ assignment: Object.assign({}, this.state.assignment, { [type]: v }) })
		}
	}

	render () {
		return (
			<div>
				<h1>ASSIGN ONE OR MORE INSPECTIONS TO A CONTRACTORS</h1>
				<div style={ styles.panel } >
					<h2>Contractors</h2>
					{ !this.state.loading && this.state.contractors && this.state.contractors.length > 0 && this.state.contractors.map((c, i) => (
						<div
							style={ styles.listItem(this.state.assignment, "contractors", c.id) }
							onClick={ this.select }
							type="contractors" 
							value={ c.id } 
							key={ i } 
						>{ `${c.name_first} ${c.name_last}` }</div>
					)) }
				</div>
				<div style={ styles.panel } >
					<h2>Inspections</h2>
					{ !this.state.loading && this.state.inspections && this.state.inspections.length > 0 && this.state.inspections.map((insp, i) => (
						<div
							style={ styles.listItem(this.state.assignment, "inspections", insp.id) }
							onClick={ this.select }
							type="inspections"
							value={ insp.id } 
							key={ i } 
						>{ insp.name }</div>
					)) }				
				</div>
				<div style={ styles.panel } >
					<h2>Sites</h2>
					{ !this.state.loading && this.state.sites && this.state.sites.length > 0 && this.state.sites.map((s, i) => (
						<div
							style={ styles.listItem(this.state.assignment, "sites", s.id) }
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