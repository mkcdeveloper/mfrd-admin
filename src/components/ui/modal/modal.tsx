import React, { useEffect, useState } from 'react'
import ModalHeader from './modal-header';
import { title } from 'process';
import ModalFooter from './modal-footer';
import ReactDOM from 'react-dom';

interface ModeProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: React.ReactNode
}

const Backdrop = ({ isOpen }: { isOpen: boolean }) => {
    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 dark:bg-neutral-900 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            style={{ zIndex: 79 }}
        />,
        document.body
    );
};

const Modal = ({ isOpen, onClose, title, children }: ModeProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <>
            <Backdrop isOpen={isOpen} />
            <div
                className={`hs-overlay ti-modal ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="ti-modal-box mt-0 ease-out min-h-[calc(100%-3.5rem)] flex flex-col justify-center items-center max-w-7xl">
                    <div className="ti-modal-content w-full">
                        <ModalHeader title={title} onClose={onClose} />

                        <div className="ti-modal-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Modal
