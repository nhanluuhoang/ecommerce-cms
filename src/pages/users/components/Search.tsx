import React from 'react';
import { Col, Row } from 'antd';
import { InputField } from '../../../components/form/InputField';
import { Button } from '../../../components/elements';
import { SearchOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';

type ISearchProps = {
    onSearch: (value: any) => void
}

export const Search = ({onSearch}: ISearchProps) => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    
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
                            name='email'
                            registration={register('email')}
                            label='Email'
                            labelCol='5'
                            placeholder='Input email'
                        />
                    </Col>
                    <Col span={12}>
                        <InputField
                            name='phone'
                            registration={register('phone')}
                            label='Phone'
                            labelCol='5'
                            placeholder='Input phone'
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <InputField
                            name='full_name'
                            registration={register('full_name')}
                            label='Name'
                            labelCol='5'
                            placeholder='Input name'
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
