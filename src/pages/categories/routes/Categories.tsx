import React, { useEffect, useState } from 'react';
import { ContentLayout } from '../../../components/layouts/ContentLayout';
import { getCategories } from '../api/categories';
import { List } from '../components/List';
import { ICategory } from '@/pages/categories/interfaces';

export const Categories = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    
    useEffect(() => {
        getCategories().then((resp) => {
            setCategories(resp.data)
        })
    }, [])
    
    return (
        <ContentLayout breadCrumb={['Categories', 'List']}>
            <List data={categories} />
        </ContentLayout>
    );
};
