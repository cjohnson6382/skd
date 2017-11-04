import React from 'react'

import PropTypes from 'prop-types'
// import { Button, Glyphicon, Modal } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

import Inspection from './Inspection'
import Assignment from './Assignment'

import { kaizenFetch } from './utilities'

const styles = {
	button: {
		padding: "0.3em",
		cursor: "pointer",
		width: "25%",
		margin: "0.3em",
		borderRadius: "0.2em",
		backgroundColor: "rgba(255, 0, 255, 0.5)",
		color: "white"
	},
	container: {
		padding: "0.7em",
		backgroundColor: "white"
	},
	pane: {
		height: "100%",
		width: "50%"
	},
	header: {
		color: "lightsteelblue"
	}
}

export default class Home extends React.Component {
	static propTypes = {
		getInspections: PropTypes.func,
		inspections: PropTypes.array,
		loading: PropTypes.bool
	}

	constructor (props) {
		super(props)

		this.getInspections = this.getInspections.bind(this)
		this.getAssignments = this.getAssignments.bind(this)
	}

	state = { inspections: [], assignments: [], loading: true }

	componentDidMount () { 
		this.getInspections() 
		this.getAssignments()
	}

	async getInspections () { 
		this.setState({ loading: true })
		let inspections = await kaizenFetch("GET")("inspections")()
		inspections = inspections ? await inspections.json() : []
		this.setState({
			inspections,
			loading: false
		})
	}

	async getAssignments () {
		this.setState({ loading: true })
		let assignments = await kaizenFetch("GET")("assign")()
		assignments = assignments ? await assignments.json() : []
		this.setState({
			assignments,
			loading: false
		})		
	}

  render () {
	return (
		<div style={ { display: "flex", alignItems: "stretch" } }>
			<div style={ styles.pane } >
				<h1 style={ styles.header } >THESE ARE YOUR CURRENT INSPECTIONS</h1>
				{ 
					!this.state.loading && this.state.inspections.length > 0 && this.state.inspections.map((inspection, i) => (
						<div key={ i } style={ styles.container } ><Inspection
							onClick={ console.log("clicked inspection") } 
							inspection={ inspection } 
						/></div>
					)) 
				}
				<div style={ styles.button } onClick={ this.getInspections } >Refresh the List</div>
			</div>
			<div style={ styles.pane } >
				<h1 style={ styles.header } >THESE ARE INSPECTIONS YOU HAVE ASSIGNED TO CONTRACTORS</h1>
				{
					!this.state.loading && this.state.assignments.length > 0 && this.state.assignments.map((assigned, i) => 
						<div key={ i } >
							<Assignment assignment={ assigned } onClick={ console.log("clicked assignment") } />
						</div>
					)
				}
				<div style={ styles.button } onClick={ this.getAssignments } >Refresh the List</div>
			</div>
		</div>
	)
  }
}