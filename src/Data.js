import React from 'react'

import PropTypes from 'prop-types'
// import { Button, Glyphicon, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// import { kaizenFetch } from './utilities'

const styles = {
	data: {
		padding: "0.3em"
	}
}

const Data = ({ data, onClick }) => (
	<Link to={ `/detailed/${data}` } onClick={ onClick } style={ styles.data } >{ data }</Link>
)

Data.propTypes = {
	data: PropTypes.string,
	onClick: PropTypes.func
}

export default Data