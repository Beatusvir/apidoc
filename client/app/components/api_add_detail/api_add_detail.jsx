// Modules
import React, {Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import uuid from 'node-uuid'

// Components
import ResponseItem from './response_item'
import ParamItem from './param_item'
import { ErrorContainer } from '../error/error'
import Spinner from '../spinner/spinner'

// Code, styles
import { clearError, fetchApisCallAddRequest } from '../../actions/actions'
import './styles.scss'

export class ApiAddDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      successResponseItems: [],
      errorResponseItems: [],
      urlParamItems: [],
      dataParamItems: []
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  clearError() {
    this.props.dispatch(clearError())
  }

  handleSubmit(e) {
    console.log(this.state);
    e.preventDefault()
    const title = ReactDOM.findDOMNode(this.refs.title).value
    const description = ReactDOM.findDOMNode(this.refs.description).value
    const method = ReactDOM.findDOMNode(this.refs.method).value
    const url = ReactDOM.findDOMNode(this.refs.url).value
    const sampleCall = ReactDOM.findDOMNode(this.refs.sampleCall).value
    const notes = ReactDOM.findDOMNode(this.refs.notes).value
    let successResponse = []
    this.state.successResponseItems.map((item, index) => {
      let code = document.getElementById(`inputCode_${item}`).value
      let content = document.getElementById(`inputContent_${item}`).value
      let responseId = uuid.v4()
      let newResponse = { responseId, code, content }
      successResponse.push(newResponse)
    })
    let errorResponse = []
    this.state.errorResponseItems.map((item, index) => {
      let code = document.getElementById(`inputCode_${item}`).value
      let content = document.getElementById(`inputContent_${item}`).value
      let responseId = uuid.v4()
      let newResponse = { responseId, code, content }
      errorResponse.push(newResponse)
    })
    let urlParams = []
    this.state.urlParamItems.map((item, index) => {
      let content = document.getElementById(`inputParam_${item}`).value
      let required = document.getElementById(`inputRequired_${item}`).checked
      let parameterId = uuid.v4()
      let newParameter = { parameterId, content, required }
      urlParams.push(newParameter)
    })
    let dataParams = []
    this.state.dataParamItems.map((item, index) => {
      let content = document.getElementById(`inputParam_${item}`).value
      let required = document.getElementById(`inputRequired_${item}`).checked
      let parameterId = uuid.v4()
      let newParameter = { parameterId, content, required }
      dataParams.push(newParameter)
    })

    const apiCall = {
      apiId: this.props.params.apiId, title, description, method, url, sampleCall, notes, successResponse, errorResponse, urlParams, dataParams
    }
    this.props.dispatch(fetchApisCallAddRequest(apiCall))
    window.location = `#/view/${this.props.params.apiId}`
  }

  handleRemoveSuccessResponse(id) {
    let currentArray = this.state.successResponseItems
    delete currentArray[currentArray.indexOf(id)]
    this.setState(
      {
        successResponseItems: currentArray
      }
    )
    this.forceUpdate()
  }

  handleRemoveErrorResponse(id) {
    let currentArray = this.state.errorResponseItems
    delete currentArray[currentArray.indexOf(id)]
    this.setState(
      {
        errorResponseItems: currentArray
      }
    )
    this.forceUpdate()
  }

  handleAddSuccessResponse(event) {
    const newId = uuid.v4()
    let currentArray = this.state.successResponseItems
    currentArray.push(newId)
    this.setState(
      {
        successResponseItems: currentArray
      }
    )
    this.forceUpdate()
  }

  handleAddErrorResponse(event) {
    const newId = uuid.v4()
    let currentArray = this.state.errorResponseItems
    currentArray.push(newId)
    this.setState(
      {
        errorResponseItems: currentArray
      }
    )
    this.forceUpdate()
  }

  handleAddUrlParam(event) {
    const newId = uuid.v4()
    let currentArray = this.state.urlParamItems
    currentArray.push(newId)
    this.setState(
      {
        urlParamItems: currentArray
      }
    )
    this.forceUpdate()
  }

  handleRemoveUrlParam(id) {
    let currentArray = this.state.urlParamItems
    delete currentArray[currentArray.indexOf(id)]
    this.setState(
      {
        urlParamItems: currentArray
      }
    )
    this.forceUpdate()
  }

  handleAddDataParam(event) {
    const newId = uuid.v4()
    let currentArray = this.state.dataParamItems
    currentArray.push(newId)
    this.setState(
      {
        dataParamItems: currentArray
      }
    )
    this.forceUpdate()
  }

  handleRemoveDataParam(id) {
    let currentArray = this.state.dataParamItems
    delete currentArray[currentArray.indexOf(id)]
    this.setState(
      {
        dataParamItems: currentArray
      }
    )
    this.forceUpdate()
  }

  render() {
    const successResponseItemNode = this.state.successResponseItems.map((item, index) => {
      return (
        <div className="response-container" key={item}>
          <i className="fa fa-trash delete-icon" onClick={() => this.handleRemoveSuccessResponse(item) }/>
          <ResponseItem id={item} key={index}/>
        </div>
      )
    })
    const errorResponseItemNode = this.state.errorResponseItems.map((item, index) => {
      return (
        <div className="response-container" key={item}>
          <i className="fa fa-trash delete-icon" onClick={() => this.handleRemoveErrorResponse(item) }/>
          <ResponseItem id={item} key={index}/>
        </div>
      )
    })
    const urlParamsNode = this.state.urlParamItems.map((item, index) => {
      return (
        <div className="response-container" key={item}>
          <i className="fa fa-trash delete-icon" onClick={() => this.handleRemoveUrlParam(item) }/>
          <ParamItem id={item} key={index}/>
        </div>
      )
    })
    const dataParamsNode = this.state.dataParamItems.map((item, index) => {
      return (
        <div className="response-container" key={item}>
          <i className="fa fa-trash  delete-icon" onClick={() => this.handleRemoveDataParam(item) }/>
          <ParamItem id={item} key={index}/>
        </div>
      )
    })
    return (
      <div className="api-add-detail">
        <h1>{this.props.apiTitle}</h1>
        <form onSubmit={this.handleSubmit.bind(this) }>
          <div className="input-group">
            <label className="flex-2" htmlFor="inputTitle">Title</label>
            <input
              className="flex-8"
              type="text"
              ref="title"
              id="inputTitle"
              placeholder="Method call"/>
          </div>
          <div className="input-group">
            <label className="flex-2" htmlFor="inputDescription">Description</label>
            <input
              className="flex-8"
              type="text"
              ref="description"
              id="inputDescription"
              placeholder="Aditional information about your api call"/>
          </div>
          <div className="input-group">
            <label className="flex-2" htmlFor="inputUrl">Url</label>
            <input
              className="flex-8"
              type="text"
              ref="url"
              id="inputUrl"
              placeholder="The URL Structure (path only, no root url)"/>
          </div>
          <div className="input-group">
            <label className="flex-2" htmlFor="inputMethod">Method</label>
            <select name="inputMethod" className="flex-8" id="inputMethod" placeholder="The request type" ref="method">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="DELETE">DELETE</option>
              <option value="PUT">PUT</option>
            </select>
          </div>
          <div className="input-group" id="urlParams">
            <h3>Url Parameters</h3>
            <div className="input-group-add">
              <i className="fa fa-plus-circle icon-add" id="addUrlParam"  onClick={this.handleAddUrlParam.bind(this) }/> <p>Which Url parameters does your call use?</p>
            </div>
            {urlParamsNode}
          </div>
          <div className="input-group" id="dataParams">
            <h3>Data Parameters</h3>
            <div className="input-group-add">
              <i className="fa fa-plus-circle icon-add" id="addDataParam"  onClick={this.handleAddDataParam.bind(this) }/> <p>Which Data parameters does your call use?</p>
            </div>
            {dataParamsNode}
          </div>
          <div className="input-group" id="successResponseContainer">
            <h3>Success Response</h3>
            <div className="input-group-add">
              <i className="fa fa-plus-circle icon-add" id="addSuccessResponse"  onClick={this.handleAddSuccessResponse.bind(this) }/> <p>What should the status code (or codes) be on success and is there any returned data?</p>
            </div>
            {successResponseItemNode}
          </div>
          <div className="input-group" id="errorResponseContainer">
            <h3>Error Response</h3>
            <div className="input-group-add">
              <i name="fa fa-plus-circle plus-circle" id="addErrorResponse"  onClick={this.handleAddErrorResponse.bind(this) }/> <p>What should the status code (or codes) be on error?</p>
            </div>
            {errorResponseItemNode}
          </div>
          <div className="input-group">
            <label className="flex-2" htmlFor="inputNotes">Sample Call</label>
            <input
              className="flex-8"
              type="text"
              ref="sampleCall"
              id="inputSampleCall"
              placeholder="Sample call to your endpoint in a runnable format"/>
          </div>
          <div className="input-group">
            <label className="flex-2" htmlFor="inputNotes">Notes</label>
            <input
              className="flex-8"
              type="text"
              ref="notes"
              id="inputNotes"
              placeholder="This is where all uncertainties, commentary, discussion etc. can go"/>
          </div>
          <button onClick={this.handleSubmit.bind(this) }><i clasName="fa fa-floppy-o"/>Save</button>
        </form>
      </div>
    )
  }
}

ApiAddDetail.propTypes = {
  apiTitle: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    apiTitle: state.get('apiTitle'),
    apiId: state.get('apiId')
  }
}

export const ApiAddDetailContainer = connect(mapStateToProps)(ApiAddDetail)