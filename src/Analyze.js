import React from 'react'

// import PropTypes from 'prop-types'
// import { Button, Glyphicon, Modal } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

import Data from './Data'

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

// ANALYZE INSPECTIONS WITH DATA SCIENCE
export default class Analyze extends React.Component {
	static propTypes = {}

	constructor (props) {
		super(props)

		this.getData = this.getData.bind(this)
	}

	state = { loading: false, data: [] }

	componentDidMount () {
		this.getData()
	}

	async getData () {
		this.setState({ loading: true })
		let data = await (await kaizenFetch("GET")("data")()).json()
		this.setState({ data, loading: false })
	}

	render () {
		return (
			<div>
				<h1>THESE VISUALIZATIONS SHOW AGGREGATE INFORMATION ABOUT DATA YOU HAVE COLLECTED</h1>
				<div>
					{ !this.state.loading && this.state.data && this.state.data.length > 0 && this.state.data.map((d, i) => (
						<div><Data
							onClick={ console.log("clicked network") } 
							data={ d } 
							key={ i } 
						/></div>
					)) }
				</div>
				<div style={ styles.button } onClick={ this.getData } >Refresh</div>
			</div>
		)
	}
}

// Analyze.propTypes = {
// 	getInspections: PropTypes.func,
// 	inspections: PropTypes.array,
// 	loading: PropTypes.boolean
// }