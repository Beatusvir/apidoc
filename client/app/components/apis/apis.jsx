import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './styles.scss'

export class Api extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    const apiNode = this.props.apiList.map(function (item, index) {
      return (
        <div className="api" key={index}>
          {item}
        </div>
      )
    })
    return (
      <div className="apiList">
        {apiNode}
      </div>
    )
  }
}

Api.propTypes = {
  apiList: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    apiList: state.getIn(['apis', 'apiList'])
  }
}

export const ApisContainer = connect(mapStateToProps)(Api)
