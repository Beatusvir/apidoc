import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './styles.scss'

export class Api extends Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    if (this.props.apiList === undefined || this.props.apiList.size == 0) {
      return (
        <div>Loading...</div>
      )
    }
    const apiNode = this.props.apiList.map(function (item, index) {
      const link = '/detail/' + item.get('id')
      return (
        <div className="api" key={item.get('id')}>
          <Link to ={link}>{item.get('title')}</Link>
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
  apiList: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    apiList: state.get('apis')
  }
}

export const ApisContainer = connect(mapStateToProps)(Api)
