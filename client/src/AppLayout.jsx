import React, { useState } from 'react';
import './main.css';
import {
  PieChartOutlined,
  TagOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

import { Layout, Menu } from 'antd';
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
  getItem('Caixa', '1', <ShoppingCartOutlined />),
  getItem('Produtos', '2', <TagOutlined />),
  getItem('Estoque', '3', <AppstoreOutlined />),
  getItem('Relátorios', '4', <PieChartOutlined />),
];

const AppLayout = ({ children, selectedKey }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: '#e0e0e0', // Cor de fundo do layout principal
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          background: '#002140', // Cor personalizada para o menu lateral
        }}
      >
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
              background: '#f0f2f5', // Cor personalizada para o conteúdo
              borderRadius: '8px', // Caso queira arredondar mais as bordas
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            background: '#001529', // Cor personalizada para o rodapé
            color: '#fff', // Cor do texto no rodapé
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
