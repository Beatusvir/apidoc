// Modules
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

// Code, styles
import './styles.scss'

export default class Filter extends Component {
  handleOnChange() {
    let value = ReactDOM.findDOMNode(this.refs.filter).value
    this.props.filterChanged(value)
  }
  handleOnFocus() {
    document.getElementsByClassName('filter')[0].style.boxShadow = '0 0 5px orange'
  }
  handleOnBlur() {
    document.getElementsByClassName('filter')[0].style.boxShadow = 'none'
  }
  render() {
    return (
      <div className="filter">
        <i className="fa fa-search"/>
        <input
          type="text"
          autoFocus={true}
          ref="filter"
          onChange={this.handleOnChange.bind(this)}
          onFocus={this.handleOnFocus.bind(this)}
          onBlur={this.handleOnBlur.bind(this)}
          placeholder={this.props.placeholder}
          />
      </div>
    );
  }
}

Filter.propTypes = {
  filterChanged: PropTypes.func,
  placeholder: PropTypes.string
}
