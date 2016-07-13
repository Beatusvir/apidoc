import React, {Component} from 'react'
import {connect} from 'react-redux'
import './styles.scss'

export default class Spinner extends Component {
  render() {
    return (
      <div className="spinner"/>
    )
  }
}

// Spinner.propTypes = {
//   isFetching: React.PropTypes.bool
// }

// const mapStateToProps = (state) => {
//   return {
//     isFetching: state.get('isFetching')
//   }
// }

// export const SpinnerContainer = connect(mapStateToProps)(Spinner)