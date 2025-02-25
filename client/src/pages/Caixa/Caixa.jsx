import React, { useState, useEffect } from "react";
import {
  BarcodeOutlined,
  TagOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  ShoppingOutlined,
  CreditCardOutlined,
  DollarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Input, Button, List, message } from "antd";
import product from "../../assets/product.avif";
import emptyGIF from "../../assets/emptyGIF.gif"
import "../Caixa/caixa.css";
const { Search } = Input;
import ProductItem from "../../components/ProductItem";
import useProducts from "../Produtos/useProducts";

function Caixa() {


  const { products, fetchProducts } = useProducts();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Cada item terá { product, quantity }
  const [purchaseList, setPurchaseList] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleRemoveProduct = (indexToRemove) => {
    setPurchaseList((prevList) =>
      prevList.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleQuantityChange = (index, newQuantity) => {
    setPurchaseList((prevList) => {
      const newList = [...prevList];
      newList[index].quantity = newQuantity;
      return newList;
    });
  };

  const handlePaymentSelect = (paymentType) => {
    setSelectedPayment(paymentType === selectedPayment ? null : paymentType);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setSelectedProduct(null);
    if (!value.trim()) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name?.toLowerCase().includes(value.toLowerCase()) ||
      product.BarCode?.includes(value)
    );
    setFilteredProducts(filtered);
  };

  const handleSelectProduct = (product) => {
    setSearchTerm(product.name);
    setSelectedProduct(product);
    setFilteredProducts([]);
  };

  const handleAddProduct = () => {
    if (selectedProduct) {
      // Se o produto já estiver na lista, incrementa sua quantidade
      const index = purchaseList.findIndex(
        (item) => item.product._id === selectedProduct._id
      );
      if (index !== -1) {
        handleQuantityChange(index, purchaseList[index].quantity + 1);
      } else {
        setPurchaseList((prev) => [...prev, { product: selectedProduct, quantity: 1 }]);
      }
      setSearchTerm("");
      setSelectedProduct(null);
      message.success("Produto adicionado à lista de compra!");
    } else {
      message.error("Selecione um produto da lista de sugestões.");
    }
  };

  // Calcula o total somando (preço * quantidade) de cada item
  const totalValue = purchaseList.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Último produto adicionado (para exibir os detalhes)
  const lastProduct =
    purchaseList.length > 0 ? purchaseList[purchaseList.length - 1].product : null;

  return (
    <div className="page-container">
      <div className="left-page">
        <div className="searchbar">
          <div className="page-title">
            <BarcodeOutlined style={{ fontSize: 25, marginRight: 5 }} />
            <h2> Adicionar produto</h2>
          </div>
          <Search
            placeholder="Digite o código ou nome do produto"
            allowClear
            enterButton="Adicionar"
            size="large"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleAddProduct}
          />
          {filteredProducts.length > 0 && (
            <List
              className="autocomplete-list"
              dataSource={filteredProducts}
              renderItem={(item) => (
                <List.Item
                  className="autocomplete-item"
                  onClick={() => handleSelectProduct(item)}
                >
                  {item.name} - R$ {item.price}
                </List.Item>
              )}
            />
          )}
        </div>

        <div className="order-list">
          <div className="page-title">
            <TagOutlined style={{ fontSize: 25, marginRight: 5 }} />
            <h2> Lista de compra</h2>
          </div>
          <div className="list">
            {purchaseList.map((item, index) => (
              <ProductItem
                key={index}
                product={item.product}
                quantity={item.quantity}
                onQuantityChange={(newQuantity) =>
                  handleQuantityChange(index, newQuantity)
                }
                onRemove={() => handleRemoveProduct(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="right-page">
        <div className="product-container">
          <div className="page-title">
            <ShoppingOutlined style={{ fontSize: 25, marginRight: 5 }} />
            <h2>Detalhes do pedido</h2>
          </div>
          {lastProduct ? (
            <>
              <img
                className="product-img"
                src={
                  lastProduct.image && lastProduct.image.length > 0
                    ? lastProduct.image[0]
                    : product
                }
                alt="Produto"
              />
              <div className="product-details">
                <div className="detail-item">
                  <TagOutlined style={{ fontSize: 20, marginRight: 10 }} />
                  <span className="detail-text">
                    <strong>Nome do Produto:</strong> {lastProduct.name}
                  </span>
                </div>
                <div className="detail-item">
                  <DollarOutlined style={{ fontSize: 20, marginRight: 10 }} />
                  <span className="detail-text">
                    <strong>Preço:</strong> R$ {lastProduct.price}
                  </span>
                </div>
                <div className="detail-item">
                  <BarcodeOutlined style={{ fontSize: 20, marginRight: 10 }} />
                  <span className="detail-text">
                    <strong>Cod.produto:</strong> {lastProduct.code || lastProduct.BarCode}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              
              <img className="product-img" src={emptyGIF} alt="Produto" />
              <div className="product-details">
                <div className="detail-item">
                  <span className="empty-text">
                   Nenhum produto adicionado 
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="total-container">
          <div className="page-title">
            <ShoppingCartOutlined style={{ fontSize: 25, marginRight: 5 }} />
            <h2>Resumo da compra</h2>
          </div>
          <div className="details">
            <span>Total: </span>
            <span className="total-value">
              {totalValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <div className="page-title">
            <ShoppingCartOutlined style={{ fontSize: 25, marginRight: 5 }} />
            <h2>Forma de pagamento:</h2>
          </div>

          <div className="payment-buttons">
            <Button
              icon={<CreditCardOutlined />}
              onClick={() => handlePaymentSelect("cartao")}
              disabled={selectedPayment && selectedPayment !== "cartao"}
              className={selectedPayment === "cartao" ? "selected" : ""}
            >
              Cartão
            </Button>
            <Button
              icon={<DollarOutlined />}
              onClick={() => handlePaymentSelect("dinheiro")}
              disabled={selectedPayment && selectedPayment !== "dinheiro"}
              className={selectedPayment === "dinheiro" ? "selected" : ""}
            >
              Dinheiro
            </Button>
            <Button
              icon={<FileTextOutlined />}
              onClick={() => handlePaymentSelect("fiado")}
              disabled={selectedPayment && selectedPayment !== "fiado"}
              className={selectedPayment === "fiado" ? "selected" : ""}
            >
              Fiado
            </Button>
          </div>

          <Button type="primary" className="concluir-compra">
            <CheckCircleOutlined />
            Concluir Compra
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Caixa;
