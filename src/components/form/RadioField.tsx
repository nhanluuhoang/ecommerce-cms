import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type IValues = {
    label: string;
    value: string;
};

type IProps = {
    label?: string;
    labelCol?: string;
    inputCol?: string;
    classRequired?: boolean;
    values?: IValues[];
    registration?: Partial<UseFormRegisterReturn>
}

export const RadioField = ({ label, values, labelCol, inputCol, classRequired, registration}: IProps) => {
    return (
        <div className='ant-row ant-form-item ant-form-item-has-success'>
            {label && <div className={`ant-col ant-col-${labelCol ?? '6'} ant-form-item-label`}>
                <label
                    title={label}
                    className={`${classRequired ? 'ant-form-item-required' : ''}`}
                >
                    {label}
                </label>
            </div>}
            <div className={`ant-col ant-col-${inputCol ?? '16'} ant-form-item-control`}>
                <div className='ant-form-item-control-input'>
                    <div className='ant-form-item-control-input-content'>
                        {values && values.map(({ label, value }, index) => (
                            <label key={index} className='ant-radio-wrapper ant-radio-wrapper-checked'>
                                <span className='ant-radio'>
                                    <input
                                        className='ant-radio-inner'
                                        key={index}
                                        type='radio'
                                        {...registration}
                                        value={value}
                                    />
                                </span>
                                <span style={{paddingRight: '8px', paddingLeft: '8px', fontSize: '14px'}}>
                                    {label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
