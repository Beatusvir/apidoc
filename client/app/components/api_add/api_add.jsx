import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import uuid from 'node-uuid'
import {connect} from 'react-redux'
import { ApiAddDetailContainer } from '../api_add_detail/api_add_detail'
import { SpinnerContainer } from '../spinner/spinner'
import FontAwesome from 'react-fontawesome'
import { addApi, setSelectedApi } from '../../action_creators'
import './styles.scss'

export class ApiAdd extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  cancelAdding() {
    //return this.props.cancelAdding()
  }

  handleKeyDown(e) {
    // switch (e.key) {
    //   case 'Enter':
    //     return this.props.doneAdding(this.state.value)
    //   case 'Escape':
    //     return this.cancelAdding()
    // }
  }

  handleOnBlur(e) {
    //return this.cancelAdding()
  }

  handleOnChange(e) {
    this.setState({ value: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    switch (e.target.id) {
      case 'button-save':
        {
          const input = ReactDOM.findDOMNode(this.refs.apiInput)
          const title = input.value
          if (!title) break;
          const apiId = uuid.v4()
          const newApi = {
            title, apiId
          }
          this.props.dispatch(addApi(newApi))
          if (confirm('While you are here, why don\'t you add some methods to your api?')) {
            this.props.dispatch(setSelectedApi(apiId, title))
            window.location = '#/add/detail/'
            this.setState({ addDetail: true })
          } else {
            window.location = '#/'
          }
        }
        break;
      case 'button-cancel':
        {
          window.history.back()
        }
        break;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="api-add">
          <form onSubmit={this.handleSubmit.bind(this) } className="form-add">
            <div className="input-group">
              <label htmlFor="input-title">Title </label>
              <input
                type="text"
                id="input-title"
                ref="apiInput"
                autoFocus={true}
                onKeyDown={this.handleKeyDown.bind(this) }
                onChange={this.handleOnChange.bind(this) }
                onBlur={this.handleOnBlur.bind(this) }
                />
            </div>
            <div className="input-group">
              <button id="button-save" className="button-add" onClick={this.handleSubmit.bind(this) }><FontAwesome name="floppy-o"/>Save</button>
              <button id="button-cancel" className="button-cancel" onClick={this.handleSubmit.bind(this) }><FontAwesome name="ban"/>Cancel</button>
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

