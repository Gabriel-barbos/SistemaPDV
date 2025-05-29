import React, { useState, useCallback, useRef } from "react";
import { BarcodeOutlined } from "@ant-design/icons";
import { Input, List, message } from "antd";

const { Search } = Input;

function ProductSearch({ products, onAddProduct }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const searchTimeoutRef = useRef(null);

  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
    setSelectedProduct(null);
    
    if (!value.trim()) {
      setFilteredProducts([]);
      return;
    }

    // Limpa timeout anterior se existir
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Define novo timeout para busca otimizada
    searchTimeoutRef.current = setTimeout(() => {
      const searchValue = value.toLowerCase().trim();
      
      const filtered = products.filter((product) => {
        // Busca por código de barras (exata ou parcial)
        const barcodeMatch = product.BarCode && 
          product.BarCode.toLowerCase().includes(searchValue);
        
        // Busca por nome (parcial)
        const nameMatch = product.name && 
          product.name.toLowerCase().includes(searchValue);
        
        // Busca por código do produto se existir
        const codeMatch = product.code && 
          product.code.toLowerCase().includes(searchValue);
        
        return barcodeMatch || nameMatch || codeMatch;
      });
      
      setFilteredProducts(filtered);
    }, 300); // Delay de 300ms para evitar muitas requisições
  }, [products]);

  const handleSelectProduct = useCallback((product) => {
    setSearchTerm(product.name);
    setSelectedProduct(product);
    setFilteredProducts([]);
  }, []);

  const handleAddProduct = useCallback(() => {
    if (selectedProduct) {
      onAddProduct(selectedProduct);
      setSearchTerm("");
      setSelectedProduct(null);
    } else {
      // Verifica se é um código de barras exato
      const exactMatch = products.find(product => 
        product.BarCode === searchTerm.trim() || 
        product.code === searchTerm.trim()
      );
      
      if (exactMatch) {
        onAddProduct(exactMatch);
        setSearchTerm("");
        setSelectedProduct(null);
      } else {
        message.error("Selecione um produto da lista de sugestões ou digite um código válido.");
      }
    }
  }, [selectedProduct, products, searchTerm, onAddProduct]);

  // Função para lidar com Enter no campo de busca
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Se há produtos filtrados e apenas um, seleciona automaticamente
      if (filteredProducts.length === 1) {
        handleSelectProduct(filteredProducts[0]);
        return;
      }
      
      // Tenta adicionar o produto
      handleAddProduct();
    }
  }, [filteredProducts, handleSelectProduct, handleAddProduct]);

  return (
    <div className="searchbar">
      <div className="page-title">
        <BarcodeOutlined style={{ fontSize: 25, marginRight: 5 }} />
        <h2>Adicionar produto</h2>
      </div>
      
      <Search
        placeholder="Digite o código de barras ou nome do produto"
        allowClear
        enterButton="Adicionar"
        size="large"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onSearch={handleAddProduct}
        onKeyPress={handleKeyPress}
      />
      
      {filteredProducts.length > 0 && (
        <List
          className="autocomplete-list"
          dataSource={filteredProducts}
          renderItem={(item) => (
            <List.Item 
              className="autocomplete-item" 
              onClick={() => handleSelectProduct(item)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <strong>{item.name}</strong>
                <br />
                <small>Código: {item.BarCode || item.code} | Preço: R$ {item.price?.toFixed(2)}</small>
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default ProductSearch;