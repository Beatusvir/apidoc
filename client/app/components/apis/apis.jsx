import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import FontAwesome from 'react-fontawesome'
import NothingFound from '../nothing_found/nothing_found'
import { store } from '../../index'
import { deleteApi } from '../../action_creators'
import './styles.scss'

export class Api extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handleDelete(e) {
    e.preventDefault()
    let id = e.currentTarget.id
    console.log(id.substr(id.indexOf('_') + 1))
    if (confirm('Are you sure you want to delete this Api Document?')) {
      store.dispatch(deleteApi(id.substr(id.indexOf('_') + 1)))
    }
  }

  render() {
    if (this.props.apiList === undefined || this.props.apiList.size == 0) {
      return (
        <NothingFound message="No documents created yet :'(" link="/add/"></NothingFound>
      )
    }
    const apiNode = this.props.apiList.map((item, index) => {
      const apiId = item.get('apiId')
      const link = '/detail/' + apiId
      return (
        <Link to={link} className="api" key={apiId}>
          <div className="deleteApiIcon" id={ 'delete_' + apiId } onClick={this.handleDelete.bind(this)}><FontAwesome name="trash"/></div>
          {item.get('title') }
        </Link>
      )
    })
    return (
      <div className="apiList">
        {apiNode}
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

