import React, {Component, PropTypes} from 'react'
import FontAwesome from 'react-fontawesome'

class ReponseItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.count == 0 || this.props.count == undefined) {
      return (
        <div withStyles="display: none"></div>
      )
    }
    const responseItemNode = function (count) {
      var result = []
      for (let i = 0; i < count; i++) {
        const responseItemCode = `inputResponseItem_${i}`
        const responseItemContent = `inputResponseItem_${i}`
        result.push(
          <div className="response-item" key={i}>
            <div className="input-group">
              <label className="flex-2" htmlFor={`inputCode_${i}`}>Code</label>
              <input
                className="flex-8"
                type="text"
                ref={`code_${i}`}
                id={`inputCode_${i}`}
                placeholder="Status code"/>
            </div>
            <div className="input-group">
              <label className="flex-2" htmlFor={`inputContent_${i}`}>Content</label>
              <input
                className="flex-8"
                type="text"
                ref={`content_${i}`}
                id={`inputContent_${i}`}
                placeholder="Reponse content"/>
            </div>
          </div>
        )
      }
      return result
    }

    return (
      <div className="response-container">
        {responseItemNode(this.props.count) }
      </div>
    )
  }
}

ReponseItem.propTypes = {
  count: PropTypes.number.isRequired
}

export default ReponseItem