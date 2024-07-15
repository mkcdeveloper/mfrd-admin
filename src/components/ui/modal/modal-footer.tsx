import React from 'react'

interface ModalFooterProps {
    onClose?: () => void
    onSave?: () => void
}

const ModalFooter = ({ onClose, onSave }: ModalFooterProps) => {
    return (
        <div className="ti-modal-footer">
            <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-secondary-full" onClick={onClose}>
                Close
            </button>
            <button className="ti-btn ti-btn-primary-full" onClick={onSave}>
                Save changes
            </button>
        </div>
    )
}

export default ModalFooter
