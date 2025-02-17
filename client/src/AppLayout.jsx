import React, { useState } from 'react';
import './main.css'
import {
  PieChartOutlined,
  TagOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';

import {  Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Caixa', '1', <ShoppingCartOutlined /> ),
  getItem('Produtos', '2', <TagOutlined />),
  getItem('Estoque', '3', <AppstoreOutlined />),
  getItem('Relátorios', '4', <PieChartOutlined />),
];

const AppLayout = ({ children, selectedKey }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 
 
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
       
        <Content
          style={{
            margin: '0 16px',
          }}
        >
       
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AppLayout;