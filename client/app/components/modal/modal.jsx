import React, {Component, PropTypes} from 'react'

// Code, styles
import './styles.scss'

export const modalType = {
  INFORMATION: 'Information',
  ERROR: 'Error',
  WARNING: 'Warning',
  CONFIRM: 'Confirm'
}

export const modalButtons = {
  OK: 'Ok',
  OKCANCEL: 'OkCancel'
}

class Modal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let modalColor = { backgroundColor: '#ccc' }
    switch (this.props.type) {
      case 'Information':
        modalColor = { backgroundColor: 'steelblue' }
        break
      case 'Warning':
        modalColor = { backgroundColor: 'orange' }
        break
      case 'Error':
        modalColor = { backgroundColor: 'maroon' }
        break
      case 'Confirm':
        modalColor = { backgroundColor: 'seagreen' }
        break
    }
    const buttons = this.props.buttons === 'OkCancel'
      ? (<div><button id="button-modal-ok">OK</button><button id="button-modal-cancel">CANCEL</button></div>)
      : (<button id="button-modal-ok">OK</button>)

    return (
      <div className="modal" id="modal" onClick={this.props.callback} style={this.props.showing ? { display: 'block' } : { display: 'none' }}>
        <div className="modal-content">
          <div className="modal-header" style={modalColor}>
            <span className="close">×</span>
            <h2>{this.props.header}</h2>
          </div>
          <div className="modal-body">
            <p>{this.props.message}</p>
          </div>
          <div className="modal-footer" style={modalColor}>
            {buttons}
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  showing: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
  type: React.PropTypes.oneOf(['Information', 'Error', 'Warning', 'Confirm']),
  buttons: React.PropTypes.oneOf(['Ok', 'OkCancel']),
  header: PropTypes.string.isRequired,
  // footer: PropTypes.string,
  message: PropTypes.string.isRequired
}

export default Modal