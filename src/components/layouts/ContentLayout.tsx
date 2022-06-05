import React from 'react';
import { Breadcrumb, Layout, Spin } from 'antd';
import { useTitle } from '../../hooks/useTitle';

const { Content } = Layout;

type ContentLayout = {
    children: React.ReactNode;
    breadCrumb: string[];
    isLoading?: boolean
}

export const ContentLayout = ({ children, breadCrumb, isLoading = false }: ContentLayout) => {
    
    useTitle(breadCrumb[0])
    
    return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                {breadCrumb.map((item, index) => (
                    <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                ))}
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: '150vh' }}>
                <Spin
                    spinning={isLoading}
                    size="large"
                    tip="Loading..."
                >
                    {children}
                </Spin>
            </div>
        </Content>
    );
};
