import React from 'react'

import PropTypes from 'prop-types'
// import { Button, Glyphicon, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// import { kaizenFetch } from './utilities'

const styles = {
	learning: {
		padding: "0.3em"
	}
}

const Learning = ({ learning, onClick }) => (
	<Link to={ `/detailed/${learning}` } onClick={ onClick } style={ styles.learning } >{ learning }</Link>
)

Learning.propTypes = {
	learning: PropTypes.string,
	onClick: PropTypes.func
}

export default Learning