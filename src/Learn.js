import React from 'react'

import PropTypes from 'prop-types'
import { Button, Glyphicon, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
	}
}

// LEARN HOW TO IMPROVE INSPECTION QUALITY
export default class Learn {
	static propTypes = {}

	constructor (props) {
		super(props)

		this.getLearning = this.getLearning.bind(this)
	}

	state = { loading: false, learning: [] }

	componentDidMount () {
		this.getLearning()
	}

	async getLearning () {
		this.setState({ loading: true })
		let learning = await (await kaizenFetch("learning")("GET")()).json()
		this.setState({ learning, loading: false })
	}

	return (
		<div>
			<h1>THESE ARTICLES DESCRIBE HOW TO IMPROVE YOUR INSPECTIONS</h1>
			<div>
				{ !loading && data && data.length > 0 && data.map((d, i) => (
					<div><Data
						onClick={ console.log("clicked network") } 
						data={ d } 
						key={ i } 
					/></div>
				)) }
			</div>
			<div style={ styles.button } onClick={ getData } >Refresh</div>
		</div>
	)
}