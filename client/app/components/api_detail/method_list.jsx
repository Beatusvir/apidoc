// Modules
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'

// Components
import NothingFound from '../nothing_found/nothing_found'
import Responses from './responses'
import Parameters from './parameters'
import Spinner from '../spinner/spinner'
import Modal, { modalType, modalButtons } from '../modal/modal'

// Code, styles
import {requestApiTitle, requestDetail, fetchApiCallDelete} from '../../actions/actions'
import './styles.scss'

export class Methods extends Component {
  constructor(props) {
    super(props)
    this.state = ({ modalShow: false, methodId: null })
    this.modalCallback = this.modalCallback.bind(this)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handleAddApi() {
    window.location = `#/add/detail/${this.props.params.apiId}`
  }

  handleDeleteMethod(methodId) {
    this.setState({ methodId: methodId, modalShow: true })
  }

  handleEditMethod(methodId) {
    // TODO edit method
  }

  modalCallback(e) {
    switch (e.target.nodeName) {
      case 'SPAN':
        this.setState({ modalShow: false })
        break
      case 'BUTTON':
        if (e.target.id === 'button-modal-ok') {
          this.setState({ modalShow: false })
          this.props.dispatch(fetchApiCallDelete(this.state.methodId))
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
        <Spinner/>
      )
    }
    if (this.props.methods === undefined || this.props.methods.length == 0) {
      const currentLink = `/add/detail/${this.props.params.apiId}`
      return (
        <NothingFound message="No method call added yet :'(" link={currentLink}/>
      )
    }
    const methodNode = this.props.methods.map((item, index) => {
      const methodId = item._id
      return (
        <div className="box method" key={index}>
          <div className="method-header">
            <h1>{item.title}</h1>
            <i className="fa fa-pencil edit-method-icon" onClick={() => this.handleEditMethod(methodId) } title="Edit this method"/>
            <i className="fa fa-trash delete-method-icon" onClick={() => this.handleDeleteMethod(methodId) }  title="Delete this method"/>
          </div>
          <div className="method-content">
            <p>{item.description}</p>
            <ul>
              <li className="apiDetailItem">
                <h3>URL</h3>
                <p>{item.url}</p>
              </li>
              <li className="apiDetailItem">
                <h3>Method</h3>
                <p><span className="code">{item.method}</span></p>
              </li>
              <li className="apiDetailItem">
                <h3>URL Params</h3>
                <Parameters parameters={item.urlParams}/>
              </li>
              <li className="apiDetailItem">
                <h3>Data Params</h3>
                <Parameters parameters={item.dataParams}/>
              </li>
              <li className="apiDetailItem">
                <h3>Success Response</h3>
                <Responses responses={item.successResponse}/>
              </li>
              <li className="apiDetailItem">
                <h3>Error Response</h3>
                <Responses responses={item.errorResponse}/>
              </li>
              <li className="apiDetailItem">
                <h3>Notes</h3>
                <p>{item.notes}</p>
              </li>
              <li className="apiDetailItem">
                <h3>Sample Call</h3>
                <p>{item.sample_call}</p>
              </li>
              <li className="apiDetailItem">
                <h3>Notes</h3>
                <p>{item.notes}</p>
              </li>
            </ul>
          </div>
        </div>
      )
    })
    return (
      <div className="methods">
        <Modal
          showing={this.state.modalShow}
          callback={this.modalCallback}
          type={modalType.CONFIRM}
          buttons={modalButtons.OKCANCEL}
          header="Delete method"
          message="Are you sure you want to delete this method call?"
          />
        <div className="box tools">
          <div className="tools-icon">
            <i className="fa fa-print" title="Print method list"/>
            <p>Print</p>
          </div>
          <div className="tools-icon">
            <i className="fa fa-plus-circle add-method-button" title="Add a new method" onClick={this.handleAddApi.bind(this) }/>
            <p>Add Method</p>
          </div>
        </div>
        {methodNode}
      </div>
    )
  }
}

Methods.propTypes = {
  methods: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    methods: state.get('apiDetail'),
    isFetching: state.get('isFetching')
  }
}

export const MethodsContainer = connect(mapStateToProps)(Methods)