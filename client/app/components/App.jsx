// Modules
import React from 'react'
import {List} from 'immutable'

// Components
import NavBar from './navbar/navbar'
import { ErrorContainer } from './error/error'

export default React.createClass({
  render: function() {
    return (
      <div className="container">
        <NavBar />
        {this.props.children}
        <ErrorContainer />
      </div>
    )
  }
})


