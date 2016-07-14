// Modules
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'

// Code, styles
import './styles.scss'

export default class Filter extends Component {
  handleOnChange() {
    let value = ReactDOM.findDOMNode(this.refs.filter).value
    this.props.filterChanged(value)
  }
  handleOnFocus() {
    console.log('focus')
    document.getElementsByClassName('filter')[0].style.boxShadow = '0 0 5px orange'
  }
  handleOnBlur() {
    console.log('blur')
    document.getElementsByClassName('filter')[0].style.boxShadow = 'none'
  }
  render() {
    return (
      <div className="filter">
        <FontAwesome name="search"/>
        <input
          type="text"
          autoFocus={true}
          ref="filter"
          onChange={this.handleOnChange.bind(this)}
          onFocus={this.handleOnFocus.bind(this)}
          onBlur={this.handleOnBlur.bind(this)}
          placeholder="Find a document by title"
          />
      </div>
    );
  }
}

Filter.propTypes = {
  filterChanged: PropTypes.func
}
