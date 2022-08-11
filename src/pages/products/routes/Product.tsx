import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';

export const Product = () => {
    const { productId } = useParams();
    return (
        <ProductForm id={productId} ></ProductForm>
    );
};
