import React from 'react';
import { Spin } from 'antd';

const variants = {
    primary: 'ant-btn-primary',
    default: 'ant-btn-default',
    dashed: 'ant-btn-dashed',
    text: 'ant-btn-text',
    link: 'ant-btn-link',
    danger: 'ant-btn-dangerous'
};

const sizes = {
    small: 'ant-btn-sm',
    middle: '',
    large: 'ant-btn-lg',
};

type IconProps = { icon: React.ReactElement} | { icon?: undefined }

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    isLoading?: boolean;
} & IconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            type = 'button',
            variant = 'primary',
            size= 'middle',
            isLoading = false,
            icon,
            ...props
        }, ref
    ) => {
        return (
            <button
                ref={ref}
                className={`ant-btn ${variants[variant]} ${sizes[size]}`}
                type={type}
                disabled={isLoading}
                {...props}
            >
                {isLoading && <Spin />}
                {!isLoading && icon}
                <span>{props.children}</span>
            </button>
        )
    }
)
