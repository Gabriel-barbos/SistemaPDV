import React from 'react'
import {Card} from 'antd';
import {ShoppingOutlined,ProductOutlined  } from '@ant-design/icons';
import ProductCardStock from '../../components/ProductCardStock';
import "./Estoque.css"


function Estoque() {
  return (
  <div>
 
        <div className="Page-title">
          <ShoppingOutlined style={{ fontSize: 25, marginRight: 5 }} />
          <h1>Estoque</h1>
        </div>
     
      <div className='stock-list'>
    <ProductCardStock/>
    <ProductCardStock/>
    <ProductCardStock/>
    <ProductCardStock/>

      </div>

</div>
  )
}

export default Estoque