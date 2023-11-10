import React, { useState } from 'react';

const ConfirmationModal = ({ show, onHide, onDelete }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Are You Sure?</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onHide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>You cannot undo this process.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal
