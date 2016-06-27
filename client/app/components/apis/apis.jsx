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
    if (this.props.apiList.size == 0) {
      return (
        <div className="emptyList">
          <h3>No methods created yet!</h3>
        </div>
      )
    }
    console.log(this.props.apiList.getIn([0]))  
    const apiNode = this.props.apiList.map(function (item, index) {
      const link = '/detail/' + item.getIn(['apiList','id'])
      return (
        <div className="api" key={item.id}>
          <Link to ={link}>{item.title}</Link>
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
