import React from 'react'
import PropTypes from 'prop-types'

const Control = ({className, buttonId, children, onClick }) => (
    <button className={className} onClick={onClick}>
      {children}
    </button>
)

Control.propTypes = {
  buttonId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Control
