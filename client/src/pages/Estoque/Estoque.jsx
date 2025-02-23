import React from 'react'
import {Card} from 'antd';
import {ShoppingOutlined,ProductOutlined  } from '@ant-design/icons';
import ProductCardStock from '../../components/ProductCardStock';
import "./Estoque.css"
import useEstoque from '../Estoque/useEstoque';


function Estoque() {
  const { estoque, loading, error, updateProductQuantity } = useEstoque();


  return (
  <div>
 
        <div className="Page-title">
          <ShoppingOutlined style={{ fontSize: 25, marginRight: 5 }} />
          <h1>Estoque</h1>
        </div>
     
      <div className='stock-list'>
        
     {estoque.map(produto => (
          <ProductCardStock 
            key={produto._id} 
            produto={produto} 
            updateProductQuantity={updateProductQuantity} 
          />
        ))}

      </div>

</div>
  )
}

export default Estoque