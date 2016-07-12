import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import NothingFound from '../nothing_found/nothing_found'
import Responses from './responses'
import Parameters from './parameters'
import FontAwesome from 'react-fontawesome'
import {connect} from 'react-redux'
import {requestApiTitle, deleteMethod, requestDetail} from '../../action_creators'
import './styles.scss'

export class Methods extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handleAddApi() {
    window.location = `#/add/detail/${this.props.params.apiId}`
  }

  handleDeleteMethod(methodId) {
    if (confirm('Are you sure you want to delete this method?')){
      this.props.dispatch(deleteMethod(methodId))
    }
  }

  render() {
    if (this.props.methods === undefined || this.props.methods.size == 0) {
      const link =`/add/detail/${this.props.params.apiId}`
      return (
        <NothingFound message="No methods added yet :'(" link={link}/>
      )
    }
    const methodNode = this.props.methods.map((item, index) => {
      const methodId = item.get('methodId')
      return (
        <div className="box method" key={index}>
          <FontAwesome name="trash" className="delete-method-icon" onClick={() => this.handleDeleteMethod(methodId) }/>
          <h1>{item.get('title') }</h1>
          <p>{item.get('description') }</p>
          <ul>
            <li className="apiDetailItem">
              <h3>URL</h3>
              <p>{item.get('url') }</p>
            </li>
            <li className="apiDetailItem">
              <h3>Method</h3>
              <p>{item.get('method') }</p>
            </li>
            <li className="apiDetailItem">
              <h3>URL Params</h3>
              <Parameters parameters={item.get('urlParameters') }/>
            </li>
            <li className="apiDetailItem">
              <h3>Data Params</h3>
              <Parameters parameters={item.get('dataParameters') }/>
            </li>
            <li className="apiDetailItem">
              <h3>Success Response</h3>
              <Responses responses={item.get('successResponses') }/>
            </li>
            <li className="apiDetailItem">
              <h3>Error Response</h3>
              <Responses responses={item.get('errorResponses') }/>
            </li>
            <li className="apiDetailItem">
              <h3>Notes</h3>
              <p>{item.get('notes') }</p>
            </li>
            <li className="apiDetailItem">
              <h3>Sample Call</h3>
              <p>{item.get('sample_call') }</p>
            </li>
            <li className="apiDetailItem">
              <h3>Notes</h3>
              <p>{item.get('notes') }</p>
            </li>
          </ul>
        </div>
      )
    })
    return (
      <div className="container">
        <div className="box tools">
          <div className="tools-icon">
            <FontAwesome className="" name="print" title="Print method list"/>
            <p>Print</p>
          </div>
          <div className="tools-icon">
            <FontAwesome className="add-method-button" name="plus-circle" title="Add a new method" onClick={this.handleAddApi.bind(this) }/>
            <p>Add Method</p>
          </div>
        </div>
        {methodNode}
      </div>
    )
  }
}

Methods.propTypes = {
  methods: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    methods: state.get('apiDetail')
  }
}

export const MethodsContainer = connect(mapStateToProps)(Methods)