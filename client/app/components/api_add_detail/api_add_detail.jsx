import React, {Component, PropTypes} from 'react'
import { addApiMethod } from '../../action_creators'
import { store } from '../../index'
import './styles.scss'

class ApiAddDetail extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    const title = this.refs.title
    const description = this.refs.description
    const apiMethod = {
      title, description
    }
    store.dispatch(addApiMethod(apiMethod))
  }


  render() {
    return (
      <div className="api-add-detail">
        <div>{this.props.api}</div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <label htmlFor="inputTitle">Title</label>
            <input type="text" ref="title" id="inputTitle" />
          </div>
          <div className="input-group">
            <label htmlFor="inputDescription">Description</label>
            <input type="text" ref="description" id="inputDescription" />
          </div>
          <button>Save</button>
        </form>
      </div>
    )
  }
}

ApiAddDetail.propTypes = {
  api: PropTypes.string
}

export default ApiAddDetail