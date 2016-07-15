import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import './styles.scss'

export class Error extends Component {
  render() {
    if (this.props.message) {
      return (
        <div className="error">
          <div className="error-content">
            <i clasName="fa fa-exclamation-circle"/>
            {this.props.message}
            <i className="fa fa-times error-close" onClick={this.props.clearError} title="Cose message"/>
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
  message: PropTypes.string,
  clearError: PropTypes.func
}