import React from 'react'
import product from "../assets/product.avif"
import { Button } from 'antd'
import "../assets/productCard.css"
import { ExclamationCircleOutlined } from '@ant-design/icons';

function ProductCard() {
  return (
    <>
    <div className='card-container'>
        <img className="card-img" src={product}></img>
        <div className="card-content">
            <span className='card-title'>Caixa de banana</span>
            <span className='card-code'>cod. 8997</span>

            <span className='card-price'> R$ 59,90</span>
        </div>
           
        <Button
      type="primary"
      icon={<ExclamationCircleOutlined />}
      style={{ backgroundColor: '#50789e', borderColor: '#afb0af', color: 'white',fontSize: 17 }}
    >
      Ver detalhes
    </Button>
    </div>
    </>
  )
}

export default ProductCard