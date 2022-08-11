import React, { useEffect, useState } from 'react';
import { IParams, IProduct } from '../interfaces';
import { Pagination, Table } from 'antd';
import { getProducts } from '../api/products';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/elements';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const columns = [
    {
        key: '1',
        title: 'No',
        width: 100,
        dataIndex: 'id',
        align: 'center' as any,
    },
    {
        key: '2',
        title: 'Title',
        dataIndex: 'title'
    },
    {
        key: '3',
        title: 'Category title',
        dataIndex: 'category_title'
    },
    {
        key: '4',
        title: 'Price',
        dataIndex: 'price',
    },
    {
        key: '5',
        title: 'Sku',
        dataIndex: 'sku',
    },
    {
        key: '6',
        title: 'Quantity',
        dataIndex: 'quantity',
    },
    {
        key: '7',
        title: 'Action',
        dataIndex: 'id',
        width: 150,
        fixed: 'right' as any,
        align: 'center' as any,
        render: (id: number) => (
            <div style={{display: 'inline'}}>
                <Link to={`./${id}`}>
                    <Button style={{margin: "5px"}} variant='default'>
                        <EditOutlined />
                    </Button>
                </Link>
                <Button style={{margin: "5px"}} variant='danger'>
                    <DeleteOutlined/>
                </Button>
            </div>
        )
    }
]

type IUsersProps = {
    params: IParams,
    onSelectPagination: (number: number, size: number) => void
}

export const List = ({params, onSelectPagination}: IUsersProps) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        total: 0
    });
    
    useEffect(() => {
        getProducts(params).then(({success, data, pagination}) => {
            setProducts(data)
            setPagination({
                currentPage: pagination.currentPage,
                total: pagination.total
            })
        })
    }, [params])
    
    const handleChangePagination = (number: number, size: number) => {
        return onSelectPagination(number, size)
    }
    
    return (
        <>
            <Table
                rowKey='id'
                pagination={false}
                dataSource={products}
                columns={columns}
            />
            <Pagination
                style={{marginTop: '30px', textAlign: 'right'}}
                onChange={handleChangePagination}
                showSizeChanger
                current={pagination.currentPage}
                total={pagination.total}
            />
        </>
    );
};
