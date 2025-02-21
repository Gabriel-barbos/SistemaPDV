import React, { useState } from 'react';
import { Card, Statistic, Button, Input, Tooltip } from 'antd';
import { ReloadOutlined,EditFilled } from '@ant-design/icons'; // Ícone de "reload"
import CountUp from 'react-countup';

const formatter = (value) => <CountUp end={value} />;

function ProductCardStock() {
  // Estado para a quantidade
  const [quantity, setQuantity] = useState(114);
  // Estado para controlar o valor do input
  const [inputValue, setInputValue] = useState('');
  // Estado para controlar a visibilidade do input
  const [isInputVisible, setIsInputVisible] = useState(false);

  // Função para atualizar a quantidade com o valor inserido pelo usuário
  const updateQuantity = () => {
    if (inputValue && !isNaN(inputValue)) {
      setQuantity(Number(inputValue)); // Atualiza a quantidade com o valor do input
      setInputValue(''); // Limpa o campo de input após a atualização
      setIsInputVisible(false); // Esconde o input após atualizar
    } else {
      alert("Por favor, insira um valor válido."); // Validação simples
    }
  };

  // Função para mostrar o input quando o ícone for clicado
  const handleUpdateClick = () => {
    setIsInputVisible(true); // Exibe o campo de input
  };

  return (
    <div>
      <Card
        title="Caderno infantil"
        variant="borderless"
        extra={
          <Tooltip title="Atualizar quantidade">
            {/* Ícone de reload para indicar a atualização */}
            <EditFilled onClick={handleUpdateClick} style={{ fontSize: 20, cursor: 'pointer' }} />
          </Tooltip>
        }
        style={{
          width: 250,
        }}
        bodyStyle={{
          paddingTop: '5px', // Reduz o padding superior do conteúdo
          paddingBottom: '20px', // Aumenta o padding inferior do conteúdo
          paddingLeft: '15px',  // Ajuste no padding esquerdo do conteúdo
          paddingRight: '15px', // Ajuste no padding direito do conteúdo
        }}
      >
        <Statistic title="Quantidade" value={quantity} formatter={formatter} />
        
        {/* Exibe o Input somente se o estado isInputVisible for true */}
        {isInputVisible && (
          <div style={{ marginTop: 10 }}>
            <Input
              type="number"
              placeholder="Insira novo valor"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Atualiza o valor do input
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
