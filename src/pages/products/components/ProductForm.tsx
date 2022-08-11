import React, { useEffect, useState } from 'react';
import { ContentLayout } from '../../../components/layouts/ContentLayout';
import { InputField, TextAreaField } from '../../../components/form';
import { Button, Switch, UploadImage } from '../../../components/elements';
import * as yup from 'yup';
import { object } from 'yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { createProduct, getProduct } from '../api/products';
import { getOptions } from '../api/options';
import { IOptions, IProduct, ProductDTO } from '../interfaces';
import { SaveOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { FieldArray } from './FieldArray';

const layout = {
    labelCol: 6,
    inputCol: 12
}

export const ProductForm = ( { id } : { id: any } ) => {
    const [visible, setVisible] = useState(false);
    const [isBasic, setIsBasic] = useState<boolean>(true);
    const [options, setOptions] = useState<IOptions[]>([]);
    
    const schema = yup.object().shape({
        category_id:    yup.number().nullable(),
        title:          yup.string().required('Please enter category name'),
        descriptions:   yup.string().required('Please enter descriptions'),
        thumbnails:     yup.string()
            .required('Please select product avatar')
            .transform((currentValue) => {
                if (Array.isArray(currentValue)) {
                    return currentValue[0]
                }
                
                return currentValue
            }),
        images:         yup.lazy(images => {
            if (id) {
                // update
                return yup.array(
                    object().shape({
                        id: yup.number(),
                        path: yup.string()
                    })
                )
                    .min(1, 'The number of detailed photos must be more than 1')
                    .max(8, 'The number of detail photos must be less than 8')
                    .required('Please select detail photos')
            } else {
                // create
                return yup.array(yup.string())
                .min(1, 'The number of detailed photos must be more than 1')
                .max(8, 'The number of detail photos must be less than 8')
                .required('Please select detail photos')
            }
        }),
        price:          yup.lazy(price => {
            if (isBasic) {
                return yup.number().required('Please enter price')
            } else {
                return yup.number().nullable()
            }
        }),
        quantity:       yup.lazy(quantity => {
            if (isBasic) {
                return yup.number().required('Please enter quantity')
            } else {
                return yup.number().nullable()
            }
        }),
        status:         yup.boolean().required('Please select status of product'),
        sku:            yup.string(),
        options:        yup.array(),
        option_values:  yup.array(),
        variant_values: yup.array(),
        optionAndValue: yup.lazy(value => {
            if (isBasic) {
                return yup.array().of(
                    object().nullable()
                )
            } else {
                return yup.array().of(
                    object().shape({
                        id: yup.string().nullable(),
                        option: yup.lazy(option => {
                            const duplicate = value.filter((item: any, index: number) => item.option === option)
                            if (duplicate.length >= 2) {
                                duplicate.push(option)
                            }
                            
                            return yup.string().required('Please select option').notOneOf(duplicate, 'Options must be unique')
                        }),
                        values: yup.array().of(
                            object().shape({
                                value: yup.string().required('Please enter value')
                            })
                        )
                    })
                )
            }
        })
    });
    
    const {
        control,
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { isValid, isSubmitting, errors },
    } = useForm<IProduct>({
        resolver: yupResolver(schema)
    });
    
    const { fields, append, update, remove } = useFieldArray({
        control,
        name: 'optionAndValue' as any,
    });
    
    useEffect(() => {
        getProduct(id).then(({data, success}) => {
            reset(data)
        })
        
        getOptions().then(({data, success}) => {
            setOptions(data)
        })
    },[reset])
    
    const showModal = () => {
        setVisible(true)
    }
    
    const handleOk = () => {
        setVisible(false)
    }
    
    const handleCancel = () => {
        setVisible(false)
    }
    
    const handleChangeBasic = () => {
        setIsBasic(true)
    }
    
    const handleChangeConfig = () => {
        setIsBasic(false)
    }
    
    const handleAddOptions = () => {
        append({
            id: null,
            option: '',
            values: [{ value: '' }]
        })
    }
    
    const handleUploadAvatar = (avatar: any) => {
        reset({ ...getValues(), thumbnails: avatar } )
    }
    
    const handleUploadImage = (value: any) => {
        reset({ ...getValues(), images: value } )
    }
    
    const getOptionAndValue = (value: any) => {
        // const options = []
        // const optionValues = []
        
        value.map((item: any, index: number) => {
        
        })
        
        // return { options, optionValues }
    }
    
    const getOptionValues = (value: any) => {
        value.map((item: any, index: number) => {
        
        })
    }
    
    const handleUpdate = async (value: any) => {
        console.log(value)
        console.log(errors)
        
        
        if (isBasic) {
            delete value?.options
            delete value?.option_values
        } else {
            // { value.options, value.option_values } = getOptionAndValue(value.variant_values)
        }
    
        
        
        // await createProduct(value)
    }
    console.log(errors)
    
    return (
        // isLoading={isLoading || isSubmitting}
        <ContentLayout  breadCrumb={['Product', id ? 'Detail' : 'Create']}>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <InputField
                    name='title'
                    label='Title'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    classRequired={true}
                    registration={register('title')}
                    error={errors['title']}
                />
    
                <Switch
                    label='Hide/Show'
                    name='status'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    registration={register('status')}
                />
    
                <TextAreaField
                    name='descriptions'
                    label='Descriptions'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    classRequired={true}
                    registration={register('descriptions')}
                    error={errors['descriptions']}
                    rows={5}
                />
    
                <InputField
                    name='sku'
                    label='Sku'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    isDisable={true}
                    classRequired={true}
                    registration={register('sku')}
                    error={errors['sku']}
                />
    
                <div className='ant-row ant-form-item'>
                    <div className={`ant-col ant-col-${layout.labelCol} ant-form-item-label`}>
                        <label>Product configuration</label>
                    </div>
                    <div className={`ant-col ant-col-${layout.inputCol} ant-form-item-control`}>
                        <div style={{width: '100%', justifyContent: 'center', textAlign: 'center'}}>
                            <Button
                                style={isBasic ? { color: '#40a9ff', borderColor: '#40a9ff', background: '#fff' } : {} }
                                variant='default'
                                type='button'
                                onClick={handleChangeBasic}
                            >
                                Basic configuration
                            </Button>
                            <Button
                                style={isBasic ? {} : { color: '#40a9ff', borderColor: '#40a9ff', background: '#fff' } }
                                variant='default'
                                type='button'
                                onClick={handleChangeConfig}
                            >
                                Config by properties
                            </Button>
                        </div>
                    </div>
                </div>
                
                { isBasic === true &&
                    <>
                        <InputField
                            name='price'
                            label='Price'
                            labelCol={layout.labelCol}
                            inputCol={layout.inputCol}
                            classRequired={true}
                            registration={register('price')}
                            error={errors['price']}
                        />
        
                        <InputField
                        name='quantity'
                        label='Quantity'
                        type='number'
                        labelCol={layout.labelCol}
                        inputCol={layout.inputCol}
                        classRequired={true}
                        registration={register('quantity')}
                        error={errors['quantity']}
                        />
                    </>
                }
                
                { isBasic === false && fields.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className='ant-row ant-form-item'>
                                <div className={`ant-col ant-col-${layout.labelCol} ant-form-item-label`}>
                                    <label className='ant-form-item-required'>{`Options ${index + 1} `}</label>
                                </div>
                                <div className={`ant-col ant-col-${layout.inputCol} ant-form-item-control`}>
                                    <div
                                        className='ant-select ant-select-single ant-select-show-arrow'
                                        style={{ display: 'flex', marginBottom: '20px' }}
                                    >
                                        <div className='ant-col ant-col-15 ant-form-item-control'>
                                            <select
                                                {...register(`optionAndValue.${index}.id`)}
                                                className='ant-select-selector'
                                                style={ errors?.optionAndValue?.[index]?.option ? {background: '#fff', borderColor: '#ff4d4f'} : {}}
                                                onChange={
                                                    (event) => {
                                                        update(index, {
                                                            ...item,
                                                            option: event.target.selectedOptions[0].text
                                                        })
                                                    }
                                                }
                                            >
                                                {options && options.map((item, index) => (
                                                    <option key={index} value={item?.id}>
                                                        {item?.value}
                                                    </option>
                                                ))}
                                            </select>
        
                                            {errors?.optionAndValue?.[index]?.option &&
                                                <div className={`class="ant-form-item-explain ant-form-item-explain-connected"`}>
                                                    <div className='ant-form-item-explain-error'>
                                                        {errors?.optionAndValue?.[index]?.option?.message}
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        
                                        {index === 0 &&
                                            <Button
                                                style={{marginLeft: '10px'}}
                                                type='button'
                                                icon={<PlusCircleOutlined />}
                                                onClick={showModal}
                                            />
                                        }
                                        <Button
                                            style={{marginLeft: '10px'}}
                                            type='button'
                                            variant='danger'
                                            icon={<DeleteOutlined />}
                                            onClick={() => remove(index)}
                                        />
                                    </div>
    
                                    <FieldArray
                                        nestIndex={index}
                                        control={control}
                                        register={register}
                                        errors={errors[`optionAndValue`]}
                                    />
                                    
                                </div>
                            </div>
                            
                            <Modal
                                title="Create product"
                                visible={visible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                style={{ left: '100px' }}
                            >
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>
                        </div>
                    )
                })}
    
                { isBasic === false &&
                    <div className='ant-row ant-form-item'>
                        <div className='ant-col ant-col-8 ant-form-item-label'></div>
                        <div className='ant-col ant-col-10 ant-form-item-control'>
                            <div style={{width: '100%', justifyContent: 'center', textAlign: 'center'}}>
                                <Button
                                    variant='dashed'
                                    type='button'
                                    icon={<PlusCircleOutlined/>}
                                    onClick={handleAddOptions}
                                >
                                    Add Option
                                </Button>
                            </div>
                        </div>
                    </div>
                }
                
                <UploadImage
                    name='thumbnails'
                    label='Product avatar'
                    classRequired={true}
                    imageListLength={1}
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    images={getValues().thumbnails}
                    onUpload={handleUploadAvatar}
                    error={errors['thumbnails']}
                />
                
                <UploadImage
                    name='images'
                    label='Detail photos'
                    classRequired={true}
                    imageListLength={8}
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    images={getValues().images}
                    onUpload={handleUploadImage}
                    error={errors['images']}
                />
                
                
                
                <div style={{width: '100%', justifyContent: 'center', textAlign: 'center'}}>
                    <Button
                        type='submit'
                        icon={<SaveOutlined />}
                    >
                        {id ? 'Update' : 'Create'}
                    </Button>
                </div>
            </form>
        </ContentLayout>
    );
};
