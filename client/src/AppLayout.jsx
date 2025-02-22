import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';
import {
  PieChartOutlined,
  TagOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Content, Footer, Sider } = Layout;

const items = [
  { key: "1", label: "Caixa", icon: <ShoppingCartOutlined />, path: "/caixa" },
  { key: "2", label: "Produtos", icon: <TagOutlined />, path: "/admin/produtos" },
  { key: "3", label: "Estoque", icon: <AppstoreOutlined />, path: "/admin/estoque" },
  { key: "4", label: "Relatórios", icon: <PieChartOutlined />, path: "/admin/envios" },
];

const AppLayout = ({ children, selectedKey }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  const handleMenuClick = (e) => {
    const selectedItem = items.find(item => item.key === e.key);
    if (selectedItem) {
      navigate(selectedItem.path); // Faz a navegação para a rota correspondente
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#e0e0e0' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: '#002140' }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]} // Mantém a aba selecionada
          onClick={handleMenuClick} // Captura os cliques no menu
          items={items}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#f0f2f5', borderRadius: '8px' }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
