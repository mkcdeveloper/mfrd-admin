import React from 'react'

interface ModalFooterProps {
    children?:React.ReactNode
}

const ModalFooter = ({ children }: ModalFooterProps) => {
    return (
        <div className="ti-modal-footer">
            {children}
        </div>
    )
}

export default ModalFooter
