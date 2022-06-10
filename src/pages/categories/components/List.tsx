import React from 'react';
import { Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/elements';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ICategory } from '@/pages/categories/interfaces';
import { deleteCategory } from '../api/categories';

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
        title: 'Name',
        dataIndex: 'name'
    },
    {
        key: '3',
        title: 'Show/Hide',
        dataIndex: 'is_public',
        width: 100,
        align: 'center' as any,
        render: (is_public: boolean) => (
            <Tag color={`${is_public ? 'success' : 'error'}`}>
                { is_public ? 'Show' : 'Hide' }
            </Tag>
        )
    },
    {
        key: '4',
        title: 'Sort order',
        dataIndex: 'sort_order',
        width: 100,
        align: 'center' as any
    },
    {
        key: '5',
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
                <Button
                    onClick={ async () => {
                        await deleteCategory(id)
                        window.location.reload()
                    }}
                    style={{margin: "5px"}} variant='danger'>
                    <DeleteOutlined/>
                </Button>
            </div>
        )
    }
]

type IUsersProps = {
    data: ICategory[],
}

export const List = ({ data }: IUsersProps) => {
    return (
        <Table
            rowKey='id'
            pagination={false}
            dataSource={data}
            columns={columns}
        />
    );
};
