import React, { useState } from 'react';

import { BarcodeOutlined,TagOutlined,ShoppingCartOutlined,CheckCircleOutlined,ShoppingOutlined, CreditCardOutlined, DollarOutlined, FileTextOutlined  } from '@ant-design/icons';
import { Input, Button} from 'antd';
import placeholder from "../assets/placeholder.webp"
import product from "../assets/product.avif"
import "../pages/caixa.css"
const { Search } = Input;
import ProductItem from '../components/ProductItem';

function Caixa() {

  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentSelect = (paymentType) => {
    // Permite alternar entre os métodos de pagamento
    setSelectedPayment(paymentType === selectedPayment ? null : paymentType);
  };
  return (
    <div>
        <div className='page-container'>

             <div className='left-page'>
             
             <div className='searchbar'>

              <div className='page-title'>
              <BarcodeOutlined  style={{ fontSize: 25, marginRight: 5 }}/>
                <h2> Adicionar produto</h2>
              </div>
    <Search
      placeholder="Digite o codigo ou nome do produto"
      allowClear
      enterButton="Adicionar"
      size="large"
    />
</div>

<div className='order-list'>
<div className='page-title'>
  <TagOutlined  style={{ fontSize: 25, marginRight: 5 }}/>
        <h2> Lista de compra</h2>      
  </div>

  <div className='list'>

    <ProductItem/>
    <ProductItem/>
    <ProductItem/>
  

  </div>
</div>
            </div>

            <div className='right-page'>
               
            <div className="product-container">
      <div className="page-title">
        <ShoppingOutlined  style={{ fontSize: 25, marginRight: 5 }} />
        <h2>Detalhes do pedido</h2>
      </div>

      <img className="product-img" src={product} alt="Produto" />
      
      <div className='product-details'>

        <div className='detail-item'>
          <TagOutlined style={{ fontSize: 20, marginRight: 10 }} />
          <span className='detail-text'><strong>Nome do Produto:</strong> Caixa de banana</span>
        </div>
        <div className='detail-item'>
          <DollarOutlined style={{ fontSize: 20, marginRight: 10 }} />
          <span className='detail-text'><strong>Preço:</strong> R$ 59,90</span>
        </div>
        <div className='detail-item'>
          <BarcodeOutlined style={{ fontSize: 20, marginRight: 10 }} />
          <span className='detail-text'><strong>Cod.produto:</strong> 984919</span>
        </div>
      </div>

    </div>
<div className='total-container'>
      <div className='page-title'>
        <ShoppingCartOutlined style={{ fontSize: 25, marginRight: 5 }} />
        <h2>Resumo da compra</h2>
      </div>

      <div className='details'>
        <span>Total: </span>
        <span className='total-value'>R$ 198,70</span> {/* Exemplo de valor */}
      </div>

      <div className='page-title'>
        <ShoppingCartOutlined style={{ fontSize: 25, marginRight: 5 }} />
        <h2>Forma de pagamento:</h2>
      </div>

      <div className='payment-buttons'>
        <Button
          icon={<CreditCardOutlined />}
          onClick={() => handlePaymentSelect('cartao')}
          disabled={selectedPayment && selectedPayment !== 'cartao'}
          className={selectedPayment === 'cartao' ? 'selected' : ''}
        >
          Cartão
        </Button>
        <Button
          icon={<DollarOutlined />}
          onClick={() => handlePaymentSelect('dinheiro')}
          disabled={selectedPayment && selectedPayment !== 'dinheiro'}
          className={selectedPayment === 'dinheiro' ? 'selected' : ''}
        >
          Dinheiro
        </Button>
        <Button
          icon={<FileTextOutlined />}
          onClick={() => handlePaymentSelect('fiado')}
          disabled={selectedPayment && selectedPayment !== 'fiado'}
          className={selectedPayment === 'fiado' ? 'selected' : ''}
        >
          Fiado
        </Button>
      </div>

      <Button type='primary' className='concluir-compra'>
      <CheckCircleOutlined />
        Concluir Compra
      </Button>
    </div>
            </div>
        </div>
    </div>
  )
}

export default Caixa