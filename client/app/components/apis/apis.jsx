import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

export default class Api extends Component {
  render() {
    const apiNode = this.props.apiList.map(function(item, index){
      return (
        <div className="apiItem" key={index}>
          {item.title}
          {item.description}
          {item.created}
          {item.updated}
        </div>
      )
    })
    return (
      <div className="apiList">
        {apiNode}
      </div>
    )
  }
}

