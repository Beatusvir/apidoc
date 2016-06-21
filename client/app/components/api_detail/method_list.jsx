import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import MethodItems from './method-items'
import './styles.scss'

export default class method extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    var methodNode = this.props.methods.map(function (item, index) {
      return (
        <div className="method" key={index}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <MethodItems items={item.apiItems}/>
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

method.propTypes = {
  methods: React.PropTypes.array
}