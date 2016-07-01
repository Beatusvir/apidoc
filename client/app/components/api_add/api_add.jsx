import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import './styles.scss'

export class ApiAdd extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
      <form  className="form-add">
        <label htmlFor="input-title">Title </label>
        <input type="text" id="input-title"/>
        <br/>
        <label htmlFor="input-description">Description </label>
        <input type="text" id="input-description"/>
        <br/>
        <button>Save</button>
      </form>
      </div>
    )
  }
}
