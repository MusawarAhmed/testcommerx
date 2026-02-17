
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    className?: string;
}

export default function Button({ children, variant: _variant = 'primary', className = '', ...props }: ButtonProps) {
    const baseStyle = "px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700";
    // minimal implementation
    return (
        <button className={`${baseStyle} ${className}`} {...props}>
            {children}
        </button>
    );
}
