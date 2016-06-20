import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'

export default class apiItems extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var itemNode = this.props.items.map(function (item, index) {
      return (
        <li className="apiItem" key={index}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
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
    items: React.PropTypes.array
}