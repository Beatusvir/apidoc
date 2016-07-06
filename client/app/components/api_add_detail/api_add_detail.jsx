import React, {Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import FontAwesome from 'react-fontawesome'
import { addApiClass } from '../../action_creators'
import ResponseItem from './response_item'
import { store } from '../../index'
import './styles.scss'

class ApiAddDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { title: props.title, id: props.id, successResponseItems: 0, errorResponseItems: 0 }
    this.componentWillMount = this.componentWillMount.bind(this)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentWillMount() {
    if (this.props.params.apiId != undefined) {
      this.setState({ id: this.props.params.apiId })
    }
  }

  handleSubmit(event) {
    const title = ReactDOM.findDOMNode(this.refs.title).value
    const description = ReactDOM.findDOMNode(this.refs.description).value
    const apiClass = {
      apiId: this.state.id, title, description
    }
    store.dispatch(addApiClass(apiClass))
  }

  handleAddSuccessResponse() {
    this.setState({ successResponseItems: +this.state.successResponseItems + 1 })
  }

  handleAddErrorResponse(event) {
    this.setState({ errorResponseItems: +this.state.errorResponseItems + 1 })
  }

  render() {
    return (
      <div className="api-add-detail">
        <h1>{this.props.title}</h1>
        <div>{this.props.api}</div>
        <form className="form-api-add-detail" onSubmit={this.handleSubmit.bind(this) }>
          <div className="input-group">
            <input className="input-lg"
              type="text"
              ref="title"
              id="inputTitle"
              placeholder="Method call"/>
          </div>
          <div className="input-group">
            <input
              className="input-sm"
              type="text"
              ref="description"
              id="inputDescription"
              placeholder="Aditional information about your api call"/>
          </div>
          <div className="input-group">
            <input
              className="input-sm"
              type="text"
              ref="url"
              id="inputUrl"
              placeholder="The URL Structure (path only, no root url)"/>
          </div>
          <div className="input-group">
            <label htmlFor="inputMethod">Method</label>
            <select name="inputMethod" id="inputMethod" placeholder="The request type">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="DELETE">DELETE</option>
              <option value="PUT">PUT</option>
            </select>
          </div>
          <div className="input-group">
            <input
              className="input-sm"
              type="text"
              ref="urlParams"
              id="inputUrlParams"
              placeholder="Url paramters"/>
            <input type="checkbox"/> Required
          </div>
          <div className="input-group">
            <input
              className="input-sm"
              type="text"
              ref="dataParams"
              id="inputDataParams"
              placeholder="If making a post request, what should the body payload look like? URL Params rules apply here too"/>
          </div>
          <div className="input-group-response" id="successResponseContainer">
            <div className="input-group-response-title">
              <FontAwesome className="icon-add" name="plus-circle" id="addSuccessResponse"  onClick={this.handleAddSuccessResponse.bind(this) }/> <p>What should the status code (or codes) be on success and is there any returned data?</p>
            </div>
            <ResponseItem count={this.state.successResponseItems}/>
          </div>
          <div className="input-group-response" id="errorResponseContainer">
            <div className="input-group-response-title">
              <FontAwesome className="icon-add" name="plus-circle" id="addErrorResponse"  onClick={this.handleAddErrorResponse.bind(this) }/> <p>What should the status code (or codes) be on error?</p>
            </div>
            <ResponseItem count={this.state.errorResponseItems}/>
          </div>
          <div className="input-group">
            <input
              className="input-sm"
              type="text"
              ref="sampleCall"
              id="inputSampleCall"
              placeholder="Sample call to your endpoint in a runnable format"/>
          </div>
          <div className="input-group">
            <input
              className="input-sm"
              type="text"
              ref="notes"
              id="inputNotes"
              placeholder="This is where all uncertainties, commentary, discussion etc. can go"/>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
}

ApiAddDetail.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    id: state.get('selectedApiId')
  }
}

export const ApiAddDetailContainer = connect(mapStateToProps)(ApiAddDetail)