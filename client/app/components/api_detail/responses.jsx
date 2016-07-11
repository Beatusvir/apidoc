import React, {Component} from 'react';

class Responses extends Component {
  constructor(props){
    super(props)
  }
  render() {
    if (this.props.responses === undefined || this.props.responses.length === 0) {
      return (
        <div>No responses</div>
      )
    }
    const responseNode = this.props.responses.map((item, index) => {
      return (
        <li>
          <p><strong>Code:</strong>&nbsp;{item.get('code') }</p>
          <p><strong>Content:</strong>&nbsp;<span className="code">{item.get('content') }</span></p>
        </li>
      )
    })
    return (
      <ul className="responses">
        {responseNode}
      </ul>
    );
  }
}

export default Responses