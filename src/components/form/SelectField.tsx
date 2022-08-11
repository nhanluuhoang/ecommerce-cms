import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type IValue = {
    id: number;
    value: string;
}

type IProps = {
    label?: string;
    labelCol?: number;
    classRequired?: boolean;
    inputCol?: number;
    values?: IValue[];
    registration?: Partial<UseFormRegisterReturn>;
}

export const SelectField = (props: IProps) => {
    const { label, labelCol, inputCol, values, registration, classRequired } = props
    
    return (
        <div className='ant-row ant-form-item'>
            <div className={`ant-col ant-col-${labelCol || 6} ant-form-item-label`}>
                {label && <label className={`${classRequired ? 'ant-form-item-required' : ''}`} title={label}>
                    {label}
                </label>}
            </div>
            <div className={`ant-col ant-col-${inputCol || 12} ant-form-item-control`}>
                <div className='ant-select ant-select-single ant-select-show-arrow'>
                    <select
                        {...registration}
                        className='ant-select-selector'
                    >
                        {values && values.map((item, index) => (
                            <option key={index} value={item?.id}>
                                {item?.value}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
