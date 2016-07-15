import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import './styles.scss'

export default class NothingFound extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="emptyList">
          <span>{this.props.message} <Link to={this.props.link}><i className="fa fa-plus-circle" /> create one now!</Link></span>
      </div>
    )
  }
}

NothingFound.propTypes = {
  message: React.PropTypes.string,
  link: React.PropTypes.string
}