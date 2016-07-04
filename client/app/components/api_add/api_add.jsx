import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import { ApiAddDetailContainer } from '../api_add_detail/api_add_detail'
import { SpinnerContainer } from '../spinner/spinner'
import FontAwesome from 'react-fontawesome'
import { addApi } from '../../action_creators'
import { store } from '../../index'
import './styles.scss'

export class ApiAdd extends Component {
  constructor(props) {
    super(props)
    this.state = { title: props.title, addDetail: false }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  cancelAdding() {
    this.setState({ value: this.props.api })
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

  handleSubmit(event) {
    const input = ReactDOM.findDOMNode(this.refs.apiInput)
    const title = input.value
    store.dispatch(addApi(title))
    if (confirm('While you are here, why don\'t you add some methods to your api?')) {
      this.setState({ addDetail: true })
    } else {
      // TODO redirect to '/'
    }
  }

  render() {
    if (this.state.addDetail) {
      return (
        <ApiAddDetailContainer title={this.state.value}/>
      )
    }
    return (
      <div className="container">
        <SpinnerContainer />
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
              <button className="button-add" type="submit"><FontAwesome name="floppy-o"/>Save</button>
              <button className="button-cancel"><FontAwesome name="ban"/>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

ApiAdd.propTypes = {
  title: React.PropTypes.string,
  insertedId: React.PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    insertedId: state.insertedId
  }
}

export const ApiAddContainer = connect(mapStateToProps)(ApiAdd)
