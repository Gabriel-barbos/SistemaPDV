import React, { useState } from 'react';
import { Card, Statistic, Button, Input, Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import CountUp from 'react-countup';

const formatter = (value) => <CountUp end={value} />;

function ProductCardStock({ produto, updateProductQuantity }) {
  const [inputValue, setInputValue] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);

  const updateQuantity = () => {
    if (inputValue && !isNaN(inputValue) && Number(inputValue) >= 0) {
      console.log(`Updating product ${produto._id} with quantity ${inputValue}`);
      updateProductQuantity(produto._id, Number(inputValue))
        .then(() => {
          console.log('Update successful');
          setInputValue('');
          setIsInputVisible(false);
        })
        .catch((error) => {
          console.error('Update failed', error);
          alert('Falha ao atualizar a quantidade. Tente novamente.');
        });
    } else {
      alert("Por favor, insira um valor válido.");
    }
  };

  const handleUpdateClick = () => {
    setIsInputVisible(true);
  };

  return (
    <div>
      <Card
        title={produto.name}
        extra={
          <Tooltip title="Atualizar quantidade">
            <EditFilled onClick={handleUpdateClick} style={{ fontSize: 20, cursor: 'pointer' }} />
          </Tooltip>
        }
        style={{
          width: 250,
          margin: '10px',
        }}
        bodyStyle={{
          paddingTop: '5px',
          paddingBottom: '20px',
          paddingLeft: '15px',
          paddingRight: '15px',
        }}
      >
        <Statistic title="Quantidade" value={produto.quantity} formatter={formatter} />
        
        {isInputVisible && (
          <div style={{ marginTop: 10 }}>
            <Input
              type="number"
              placeholder="Insira novo valor"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              min="0"
            />
            <Button 
              type="primary" 
              onClick={updateQuantity} 
              style={{ marginTop: 10 }}
            >
              Confirmar
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default ProductCardStock;