import React from 'react'

interface ButtonProps {
    children?: React.ReactNode;
    loading?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
    color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
    label?: string;
    variant?: "default" | "light" | "outline" | "ghost";
    rounded?: boolean;
    disabled?: boolean;
    className?: string;
    modalTarget?: string;
    onClick?: () => void
}

const Button = ({ color = 'light', label, type, loading = false, variant = "default", rounded = false, className, disabled = false, modalTarget, onClick, children }: ButtonProps) => {
    return (
        <button disabled={loading} type={type ?? 'button'} className={`ti-btn ti-btn-${(variant === 'outline' || variant === 'ghost') ? `${variant}-` : ''}${color}${variant === 'default' ? '-full' : ''} ${rounded ? '!rounded-full' : ''} ti-btn-wave ${(loading || disabled) ? 'ti-btn-disabled' : ''} ${className}`}  {...(modalTarget ? { 'data-hs-overlay': modalTarget } : {})} onClick={onClick}>
            {loading ? (
                <>
                    <span className="me-2">{label}</span>
                    <span className="loading">
                        <i className="ri-loader-2-fill text-[1rem] animate-spin">
                        </i>
                    </span>
                </>) : label}
            {children && children}
        </button>
    )
}

export default Button
