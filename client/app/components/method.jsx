import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import ApiItems from './api-items'

export default class method extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="method">
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
        <ApiItems items={this.props.apiItems}/>
      </div>
    )
  }
}

method.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  apiItems: React.PropTypes.array
}