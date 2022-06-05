import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type FieldProps = {
    name?: string;
    type?: string;
    label?: string;
    classRequired?: boolean;
    labelCol?: string;
    inputCol?: string;
    registration?: Partial<UseFormRegisterReturn>;
    placeholder?: string;
    error?: FieldError | undefined;
};

export const InputField = (props: FieldProps) => {
    const {
        name,
        type,
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
            <div className={`ant-col ant-col-${labelCol ? labelCol : '8'} ant-form-item-label`}>
                {label && <label className={`${classRequired ? 'ant-form-item-required' : ''}`}>
                    {label}
                </label>}
            </div>
            <div className={`ant-col ant-col-${inputCol ? inputCol : '16'} ant-form-item-control`}>
                <div className={`ant-form-item-control-input`}>
                    <div className={`ant-form-item-control-input-content`}>
                        <input
                            id={name}
                            type={`${type ? type : 'text'}`}
                            {...registration}
                            placeholder={placeholder ?? ''}
                            className={`ant-input ${error?.message ? 'ant-input-status-error': ''}`}
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
