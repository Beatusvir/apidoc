// Modules
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import FontAwesome from 'react-fontawesome'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// Components
import NothingFound from '../nothing_found/nothing_found'
import Spinner from '../spinner/spinner'
import { Error } from '../error/error'
import Modal, { modalType, modalButtons } from '../modal/modal'
import { FilterContainer } from '../filter/filter'

// Code, styles
import { selectApi, clearError, apisDeleteRequest, apisDetailRequest } from '../../actions/actions'
import './styles.scss'

export class Api extends Component {
  constructor(props) {
    super(props)
    this.state = ({ apiId: null, apiTitle: null, modalShow: false })
    this.modelCallback = this.modelCallback.bind(this)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handleApiClick(apiId, apiTitle, e) {
    this.setState({ apiId: apiId, apiTitle: apiTitle })
    switch (e.target.nodeName) {
      case 'SPAN':
        this.setState({ modalShow: true })
        break
      case 'DIV':
        this.props.dispatch(selectApi(apiId, apiTitle))
        window.location = `#/view/${apiId}`
        break
    }
  }

  modelCallback(e) {
    switch (e.target.nodeName) {
      case 'SPAN':
        this.setState({ modalShow: false })
        break
      case 'BUTTON':
        if (e.target.id === 'button-modal-ok') {
          this.setState({ modalShow: false })
          this.props.dispatch(apisDeleteRequest(this.state.apiId))
        } else if (e.target.id === 'button-modal-cancel') {
          this.setState({ modalShow: false })
        }
        break
      default:
        break
    }
  }

  render() {
    if (this.props.isFetching) {
      return (
        <Spinner isFetching={this.props.isFetching}/>
      )
    }
    if (this.props.error) {
      return (
        <Error message={this.props.error} clearError={this.clearError.bind(this) }/>
      )
    }
    // if (this.props.apiList === undefined || this.props.apiList.size === 0) {
    //   return (
    //     <div>
    //       <NothingFound message="No API documents created yet :'(" link="/add/"></NothingFound>
    //     </div>
    //   )
    // }
    const apiNode = this.props.apiList.map((item, index) => {
      const apiId = item.get('apiId')
      const apiTitle = item.get('title')
      const apiDescription = item.get('description')
      return (
        <div className="api" key={index} title={apiTitle} onClick={this.handleApiClick.bind(this, apiId, apiTitle) }>
          <FontAwesome className="deleteApiIcon" id={ 'delete_' + apiId } title="Delete this document" name="trash"/>
          <div className="title">{apiTitle}</div>
          <div className="description">{apiDescription}</div>
        </div>
      )
    })
    return (
      <div className="container">
        <Modal
          showing={this.state.modalShow}
          callback={this.modelCallback}
          type={modalType.CONFIRM}
          buttons={modalButtons.OKCANCEL}
          header={this.state.apiTitle}
          message="Are you sure you want to delete this api document?"
          />
        <FilterContainer/>
        <div className="apiList">
          <ReactCSSTransitionGroup transitionName="apis" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            {apiNode}
          </ReactCSSTransitionGroup>
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
    apiList: state.get('filteredApis'),
    isFetching: state.get('isFetching'),
    error: state.get('error')
  }
}

export const ApisContainer = connect(mapStateToProps)(Api)

