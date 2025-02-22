import React, { useState } from 'react';
import "./productpage.css"
import {Button, Drawer} from 'antd';
import {ShoppingOutlined } from '@ant-design/icons';
import ProductForm from '../../components/ProductForm';
import ProductCard from '../../components/ProductCard';
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
          shape="primary"
          icon={<ShoppingOutlined />}
          onClick={showDrawer}
          size={26}
        >
          Adicionar novo
        </Button>
      </div>

      <Drawer title="Cadastrar novo produto" onClose={onClose} open={open}>
      <ProductForm/>
      </Drawer>

<div className='product-list'>
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
</div>


    </>
  )
}

export default ProductPage