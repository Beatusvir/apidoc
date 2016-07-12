import React, {Component, PropTypes} from 'react';

class Parameters extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.parameters === undefined || this.props.parameters.size === 0){
      return (
        <div>
          No parameters
        </div>
      )
    }
    const parameterNode = this.props.parameters.map((item, index) => {
      if (item.get('required') === 1){
        return (
          <div key={index} className="parameter">
            <p><strong>Required:</strong></p>
            <p>{item.get('content')}</p>
          </div>
        )
      }
      return (
        <div key={index} className="parameter">
          {item.get('content')}
        </div>
      )
    })
    return (
      <div className="parameters">
        {parameterNode}
      </div>
    );
  }
}

Parameters.propTypes = {
  parameters: PropTypes.object.isRequired
}

export default Parameters;