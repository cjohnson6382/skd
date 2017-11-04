import React from 'react'

import PropTypes from 'prop-types'
// import { Button, Glyphicon, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// import { kaizenFetch } from './utilities'

const styles = {
	link: {
		textDecoration: "none",
		fontWeight: "bold",
		fontSize: "125%",
		paddingTop: "0.3em",
		width: "90%",
		color: "white"
	},
	linkContainer: {
		paddingTop: "0.6em",
		paddingLeft: "0.5em",
		paddingBottom: "0.5em",
		width: "90%"
	},
	sidebar: {
		textAlign: "left"
	},
	divider: {
		paddingTop: "3em",
	}
}

const Sidebar = ({ auth }) => (
	<div style={ styles.sidebar } >
		<div style={ styles.linkContainer } ><Link to="/" style={ styles.link } >Manage</Link></div>
		<div style={ styles.linkContainer } ><Link to="/assign" style={ styles.link } >Assign</Link></div>
		<div style={ styles.linkContainer } ><Link to="/analyze" style={ styles.link } >Data Insights</Link></div>
		<div style={ styles.linkContainer } ><Link to="/learn" style={ styles.link } >Learn</Link></div>
		<div style={ { ...styles.linkContainer, ...styles.divider } } ><Link to="/new" style={ styles.link } >Add Inspection</Link></div>
		<div style={ styles.linkContainer } ><Link to="/newcontractor" style={ styles.link } >Add Contractor</Link></div>
		<div style={ styles.linkContainer } ><Link to="/newsite" style={ styles.link } >Add Site</Link></div>
		<div style={ { ...styles.linkContainer, ...{ cursor: "pointer" }, ...styles.divider } } >
			{ auth.isAuthenticated() ?
					<div style={ styles.link } onClick={ auth.logout } >Sign Out</div>
				:
					<div style={ styles.link } onClick={ auth.login } >Sign In</div>
			}
		</div>
	</div>
)

Sidebar.propTypes = { auth: PropTypes.object }

export default Sidebar