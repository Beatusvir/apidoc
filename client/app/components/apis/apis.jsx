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
    e.preventDefault()
    let id = e.currentTarget.id
    if (confirm('Are you sure you want to delete this Api Document?')) {
      this.props.dispatch(deleteApi(id.substr(id.indexOf('_') + 1)))
    }
  }

  clearError() {
    this.props.dispatch(clearError())
  }

  componentDidMount() {
    this.props.dispatch(requestApis())
  }

  redirectToView(apiId){
    this.props.dispatch(requestDetail(apiId))
    window.location = '#/view/'
  }

  render() {
    if (this.props.apiList === undefined || this.props.apiList.size == 0) {
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
      return (
        <div className="api" key={apiId} title={apiTitle} onClick={() => { this.redirectToView(apiId) }}>
          <div className="deleteApiIcon" id={ 'delete_' + apiId } onClick={() => this.handleDelete.bind(this) } title="Delete this document"><FontAwesome name="trash"/></div>
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

