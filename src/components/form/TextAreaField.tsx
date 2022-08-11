import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type TextAreaFieldProps = {
    name?: string;
    rows?: number;
    label?: string;
    classRequired?: boolean;
    labelCol?: number;
    inputCol?: number;
    registration?: Partial<UseFormRegisterReturn>;
    placeholder?: string;
    error?: FieldError | undefined;
};

export const TextAreaField = (props: TextAreaFieldProps) => {
    const {
        name,
        rows,
        label,
        classRequired,
        labelCol,
        inputCol,
        registration,
        placeholder,
        error
    } = props;
    
    return (
        <div className={`ant-row ant-form-item ${error?.message ? ' ant-input-item-with-help ant-form-item-has-error' : ''}`}>
            <div className={`ant-col ant-col-${labelCol || 8} ant-form-item-label`}>
                {label && <label className={`${classRequired ? 'ant-form-item-required' : ''}`}>
                    {label}
                </label>}
            </div>
            <div className={`ant-col ant-col-${inputCol || 16} ant-form-item-control`}>
                <div className={`ant-form-item-control-input`}>
                    <div className={`ant-form-item-control-input-content`}>
                        <textarea
                            id={name}
                            className={`ant-input ${error?.message ? 'ant-input-status-error': ''}`}
                            rows={rows ? rows : 4}
                            placeholder={placeholder ?? ''}
                            {...registration}
                        />
                    </div>
                </div>
                {error?.message && (
                    <div className={`class="ant-form-item-explain ant-form-item-explain-connected"`}>
                        <div className={`ant-form-item-explain-error`}>
                            {error.message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
