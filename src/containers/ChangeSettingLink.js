import { connect } from 'react-redux'
import { changeSetting } from '../actions'
import Button from '../components/Button'

const mapStateToProps = (state, ownProps) => ({
  className: ownProps.className
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(changeSetting(ownProps.buttonId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
