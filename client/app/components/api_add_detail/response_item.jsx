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
              <label htmlFor={responseItemCode}>Code</label>
              <input type="text" name={responseItemCode}/>
            </div>
            <div className="input-group">
              <label htmlFor={responseItemCode}>Content</label>
              <input type="text" name={responseItemCode}/>
            </div>
            <FontAwesome className="icon-delete" name="minus-circle"/>
          </div>
        )
      }
      return result
    }

    return (
      <div className="response-container">
      {responseItemNode(this.props.count)}
      </div>
    )
  }
}

ReponseItem.propTypes = {
  count: PropTypes.number.isRequired
}

export default ReponseItem