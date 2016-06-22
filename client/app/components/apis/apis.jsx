import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

export default class Api extends Component {
  constructor(props){
    super(props)
    this.state = { apiList: props.apiList }
  }
  render() {
    const apiNode = this.props.apiList.map(function(item, index){
      return (
        <div className="apiItem" key={index}>
          {item}
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

Api.propTypes = {
  apiList: PropTypes.array
}
