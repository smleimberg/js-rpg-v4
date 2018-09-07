import { connect } from 'react-redux'
import { deleteSaveClick } from '../actions'
import Button from '../components/Button'

const mapStateToProps = (state, ownProps) => ({
  className: ownProps.className
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(deleteSaveClick(ownProps.buttonId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
