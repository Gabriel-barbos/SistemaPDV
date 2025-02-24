import React, { useState } from 'react';
import "./productpage.css";
import { Button, Drawer, Spin, Alert } from 'antd';
import { ShoppingOutlined,PlusCircleOutlined } from '@ant-design/icons';
import ProductForm from '../../components/ProductForm';
function ProductPage() {


  const [open, setOpen] = useState(false);
const showDrawer = () => {
  setOpen(true);
};
const onClose = () => {
  setOpen(false);
};

  return (
    <>
      <div className="page-top">
        <div className="Page-title">
          <ShoppingOutlined style={{ fontSize: 25, marginRight: 5 }} />
          <h1>Gerenciar Produtos</h1>
        </div>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={showDrawer}
        >
          Adicionar novo
        </Button>
      </div>

      <Drawer title="Cadastrar novo produto" onClose={onClose} open={open}>
      <ProductForm/>
      </Drawer>

<div className='product-list'>
    <ProductCard/>
</div>


    </>
  );
}

export default ProductPage;
