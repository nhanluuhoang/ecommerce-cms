import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import './Switch.css'

type FieldProps = {
    name?: string;
    label?: string;
    classRequired?: boolean;
    labelCol?: string;
    inputCol?: string;
    registration?: Partial<UseFormRegisterReturn>;
};

export const Switch = (props: FieldProps) => {
    const {
        name,
        label,
        classRequired,
        labelCol,
        inputCol,
        registration,
    } = props;
    return (
        <div className='ant-row ant-form-item'>
            <div className={`ant-col ant-col-${labelCol ? labelCol : '8'} ant-form-item-label`}>
                {label && <label className={`${classRequired ? 'ant-form-item-required' : ''}`}>
                    {label}
                </label>}
            </div>
            <div className={`ant-col ant-col-${inputCol ? inputCol : '16'} ant-form-item-control`}>
                <label className="switch">
                    <input
                        id={name}
                        {...registration}
                        type="checkbox"
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    );
};
