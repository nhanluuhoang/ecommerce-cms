import React, { useEffect, useState } from 'react';
import { InputField, TreeSelectField } from '../../../components/form';
import { Button, Switch } from '../../../components/elements';
import { SaveOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useNavigate } from 'react-router-dom';
import { ICategories, ICategory } from '@/pages/categories/interfaces';
import { createCategory, getCategories, getCategory, updateCategory } from '../api/categories';
import { ContentLayout } from '../../../components/layouts/ContentLayout';

const schema = yup.object({
    parent_id: yup
    .string()
    .nullable(),
    parent_title: yup
    .string()
    .nullable(),
    title: yup
    .string()
    .required("Please enter category name"),
    sort_order: yup
    .string()
    .required("Please enter sort order"),
    is_public: yup
    .string()
});

const layout = {
    labelCol: 6,
    inputCol: 12
}

type formData = {
    parent_id?: number;
    parent_title?: string;
    title: string;
    sort_order: number;
    is_public: boolean;
}

export const CategoryForm = ( { id } : { id: any } ) => {
    const [categories, setCategories] = useState<ICategories[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid, isSubmitting, errors },
    } = useForm<formData>({
        resolver: yupResolver(schema)
    });
    
    useEffect(() => {
        getCategories().then(({data, success, pagination}) => {
            setCategories(data)
            setIsLoading(false)
        })
        
        if (id) {
            getCategory(id).then(({data, success}) => {
                reset({
                    parent_id: data.parent_id,
                    parent_title: data?.parent?.title,
                    title: data.title,
                    sort_order: data.sort_order,
                    is_public: data.is_public
                })
                
                setIsLoading(false)
            })
        }
    }, [reset])
    
    const handleOnSelectValue = ({ parent_id, parent_title }: { parent_id: number, parent_title: string }) => {
        reset({
            parent_id,
            parent_title
        })
    };
    
    const handleUpdate = async (value: any) => {
        if (isValid) {
            const body = {
                title: value.title,
                parent_id: value.parent_id,
                sort_order: value.sort_order,
                is_public: value.is_public === 'true' ? true : false
            }

            if (id) {
                await updateCategory(id, body)
                navigate('/dashboard/categories')
            } else {
                await createCategory(body)
                navigate('/dashboard/categories')
            }
        }
    }
    
    return (
        <ContentLayout isLoading={isLoading || isSubmitting} breadCrumb={['User', id ? 'Detail' : 'Create']}>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <TreeSelectField
                    label='Category'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    treeData={categories}
                    registration={register('parent_title')}
                    onSelectValue={handleOnSelectValue}
                />
            
                <InputField
                    name='title'
                    label='Title'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    classRequired={true}
                    registration={register('title')}
                    error={errors['title']}
                />
            
                <InputField
                    name='sort_order'
                    label='Sort Order'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    registration={register('sort_order')}
                    error={errors['sort_order']}
                />
            
                <Switch
                    label='Is Public'
                    name='is_public'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    registration={register('is_public')}
                />
            
                <div style={{width: '100%', justifyContent: 'center', textAlign: 'center'}}>
                    <Button
                        isLoading={isSubmitting}
                        type='submit'
                        icon={<SaveOutlined />}
                    >
                        Update
                    </Button>
                </div>
            </form>
        </ContentLayout>
    );
};
