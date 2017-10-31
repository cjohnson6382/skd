import React from 'react'

import PropTypes from 'prop-types'
import { Button, Glyphicon, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { wipiFetch } from './utilities'

const styles = {
	link: {
		textDecoration: "none",
		fontWeight: "bold",
		fontSize: "125%",
		padding: "0.3em",
		width: "100%",
		color: "white"
	},
	linkContainer: {
		padding: "0.6em",
		width: "100%"
	},
	sidebar: {
		textAlign: "left"
	}
}

const Sidebar = () => (
	<div style={ styles.sidebar } >
		<div style={ styles.linkContainer } ><Link to="/" style={ styles.link } >Manage</Link></div>
		<div style={ styles.linkContainer } ><Link to="/new" style={ styles.link } >Create</Link></div>
		<div style={ styles.linkContainer } ><Link to="/assign" style={ styles.link } >Assign</Link></div>
		<div style={ styles.linkContainer } ><Link to="/analyze" style={ styles.link } >Data Insights</Link></div>
		<div style={ styles.linkContainer } ><Link to="/learn" style={ styles.link } >Learn</Link></div>
	</div>
)

export default Sidebar