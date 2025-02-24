import React from 'react'
import product from "../assets/product.avif"
import { Button } from 'antd'
import "../assets/productCard.css"

function ProductCard() {
  return (
    <>
      <div className='card-container'>
        <img className="card-img" src={product}></img>
        <span>Caixa de banana</span>
        <span className='card-price'> R$ 59,90</span>
        <span>cod. 8997</span>
        <Button
          type='default'
        >
          Ver detalhes
        </Button>
      </div>
    </>
  )
}

export default ProductCard