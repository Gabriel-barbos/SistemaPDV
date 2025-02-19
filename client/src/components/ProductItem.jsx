import React, {useState} from 'react'
import {Button} from 'antd';
import {RestOutlined } from '@ant-design/icons';
import '../assets/productitem.css'
import placeholder from "../assets/placeholder.webp"
import product from "../assets/product.avif"

function ProductItem() {
    const [quantidade, setQuantidade] = useState(1);

     // Funções para aumentar e diminuir a quantidade
  const aumentar = () => setQuantidade(quantidade + 1);
  const diminuir = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1); // Impede que a quantidade vá para 0 ou negativo
  };

  return (
    <>
    <div className='product-item'>
        <div className='product-left'>
                  <img  src={product} alt="Produto" />
            <div className='product-info'>
                <span className='title'>Caixa de banana</span><br></br>
                <span className='codigo'>Cod. 984919</span>
            </div>
        </div>

        <div className='product-right'>
            <span className='price'>R$: 59,90</span><br></br>
           
            <div className="contador">
      <button className="botao" onClick={diminuir}>-</button>
      <div className="quantidade">{quantidade}</div>
      <button className="botao" onClick={aumentar}>+</button>
    </div>
    <Button danger icon={<RestOutlined />}
    style={{marginTop: 10}}
    >
        Excluir
      </Button>
            </div>

    </div>
    </>
  )
}

export default ProductItem