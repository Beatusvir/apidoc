import React, {Component, PropTypes} from 'react';

class ParamItem extends Component {
  constructor(props) {
    super(props)
    this.state = ({ id: this.props.id })
  }
  render() {
    return (
      <div className="input-group" id={this.state.id}>
        <div className="flex-2">
          <input type="checkbox" id={`inputRequired_${this.state.id}`}/>&nbsp;Required
        </div>
        <input
          className="flex-8"
          type="text"
          ref={`param_${this.state.id}`}
          id={`inputParam_${this.state.id}`}
          placeholder="Parameter"/>
      </div>
    );
  }
}

ParamItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default ParamItem