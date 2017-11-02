import React from 'react'

import PropTypes from 'prop-types'
// import { Button, Glyphicon, Modal } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

import Inspection from './Inspection'

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
	}

	state = { inspections: [], loading: true }

	componentDidMount () { this.getInspections() }

	async getInspections () { 
		this.setState({ loading: true })
		let inspections = await kaizenFetch("GET")("inspections")()
		inspections = inspections ? await inspections.json() : []
		this.setState({
			inspections,
			loading: false
		})
	}

  render () {
	return (
		<div>
			<h1>THESE ARE YOUR CURRENT INSPECTIONS</h1>
			<h3>Select one to view details</h3>
			<div>
				{ !this.state.loading && this.state.inspections.length > 0 && this.state.inspections.map((inspection, i) => (
					<div key={ i } ><Inspection
						onClick={ console.log("clicked inspection") } 
						inspection={ inspection } 
					/></div>
				)) }
			</div>
			<div style={ styles.button } onClick={ this.getInspections } >Refresh the List</div>
		</div>
	)
  }
}