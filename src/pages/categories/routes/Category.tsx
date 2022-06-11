import React from 'react';
import { useParams } from 'react-router-dom';
import { CategoryForm } from '../components/CategoryForm';

export const Category = () => {
    const { categoryId } = useParams();
    
    return (
        <CategoryForm id={categoryId}></CategoryForm>
    );
};
