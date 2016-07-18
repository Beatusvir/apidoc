// Modules
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// Components
import NothingFound from '../nothing_found/nothing_found'
import Spinner from '../spinner/spinner'
import { Error } from '../error/error'
import Modal, { modalType, modalButtons } from '../modal/modal'
import Filter from '../filter/filter'
import {Pager, Pagination} from '../pagination/pagination'

// Code, styles
import { selectApi, clearError, fetchDeleteApi, apisDetailRequest } from '../../actions/actions'
import './styles.scss'

export class Api extends Component {
  constructor(props) {
    super(props)
    this.state = (
      {
        apiId: null,
        apiTitle: null,
        modalShow: false,
        filter: this.props.filter,
        currentPage: 1,
        totalItemsPerPage: 5
      }
    )
    this.modalCallback = this.modalCallback.bind(this)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handlePagerOnChange(e){
    this.setState({ totalItemsPerPage: e.currentTarget.value })
  }

  handleFilterChanged(filter) {
    this.setState({ filter: filter })
  }

  handleApiClick(apiId, apiTitle, e) {
    this.setState({ apiId: apiId, apiTitle: apiTitle })
    switch (e.target.nodeName) {
      case 'I':
        this.setState({ modalShow: true })
        break
      case 'DIV':
        this.props.dispatch(selectApi(apiTitle))
        window.location = `#/view/${apiId}`
        break
    }
  }

  handleOnPageSelect(e){
    let value = +e.currentTarget.innerHTML
    let buttons = document.querySelectorAll('.pagination button')
    for(let i = 0; i < buttons.length; i++){
      document.getElementById(buttons[i].id).className = ''
    }
    for(let i = 0; i < buttons.length; i++){
      if (buttons[i].id == e.currentTarget.id){
        document.getElementById(buttons[i].id).className = 'selected-page'
        break
      }
    }
    this.setState({ currentPage: value})
  }

  modalCallback(e) {
    switch (e.target.nodeName) {
      case 'SPAN':
        this.setState({ modalShow: false })
        break
      case 'BUTTON':
        if (e.target.id === 'button-modal-ok') {
          this.setState({ modalShow: false })
          this.props.dispatch(fetchDeleteApi(this.state.apiId))
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
        <Spinner />
      )
    }
    if (this.props.apiList === undefined || this.props.apiList.length === 0) {
      return (
        <div>
          <NothingFound message="No API documents created yet :'(" link="/add/"></NothingFound>
        </div>
      )
    }
    let filteredApiList = this.state.filter
      ? this.props.apiList.filter((apis) => apis.title.toUpperCase().includes(this.state.filter.toUpperCase()))
      : this.props.apiList

    let currentPagedItem = (this.state.totalItemsPerPage * this.state.currentPage) - this.state.totalItemsPerPage
    let pagedFilteredApiList = filteredApiList.slice(currentPagedItem, currentPagedItem + this.state.totalItemsPerPage)

    const apiNode = pagedFilteredApiList.map((item, index) => {
      const apiId = item._id
      const apiTitle = item.title
      const apiDescription = item.description
      return (
        <div className="api" key={index} title={apiTitle} onClick={this.handleApiClick.bind(this, apiId, apiTitle) }>
          <i className="fa fa-trash deleteApiIcon" id={ 'delete_' + apiId } title="Delete this document"/>
          <div className="title">{apiTitle}</div>
          <div className="description">{apiDescription}</div>
        </div>
      )
    })
    return (
      <div className="apis">
        <Modal
          showing={this.state.modalShow}
          callback={this.modalCallback}
          type={modalType.CONFIRM}
          buttons={modalButtons.OKCANCEL}
          header={this.state.apiTitle}
          message="Are you sure you want to delete this api document?"
          />
        <Filter
          filterChanged={this.handleFilterChanged.bind(this) }
          placeholder="Find an API document by title"
          />
        <Pager totalItemsPerPage={this.handlePagerOnChange.bind(this)}/>
        <div className="apiList">
          {apiNode}
        </div>
        <Pagination
        totalItems={filteredApiList.size}
        totalItemsPerPage={this.state.totalItemsPerPage}
        onPageSelect={this.handleOnPageSelect.bind(this)}
        />
      </div>
    )
  }
}

Api.propTypes = {
  apiList: PropTypes.array,
  isFetching: PropTypes.bool,
  filter: PropTypes.string
}

const mapStateToProps = (state) => {
  console.log('state:', state);
  return {
    apiList: state.get('apis'),
    isFetching: state.get('isFetching')
  }
}

export const ApisContainer = connect(mapStateToProps)(Api)

