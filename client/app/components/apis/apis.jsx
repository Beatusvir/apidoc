// Modules
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import FontAwesome from 'react-fontawesome'

// Components
import NothingFound from '../nothing_found/nothing_found'
import Spinner from '../spinner/spinner'
import { Error } from '../error/error'
import Modal from '../modal/modal'

// Code, styles
import { selectApi, clearError, apisDeleteRequest, apisDetailRequest } from '../../actions/actions'
import './styles.scss'

export class Api extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handleDelete(apiId) {
    if (confirm('Are you sure you want to delete this Api Document?')) {
      this.props.dispatch(apisDeleteRequest(apiId))
    }
  }

  clearError() {
    this.props.dispatch(clearError())
  }

  handleViewDetail(apiId, apiTitle) {
    this.props.dispatch(selectApi(apiId, apiTitle))
    window.location = `#/view/${apiId}`
  }

  render() {
    if (this.props.isFetching) {
      return (
        <Spinner isFetching={this.props.isFetching}/>
      )
    }
    if(this.props.error) {
      return (
        <Error message={this.props.error} clearError={this.clearError.bind(this)}/>
      )
    }
    if (this.props.apiList === undefined || this.props.apiList.size === 0) {
      return (
        <div>
          <NothingFound message="No API documents created yet :'(" link="/add/"></NothingFound>
        </div>
      )
    }
    const apiNode = this.props.apiList.map((item, index) => {
      const apiId = item.get('apiId')
      const apiTitle = item.get('title')
      return (
        <div className="api" key={index} title={apiTitle} onClick={() => this.handleViewDetail(apiId, apiTitle) }>
          <FontAwesome className="deleteApiIcon" id={ 'delete_' + apiId } onClick={() => this.handleDelete(apiId) } title="Delete this document" name="trash"/>
          <div className="title">{apiTitle}</div>
        </div>
      )
    })
    return (
      <div className="container">
        <Modal showing={true}/>
        <div className="apiList">
          {apiNode}
        </div>
      </div>
    )
  }
}

Api.propTypes = {
  apiList: PropTypes.object,
  isFetching: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    apiList: state.get('apis'),
    isFetching: state.get('isFetching'),
    error: state.get('error')
  }
}

export const ApisContainer = connect(mapStateToProps)(Api)

