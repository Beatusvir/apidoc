import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { addApiClass } from '../../action_creators'
import { store } from '../../index'
import './styles.scss'

class ApiAddDetail extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handleSubmit() {
    const title = this.refs.title
    const description = this.refs.description
    const apiClass = {
      title, description
    }
    store.dispatch(addApiClass(apiClass))
  }

  render() {
    return (
      <div className="api-add-detail">
      <h1>{this.props.title}</h1>
        <div>{this.props.api}</div>
        <form className="form-api-add-detail" onSubmit={this.handleSubmit}>
          <div className="input-group">
            <label htmlFor="inputTitle">Title</label>
            <input type="text" ref="title" id="inputTitle" placeholder="Method call title..."/>
          </div>
          <div className="input-group">
            <label htmlFor="inputDescription">Description</label>
            <input type="text" ref="description" id="inputDescription"  placeholder="Method description..."/>
          </div>
          <button>Save</button>
        </form>
      </div>
    )
  }
}

ApiAddDetail.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    id: state.get('insertedId')
  }
}

export const ApiAddDetailContainer = connect(mapStateToProps)(ApiAddDetail)