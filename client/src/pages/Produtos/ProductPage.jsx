import React from 'react'
import "./productpage.css"
import {Button} from 'antd';
import {ShoppingOutlined } from '@ant-design/icons';

function ProductPage() {
  return (
    <>
 <div className="page-top">
        <div className="Page-title">
          <ShoppingOutlined style={{ fontSize: 25, marginRight: 5 }} />
          <h1>Gerenciar Usuários</h1>
        </div>
        <Button
          type="primary"
          shape="primary"
          icon={<ShoppingOutlined />}
          size={26}
        >
          Adicionar novo
        </Button>
      </div>

<div className='product-list'>
    
</div>


    </>
  )
}

export default ProductPage