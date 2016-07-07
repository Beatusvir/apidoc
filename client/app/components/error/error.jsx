import React, {Component, PropTypes} from 'react'
import FontAwesome from 'react-fontawesome'
import {connect} from 'react-redux'
import './styles.scss'

export class Error extends Component {
  render() {
    if (this.props.message) {
      return (
        <div className="error">
          <div className="error-content">
            <FontAwesome name="exclamation-circle"/>
            {this.props.message}
            <FontAwesome className="error-close" name="times" onClick={this.props.clearError} title="Cose message"/>
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

const mapStateToProps = (state) => {
  return {
    message: state.get('lastError')
  }
}

export const ErrorContainer = connect(mapStateToProps)(Error)