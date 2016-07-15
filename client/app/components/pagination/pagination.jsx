import React, {Component, PropTypes} from 'react';
import './styles.scss'

export class Pagination extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let totalPages = Math.floor(this.props.totalItems / this.props.totalItemsPerPage)
    totalPages = this.props.totalItems % this.props.totalItemsPerPage > 0 ? ++totalPages : totalPages

    var paginationButtons = []
    for (let i = 0; i < totalPages; i++) {
      paginationButtons.push(
        <button key={i} id={`button-page-${i}`} className={i == 0 ? 'selected-page' : ''} onClick={this.props.onPageSelect}>{i+1}</button>
      )
    }


    return (
      <div className="pagination">
        {paginationButtons}
      </div>
    );
  }
}

Pagination.propTypes = {
  totalItems: PropTypes.number,
  totalItemsPerPage: PropTypes.number,
  onPageSelect: PropTypes.func
}

export class Pager extends Component {
  render() {
    return (
      <div className="pager">
        APIs to display&nbsp;
        <select name="pager" id="selectPager" onChange={this.props.totalItemsPerPage}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    )
  }
}

Pager.proptypes = {
  totalItemsPerPage: PropTypes.number
}
