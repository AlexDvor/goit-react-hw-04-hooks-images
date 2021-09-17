import { Component } from 'react';
import { Overlay, ContentModal } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    const { handleBackDropClick } = this;
    return createPortal(
      <>
        <Overlay onClick={handleBackDropClick}>
          <ContentModal>{children}</ContentModal>
        </Overlay>
      </>,
      modalRoot,
    );
  }
}

export default Modal;
