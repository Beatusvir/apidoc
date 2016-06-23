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
          <MethodItems items={item.detail}/>
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

let methodsItemList = [
  {
    title: 'Method', content: 'Post'
  },
  {
    title: 'URL Params', content: 'Post'
  },
  {
    title: 'Data Params', content: 'Post'
  },
  {
    title: 'Success Response', content: 'Post'
  },
  {
    title: 'Error Response', content: 'Post'
  },
  {
    title: 'Sample Call', content: 'Post'
  }
]

const mapStateToProps = (state) => {
  return {
    methods: state.getIn(
      [
        {
          title: 'Activar Cuenta', description: 'Cambia el estatus de la cuenta del cliente a activa', apiItems: methodsItemList
        },
        {
          title: 'Actualizar Clave', description: 'Cambiar la clave del cliente', apiItems: methodsItemList
        }
      ]
    )
  }
}

export const MethodsContainer = connect(mapStateToProps)(Methods)

Methods.propTypes = {
  methods: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    apiItems: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string
    }))
  }))
}