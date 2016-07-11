import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import FontAwesome from 'react-fontawesome'
import NothingFound from '../nothing_found/nothing_found'
import { deleteApi, requestApis, clearError, requestDetail } from '../../action_creators'
import { SpinnerContainer } from '../spinner/spinner'
import { ErrorContainer } from '../error/error'
import './styles.scss'

export class Api extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handleDelete(e) {
    console.log(e);
    e.preventDefault()
    // let id = e.currentTarget.id
    // if (confirm('Are you sure you want to delete this Api Document?')) {
    //   this.props.dispatch(deleteApi(id.substr(id.indexOf('_') + 1)))
    // }
  }

  clearError() {
    this.props.dispatch(clearError())
  }

  componentDidMount() {
    this.props.dispatch(requestApis())
  }

  handleViewDetail(apiId){
    window.location = `#/view/${apiId}`
  }

  render() {
    if (this.props.apiList === undefined || this.props.apiList.size === 0) {
      return (
        <div>
          <SpinnerContainer />
          <NothingFound message="No documents created yet :'(" link="/add/"></NothingFound>
        </div>
      )
    }
    const apiNode = this.props.apiList.map((item, index) => {
      const apiId = item.get('apiId')
      const apiTitle = item.get('title')
      // onClick={() => { this.redirectToView(apiId, apiTitle) }}
      return (
        <div className="api" key={apiId} title={apiTitle} onClick={this.handleViewDetail.bind(this, apiId)}>
          <FontAwesome className="deleteApiIcon" id={ 'delete_' + apiId } onClick={this.handleDelete.bind(this)} title="Delete this document" name="trash"/>
          <div className="title">{apiTitle}</div>
        </div>
      )
    })
    return (
      <div className="container">
        <ErrorContainer clearError={this.clearError.bind(this)}/>
        <SpinnerContainer />
        <div className="apiList">
          {apiNode}
        </div>
      </div>
    )
  }
}

Api.propTypes = {
  apiList: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    apiList: state.get('apis')
  }
}

export const ApisContainer = connect(mapStateToProps)(Api)

