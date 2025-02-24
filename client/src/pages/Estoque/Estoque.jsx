import React from 'react';
import { Card } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import ProductCardStock from '../../components/ProductCardStock';
import './Estoque.css';
import useProducts from '../Produtos/useProducts';

function Estoque() {
  const { products, loading, error, updateProduct } = useProducts();

  return (
    <div>
      <div className="Page-title">
        <ShoppingOutlined style={{ fontSize: 25, marginRight: 5 }} />
        <h1>Estoque</h1>
      </div>

      <div className='stock-list'>
        {products.map((produto) => (
          <ProductCardStock 
            key={produto._id} 
            produto={produto} 
            updateProduct={updateProduct} 
          />
        ))}
      </div>
    </div>
  );
}

export default Estoque;
