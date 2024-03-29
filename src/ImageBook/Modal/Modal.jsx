// https://gist.github.com/viclafouch/6ee36b2cb7d28484d20f05e68b3433f9

import React, { useEffect, useImperativeHandle, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalElement = document.getElementById('modal-root');

const Modal = React.forwardRef(({ children, fade = false, defaultOpened = false }, ref) => {
  const [isOpen, setIsOpen] = useState(defaultOpened);

  const close = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close
  }), [close]);

  const handleEscape = useCallback(event => {
    if (event.keyCode === 27) close();
  }, [close]);

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    }
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <div className={`modal ${fade ? 'modal-fade' : ''}`}>
        <div className="modal-overlay" onClick={close} />
        <div className="modal-body">
          <div>
            {children}
          </div>
          <span role="button" className="modal-close" aria-label="close" onClick={close}>
            x
          </span>
        </div>
      </div>
    ) : null,
    modalElement
  );
});

export { Modal };