import React, { useEffect, useState } from 'react';
import { Pagination, Table } from 'antd';
import { getUsers } from '../api/users';
import { IUser } from '@/pages/users/interfaces';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from '../../../components/elements';
import { Link } from 'react-router-dom';

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
        title: 'Email',
        dataIndex: 'email'
    },
    {
        key: '3',
        title: 'Phone',
        dataIndex: 'phone'
    },
    {
        key: '4',
        title: 'Full Name',
        dataIndex: 'full_name'
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
                <Button style={{margin: "5px"}} variant='danger'>
                    <DeleteOutlined/>
                </Button>
            </div>
        )
    }
]

type IParams = {
    'filter[email]': string | null,
    'filter[full_name]': string | null,
    'filter[phone]': string | null,
    'page[size]': number,
    'page[number]': number
}

type IUsersProps = {
    params: IParams,
    onSelectPagination: (number: number, size: number) => void
}

export const List = ({params, onSelectPagination}: IUsersProps) => {
    const [userList, setUserList] = useState<IUser[]>([]);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        total: 0
    });
    
    const callApiGetUsers = () => {
        getUsers(params).then((resp) => {
            setUserList(resp.data)
            setPagination({
                currentPage: resp.pagination.currentPage,
                total: resp.pagination.total
            })
        })
    }
    
    useEffect(() => {
        callApiGetUsers()
    }, [params])
    
    const handleChangePagination = (number: number, size: number) => {
        return onSelectPagination(number, size)
    }
    
    return (
        <>
            <Table
                rowKey='id'
                pagination={false}
                dataSource={userList}
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
