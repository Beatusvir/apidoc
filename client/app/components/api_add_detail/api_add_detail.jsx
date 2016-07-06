import React, {Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { addApiClass } from '../../action_creators'
import { store } from '../../index'
import './styles.scss'

class ApiAddDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { title: props.title, id: props.id }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentWillMount() {
    console.log(this.params)
  }

  handleSubmit(event) {
    const title = ReactDOM.findDOMNode(this.refs.title).value
    const description = ReactDOM.findDOMNode(this.refs.description).value
    const apiClass = {
      apiId: this.state.id, title, description
    }
    console.log(apiClass)
    store.dispatch(addApiClass(apiClass))
  }

  render() {
    return (
      <div className="api-add-detail">
      <h1>{this.props.title}</h1>
        <div>{this.props.api}</div>
        <form className="form-api-add-detail" onSubmit={this.handleSubmit.bind(this)}>
          <div className="input-group">
            <input className="input-lg" 
              type="text" 
              ref="title" 
              id="inputTitle" 
              placeholder="Method call..."/>
          </div>
          <div className="input-group">
            <input 
              className="input-sm" 
              type="text" 
              ref="description" 
              id="inputDescription" 
              placeholder="Aditional information about your api call"/>
          </div>
          <button type="submit">Save</button>
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