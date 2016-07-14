import React, {Component, PropTypes} from 'react';

class Parameters extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.parameters === undefined || this.props.parameters.size === 0) {
      return (
        <div>
          None
        </div>
      )
    }
    const parameterRequired = this.props.parameters.filter((parameter) => parameter.get('required') === 1 ).map((item, index) => {
      return (
        <div key={index} className="parameter">
          <p><span className="code">{item.get('content')}</span></p>
        </div>
      )
    })
    const parameterOptional = this.props.parameters.filter((parameter) => parameter.get('required') !== 1).map((item, index) => {
      return (
        <div key={index} className="parameter">
          <p><span className="code">{item.get('content')}</span></p>
        </div>
      )
    })
    return (
      <div className="parameters">
        <p><strong>Required: </strong></p>
        {parameterRequired}
        <p><strong>Optional: </strong></p>
        {parameterOptional}
      </div>
    );
  }
}

Parameters.propTypes = {
  parameters: PropTypes.object.isRequired
}

export default Parameters;