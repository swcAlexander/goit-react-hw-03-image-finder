import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from 'components/Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }
  hendleKeyDown = e => {
    if (e.code === 'Escape') this.props.onClose();
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) this.props.onClose();
  };
  render() {
    return createPortal(
      <div className={styles.overlay} onClick={this.handleBackdropClick}>
        <div className={styles.modal}>
          {this.props.children}
          {/* <img src="" alt="" /> */}
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
