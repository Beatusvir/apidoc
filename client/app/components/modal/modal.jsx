import React, {Component, PropTypes} from 'react'

// Code, styles
import './styles.scss'

class Modal extends Component {
  closeModal() {
    const modal = document.getElementById('modal')
    modal.style.display = 'none'
  }
  render() {
    return (
      <div className="modal" id="modal" style={this.props.showing ? { display: 'block' } : { display: 'none' }}>
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={this.closeModal.bind(this) }>×</span>
            <h2>Modal Header</h2>
          </div>
          <div className="modal-body">
            <p>Some text in the Modal Body</p>
          </div>
          <div className="modal-footer">
            <h3>Modal Footer</h3>
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  showing: PropTypes.bool
  // type: React.PropTypes.oneOf(['Information', 'Error', 'Warning']),
  // buttons: React.PropTypes.oneOf(['Ok', 'OkCancel']),
  // header: PropTypes.string,
  // footer: PropTypes.string,
  // message: PropTypes.string.isRequired
}

export default Modal