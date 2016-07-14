// Modules
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'

// Code, styles
import { filter } from '../../actions/actions'
import './styles.scss'

class Filter extends Component {
  handleOnChange() {
    let value = ReactDOM.findDOMNode(this.refs.filter).value
    this.props.dispatch(filter(value))
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
          placeholder="Find a document by title"
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.get('filter')
  }
}

export const FilterContainer = connect(mapStateToProps)(Filter)