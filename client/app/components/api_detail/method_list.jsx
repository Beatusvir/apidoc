import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MethodItems from './method_items'
import {connect} from 'react-redux'
import './styles.scss'

export class Methods extends Component {
  constructor(props) {
    super(props)
    this.state = { methods: props.methods }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    var methodNode = this.state.methods.map(function (item, index) {
      return (
        <div className="method" key={index}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <MethodItems items={item.items}/>
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
    methods: state.getIn(['apiDetail', 'methods'])
  }
}

export const MethodsContainer = connect(mapStateToProps)(Methods)

Methods.propTypes = {
  methods: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string
    }))
  }))
}