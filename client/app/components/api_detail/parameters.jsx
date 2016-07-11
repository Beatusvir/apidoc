import React, {Component} from 'react';

class Parameters extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const parameterNode = this.props.parameters.map((item, index) => {
      if (item.get('required') === 1){
        return (
          <div>
            <p><strong>Required:</strong></p>
            <p>{item.get('content')}</p>
          </div>
        )
      }
      return (
        <div>
          {item.get('content')}
        </div>
      )
    })
    return (
      <div>
        {parameterNode}
      </div>
    );
  }
}

export default Parameters;