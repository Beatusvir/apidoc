// Modules
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import uuid from 'node-uuid'
import {connect} from 'react-redux'
import FontAwesome from 'react-fontawesome'

// Components
import { SpinnerContainer } from '../spinner/spinner'

// Code, styles
import { selectApi, apisAddRequest } from '../../actions/actions'
import './styles.scss'

export class ApiAdd extends Component {
  constructor(props) {
    super(props)
    this.submitNewApi = this.submitNewApi.bind(this)
    this.cancelAdding = this.cancelAdding.bind(this)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handleTitleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
        this.submitNewApi()
        break;
      case 'Escape':
        this.cancelAdding()
        break;
    }
  }

  handleDescriptionKeyDown(e) {
    switch (e.key) {
      case 'Enter':
        this.submitNewApi()
        break;
      case 'Escape':
        this.cancelAdding()
        break;
    }
  }

  handleOnBlur(e) {
    //return this.cancelAdding()
  }

  handleOnChange(e) {
    this.setState({ value: e.target.value })
  }

  cancelAdding(e) {

  }

  handleSubmit(e) {
    e.preventDefault()
    this.submitNewApi()
  }

  submitNewApi() {
    const title = ReactDOM.findDOMNode(this.refs.apiTitle).value
    const description = ReactDOM.findDOMNode(this.refs.apiDescription).value
    if (!title || !description) return;
    const apiId = uuid.v4()
    const newApi = {
      title, description,  apiId
    }
    this.props.dispatch(apisAddRequest(newApi))
    if (confirm('While you are here, why don\'t you add some methods to your api?')) {
      this.props.dispatch(selectApi(apiId, title))
      window.location = '#/add/detail/'
    } else {
      window.location = '#/'
    }
  }

  render() {
    return (
      <div className="container">
        <div className="api-add">
          <form id="form-api-add" className="form-add">
            <div className="input-group">
              <label htmlFor="input-title">Title</label>
              <input
                type="text"
                id="input-title"
                ref="apiTitle"
                autoFocus={true}
                onKeyDown={this.handleTitleKeyDown.bind(this) }
                />
            </div>
            <div className="input-group">
              <label htmlFor="input-title">Description</label>
              <textarea
                rows="5"

                id="input-description"
                ref="apiDescription"
                onKeyDown={this.handleDescriptionKeyDown.bind(this) }
                />
            </div>
            <div className="input-group">
              <button type="button" id="button-save" className="button-add" onClick={this.handleSubmit.bind(this)}><FontAwesome name="floppy-o"/>Save</button>
              <button type="button" id="button-cancel" className="button-cancel"><FontAwesome name="ban"/>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

ApiAdd.propTypes = {

}

const mapStateToProps = (state) => {
  return {
    selectedApiId: state.selectedApiId
  }
}

export const ApiAddContainer = connect(mapStateToProps)(ApiAdd)

