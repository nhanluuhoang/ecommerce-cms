import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { InputField, TreeSelectField } from '../../../components/form';
import { Button } from '../../../components/elements';
import { useForm } from 'react-hook-form';
import { SearchOutlined } from '@ant-design/icons';
import { getCategories } from '../../categories/api/categories';

type ISearchProps = {
    onSearch: (value: any) => void
}

type ITreeData = {
    title: string;
    id: number;
    children?: ITreeData[]
};

const layout = {
    labelCol: 5
}

export const Search = ({onSearch}: ISearchProps) => {
    const [categories, setCategories] = useState<ITreeData[]>([])
    const { register, reset, handleSubmit, formState: { isSubmitting } } = useForm();
    
    useEffect(() => {
        getCategories().then(({data, success, pagination}) => {
            setCategories(data)
        })
    }, [])
    
    const handleOnSelectValue = ({ parent_id, parent_title }: { parent_id: number, parent_title: string }) => {
        reset({
            parent_id,
            parent_title
        })
    };
    
    const handleSearch = (search: any) => {
        onSearch(search)
    }
    
    return (
        <div className='shadow'
             style={{
                 background: 'rgba(128, 128, 128, 0.08)',
                 marginBottom: '30px',
                 padding: '25px 25px 5px 25px'
             }}
        >
            <form onSubmit={handleSubmit(handleSearch)}>
                <Row>
                    <Col span={12}>
                        <InputField
                            name='title'
                            registration={register('title')}
                            label='Title'
                            labelCol={layout.labelCol}
                            placeholder='Input title'
                        />
                    </Col>
                    <Col span={12}>
                        <TreeSelectField
                            label='Category'
                            treeData={categories}
                            registration={register('parent_title')}
                            onSelectValue={handleOnSelectValue}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <InputField
                            name='sku'
                            registration={register('sku')}
                            label='Sku'
                            labelCol={layout.labelCol}
                            placeholder='Input sku'
                        />
                    </Col>
                </Row>
                <div style={{textAlign: 'center'}}>
                    <Button type='submit' isLoading={isSubmitting}>
                        <SearchOutlined/> Search
                    </Button>
                </div>
            </form>
        </div>
    );
};
