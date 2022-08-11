import React, { useState } from 'react';
import { Layout, Menu, Row, Dropdown, Space } from 'antd';
import { PieChartOutlined, MenuOutlined, ShopOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../../pages/auth';
import { useAuth } from '../../providers/AuthProvider';
import '../../assets/style/MainLayout.css'
import { useAuthorization, ROLES } from '../../lib/authorization';

const { Footer, Sider } = Layout;

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar = () => {
    const { checkAccess } = useAuthorization();
    const [collapsed, setCollapsed] = useState(false);
    
    const items = [
        getItem(<Link to="/dashboard">Dashboard</Link>,'1', <PieChartOutlined />),
        checkAccess({ allowedRoles: [ROLES.super_admin] }) &&
        getItem('Users', 'sub1', <UserOutlined />, [
            getItem(<Link to="/dashboard/users">List</Link>, '2'),
            getItem(<Link to="/users/create">Create</Link>, '3'),
            getItem('Alex', '4'),
        ]),
        getItem('Product', 'sub2', <ShopOutlined />, [
            getItem(<Link to="/dashboard/products">List</Link>, '5'),
            getItem(<Link to="/dashboard/products/create">Create</Link>, '6')]
        ),
        checkAccess({ allowedRoles: [ROLES.super_admin] }) &&
        getItem('Category', 'sub3', <MenuOutlined />, [
            getItem(<Link to="/dashboard/categories">List</Link>, '7'),
            getItem(<Link to="/dashboard/categories/create">Create</Link>, '8')]
        ),
    ].filter(Boolean) as MenuItem[];
    
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <div className="logo" />
            <Menu
                theme="dark"
                defaultSelectedKeys={['1']}
                mode="inline"
                items={items}
            />
        </Sider>
    );
}

const Header = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    
    return (
        <Row justify="end" className="site-layout-background shadow">
            <Dropdown
                overlay={
                    <Menu
                        onClick={ async (e) => {
                            if (e.key == '2') {
                                await signOut()
                                setUser(null)
                                navigate('/login')
                            }
                        }}
                        items={[
                            {
                                label: <Link to="/dashboard">Your Profile</Link>,
                                key: '0',
                            },
                            {
                                type: 'divider',
                            },
                            {
                                label: 'Sign out',
                                key: '2',
                            }
                        ]}
                    />
                }
                trigger={ ['click'] }>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <SettingOutlined className='btn-setting'/>
                    </Space>
                </a>
            </Dropdown>
        </Row>
    );
}

type MainLayoutProps = {
    children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <Layout id='layout'>
            <Sidebar />
            <Layout className="site-layout">
                <Header/>
                {children}
                <Footer id='footer'>Ecommerce ©2018 Created by Steve</Footer>
            </Layout>
        </Layout>
    );
};
