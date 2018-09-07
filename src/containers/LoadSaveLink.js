import { connect } from 'react-redux'
import { loadSaveClick } from '../actions'
import Button from '../components/Button'

const mapStateToProps = (state, ownProps) => ({
  className: ownProps.className
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(loadSaveClick(ownProps.buttonId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
