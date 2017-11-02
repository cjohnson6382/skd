import React from 'react'

import PropTypes from 'prop-types'
// import { Button, Glyphicon, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// import { kaizenFetch } from './utilities'

const styles = {
	inspection: {
		padding: "0.3em"
	}
}

const Inspection = ({ inspection, onClick }) => (
	<Link to={ `/detailed/${inspection.name}` } onClick={ onClick } style={ styles.inspection } >{ inspection.name }</Link>
)

Inspection.propTypes = {
	inspection: PropTypes.object,
	onClick: PropTypes.func
}

export default Inspection