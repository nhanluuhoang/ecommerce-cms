import React, { useEffect, useState } from 'react';
import { ContentLayout } from '../../../components/layouts/ContentLayout';
import { getCategories } from '../api/categories';
import { List } from '../components/List';
import { ICategories } from '../interfaces';

export const Categories = () => {
    const [categories, setCategories] = useState<ICategories[]>([]);
    
    useEffect(() => {
        getCategories().then(({data, success, pagination}) => {
            setCategories(data)
        })
    }, [])
    
    return (
        <ContentLayout breadCrumb={['Categories', 'List']}>
            <List data={categories} />
        </ContentLayout>
    );
};
