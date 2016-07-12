import React, {Component} from 'react'
import {connect} from 'react-redux'
import './styles.scss'

export class Spinner extends Component {
  render() {
    if (this.props.isFetching) {
      return (
        <div className="spinner">
          updating...
        </div>
      )
    }
    return (
        <div className="spinner hide">
          updating...
        </div>
      )
  }
}

Spinner.propTypes = {
  isFetching: React.PropTypes.bool
}

// const mapStateToProps = (state) => {
//   return {
//     isFetching: state.get('isFetching')
//   }
// }

// export const SpinnerContainer = connect(mapStateToProps)(Spinner)