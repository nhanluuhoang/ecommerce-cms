import React, { useEffect, useState } from 'react';
import { InputField, TreeSelectField } from '../../../components/form';
import { Button, Switch } from '../../../components/elements';
import { SaveOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useNavigate } from 'react-router-dom';
import { ICategory } from '@/pages/categories/interfaces';
import { createCategory, getCategories, getCategory, updateCategory } from '../api/categories';
import { ContentLayout } from '../../../components/layouts/ContentLayout';

const schema = yup.object({
    parent_id: yup
    .string()
    .nullable(),
    parent_title: yup
    .string()
    .nullable(),
    name: yup
    .string()
    .required("Please enter category name"),
    sort_order: yup
    .string()
    .required("Please enter sort order"),
    is_public: yup
    .string()
});

type formData = {
    parent_id?: number;
    parent_title?: string;
    name: string;
    sort_order: number;
    is_public: boolean;
}

type ITreeData = {
    title: string;
    id: number;
    children?: ITreeData[]
};

export const CategoryForm = ({ id } : { id: any }   ) => {
    const [categories, setCategories] = useState<ITreeData[]>([])
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
    
    const transformer = (data: ICategory[]) => {
        let list: any = []
        
        data.forEach((item) => {
            if (item.children && item.children.length > 0) {
                const child = transformer(item.children)
                list.push({
                    id: item.id,
                    title: item.name,
                    children: child
                })
            } else {
                list.push({
                    id: item.id,
                    title: item.name,
                })
            }
        })
        
        return list
    }
    
    useEffect(() => {
        getCategories().then(({data, success, pagination}) => {
            const newData = transformer(data)
            setCategories(newData)
            setIsLoading(false)
        })
        
        if (id) {
            getCategory(id).then(({data, success}) => {
                reset({
                    parent_id: data.parent_id,
                    parent_title: data?.parent_title,
                    name: data.name,
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
                name: value.name,
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
        <ContentLayout isLoading={isLoading || isSubmitting} breadCrumb={['User', 'Detail']}>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <TreeSelectField
                    label='Category'
                    labelCol='6'
                    inputCol='12'
                    treeData={categories}
                    registration={register('parent_title')}
                    onSelectValue={handleOnSelectValue}
                />
            
                <InputField
                    name='name'
                    label='Name'
                    labelCol='6'
                    inputCol='12'
                    classRequired={true}
                    registration={register('name')}
                    error={errors['name']}
                />
            
                <InputField
                    name='sort_order'
                    label='Sort Order'
                    labelCol='6'
                    inputCol='12'
                    registration={register('sort_order')}
                    error={errors['sort_order']}
                />
            
                <Switch
                    label='Is Public'
                    name='is_public'
                    labelCol='6'
                    inputCol='12'
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
