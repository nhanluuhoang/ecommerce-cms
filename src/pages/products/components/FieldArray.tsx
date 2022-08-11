import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Button } from '../../../components/elements';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

type IProps = {
    nestIndex: any
    control: any;
    register: any;
    errors: any ;
}

export const FieldArray = ({ nestIndex, control, register, errors }: IProps) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `optionAndValue.${nestIndex}.values`
    });
    
    const handleAddValues = () => {
        append({ value: '' })
    }
    
    return (
        <>
            {fields.map((item: any, k) => {
                
                return (
                    <div
                        key={k}
                        className={`ant-row ant-form-item ${errors ? ' ant-input-item-with-help ant-form-item-has-error' : ''}`}
                    >
                        <div className='ant-col ant-col-4 ant-form-item-label'>
                            <label className='ant-form-item-required'>Value {k+1}</label>
                        </div>
                        <div className={`ant-col ant-col-18 ant-form-item-control`}>
                            <div className={`ant-form-item-control-input`}>
                                <div style={{display: 'flex'}} className={`ant-form-item-control-input-content`}>
                                    <input
                                        className={`ant-input ${errors ? 'ant-input-status-error': ''}`}
                                        id={`optionAndValue[${nestIndex}].values[${k}].value`}
                                        type='text'
                                        {...register(`optionAndValue[${nestIndex}].values[${k}].value`)}
                                    />
                                    {k + 1 === fields.length &&
                                        <Button
                                            style={{marginLeft: '10px'}}
                                            type="button"
                                            icon={<PlusCircleOutlined/>}
                                            onClick={handleAddValues}
                                        />
                                    }
                                    <Button
                                        style={{marginLeft: '10px'}}
                                        type='button'
                                        variant='danger'
                                        icon={<DeleteOutlined />}
                                        onClick={() => remove(k)}
                                    />
                                </div>
                            </div>
                            {errors &&
                                <div className={`class="ant-form-item-explain ant-form-item-explain-connected"`}>
                                    <div className='ant-form-item-explain-error'>
                                        {errors[nestIndex]?.values && errors[nestIndex]?.values[k]?.value?.message}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                )
            })}
        </>
    );
};
