import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MethodItems from './method_items'
import NothingFound from '../nothing_found/nothing_found'
import {connect} from 'react-redux'
import './styles.scss'

export class Methods extends Component {
  constructor(props) {
    super(props)
    this.state = { methods: props.methods }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    if (this.props.methods === undefined || this.props.methods.size == 0){
      return (
        <NothingFound message="No methods added yet :'(" link="/addDetail/"/>
      )
    }
    var methodNode = this.props.methods.map(function (item, index) {
        return (
          <div className="method" key={index}>
            <h1>{item.get('title') }</h1>
            <p>{item.get('description') }</p>
            <MethodItems items={item.get('items') }/>
          </div>
        )
    })
    return (
      <div>
        {methodNode}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    methods: state.get('apiDetail')
  }
}

export const MethodsContainer = connect(mapStateToProps)(Methods)

Methods.propTypes = {
  methods: PropTypes.object
}