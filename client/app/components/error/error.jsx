import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { clearError } from '../../actions/actions'
import './styles.scss'

export class Error extends Component {
  handleClearError(e){
    this.props.dispatch(clearError())
  }
  render() {
    if (this.props.error) {
      return (
        <div className="error">
          <div className="error-content">
            <i clasName="fa fa-exclamation-circle"/>
            {this.props.error}
            <i className="fa fa-times error-close" onClick={this.handleClearError.bind(this)} title="Cose message"/>
          </div>
        </div>
      )
    }
    return (
      <div className="error hide">
        no error
      </div>
    )
  }
}

Error.propTypes = {
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    error: state.get('error')
  }
}

export const ErrorContainer = connect(mapStateToProps)(Error)