import React, { useState } from 'react';
import { ContentLayout } from '../../../components/layouts/ContentLayout';
import { List } from '../components/List';
import { Search } from '../components/Search';

export const Users = () => {
    const [params, setParams] = useState({
        'filter[email]': null,
        'filter[full_name]': null,
        'filter[phone]': null,
        'page[size]': 10,
        'page[number]': 1
    });
    
    const handlePagination = (number: number, size: number) => {
        setParams({...params, 'page[size]': size, 'page[number]': number})
    }
    
    const handleSearch = (value: any) => {
        setParams({
            ...params,
            'filter[email]': value.email,
            'filter[full_name]': value.full_name,
            'filter[phone]': value.phone
        })
    }
    
    return (
        <ContentLayout breadCrumb={['User', 'List']}>
            <Search onSearch={handleSearch} />
            <List params={params} onSelectPagination={handlePagination}/>
        </ContentLayout>
    );
}
