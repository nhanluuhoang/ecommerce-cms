import React, { useState } from 'react';
import { ContentLayout } from '../../../components/layouts/ContentLayout';
import { List } from '../components/List';
import { Search } from '../components/Search';
import { IParams } from '../interfaces';

export const Products = () => {
    const [params, setParams] = useState<IParams>({
        'filter[title]': null,
        'filter[category_id]': null,
        'filter[sku]': null,
        'sort': null,
        'page[size]': 10,
        'page[number]': 1
    })
    
    const handlePagination = (number: number, size: number) => {
        setParams({...params, 'page[size]': size, 'page[number]': number})
    }
    
    const handleSearch = (value: any) => {
        setParams({
            ...params,
            'filter[title]': value.title,
            'filter[category_id]': value.parent_id,
            'filter[sku]': value.sku
        })
    }
    
    return (
        <ContentLayout breadCrumb={['Products', 'List']}>
            <Search onSearch={handleSearch} />
            <List params={params} onSelectPagination={handlePagination}/>
        </ContentLayout>
    );
};
