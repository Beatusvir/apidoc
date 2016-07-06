import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import './styles.scss'

export default class apiItems extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    var itemNode = this.props.items.map(function (item, index) {
      return (
        <li className="apiDetailItem" key={index}>
          <h3>{item.get('title')}</h3>
          <p>{item.get('content')}</p>
        </li>
      )
    })
    return (
      <ul className="">
        {itemNode}
      </ul>
    )
  }
}

apiItems.propTypes = {
    items: React.PropTypes.object
}