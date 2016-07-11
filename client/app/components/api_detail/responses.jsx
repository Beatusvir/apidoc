import React, {Component, PropTypes} from 'react';

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
        <li key={index}>
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

Responses.propTypes = {
  responses: PropTypes.object.isRequired
}

export default Responses