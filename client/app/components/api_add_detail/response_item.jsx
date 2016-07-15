import React, {Component, PropTypes} from 'react'

class ReponseItem extends Component {
  constructor(props) {
    super(props)
    this.state = ({ id: this.props.id })
  }
  render() {
    return (
      <div className="response-item" id={this.state.id}>
        <div className="input-group">
          <label className="flex-2" htmlFor={`inputCode_${this.state.id}`}>Code</label>
          <input
            className="flex-8"
            type="text"
            ref={`code_${this.state.id}`}
            id={`inputCode_${this.state.id}`}
            placeholder="Status code"/>
        </div>
        <div className="input-group">
          <label className="flex-2" htmlFor={`inputContent_${this.state.id}`}>Content</label>
          <input
            className="flex-8"
            type="text"
            ref={`content_${this.state.id}`}
            id={`inputContent_${this.state.id}`}
            placeholder="Reponse content"/>
        </div>
      </div>
    )
  }
}

ReponseItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default ReponseItem