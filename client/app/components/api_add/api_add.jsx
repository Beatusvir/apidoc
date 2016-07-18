// Modules
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import uuid from 'node-uuid'
import {connect} from 'react-redux'

// Components
import { SpinnerContainer } from '../spinner/spinner'
import Modal, { modalType, modalButtons } from '../modal/modal'

// Code, styles
import { selectApi, fetchAddApi } from '../../actions/actions'
import './styles.scss'

export class ApiAdd extends Component {
  constructor(props) {
    super(props)
    this.state = ({ modalShow: false, title: null })
    this.submitNewApi = this.submitNewApi.bind(this)
    this.cancelAdding = this.cancelAdding.bind(this)
    this.modalCallback = this.modalCallback.bind(this)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  modalCallback(e) {
    switch (e.target.nodeName) {
      case 'SPAN':
        this.setState({ modalShow: false })
        break
      case 'BUTTON':
        if (e.target.id === 'button-modal-ok') {
          this.setState({ modalShow: false })
          window.location = '#/add/detail/'
        } else if (e.target.id === 'button-modal-cancel') {
          window.location = '#/'
          this.setState({ modalShow: false })
        }
        break
      default:
        break
    }
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
    const newApi = {
      title, description
    }
    this.props.dispatch(fetchAddApi(newApi))
    this.setState({ modalShow: true, title })
  }

  render() {
    return (
      <div className="api-add">
        <Modal
          showing={this.state.modalShow}
          callback={this.modalCallback}
          type={modalType.CONFIRM}
          buttons={modalButtons.OKCANCEL}
          header="Add API Document"
          message="While you are here why don't you add a method call to your new api?"
          />
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
            <button type="button" id="button-save" className="button-add" onClick={this.handleSubmit.bind(this) }><i className="fa fa-floppy-o"/>Save</button>
            <button type="button" id="button-cancel" className="button-cancel"><i className="fa fa-ban"/>Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}

ApiAdd.propTypes = {

}

const mapStateToProps = (state) => {
  return {
    
  }
}

export const ApiAddContainer = connect(mapStateToProps)(ApiAdd)

