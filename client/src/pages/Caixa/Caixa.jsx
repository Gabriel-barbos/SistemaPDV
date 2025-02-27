import React, { useState, useEffect, useCallback, useMemo } from "react";
import debounce from "lodash/debounce";
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
import { Input, Button, List, message, Modal, Result } from "antd";
import product from "../../assets/product.avif";
import emptyGIF from "../../assets/emptyGIF.gif";
import emptyList from "../../assets/emptyList.png";
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
  // Estado para controle do modal de venda confirmada
  const [saleConfirmed, setSaleConfirmed] = useState(false);
  // Estado para controle do carregamento na conclusão da venda
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleRemoveProduct = useCallback((indexToRemove) => {
    setPurchaseList((prevList) =>
      prevList.filter((_, index) => index !== indexToRemove)
    );
  }, []);

  const handleQuantityChange = useCallback((index, newQuantity) => {
    if (newQuantity < 1) {
      message.error("A quantidade deve ser pelo menos 1.");
      return;
    }
    setPurchaseList((prevList) => {
      const newList = [...prevList];
      newList[index].quantity = newQuantity;
      return newList;
    });
  }, []);

  const handlePaymentSelect = useCallback((paymentType) => {
    setSelectedPayment((prevPayment) =>
      prevPayment === paymentType ? null : paymentType
    );
  }, []);

  const handleSearch = useCallback(
    (value) => {
      setSearchTerm(value);
      setSelectedProduct(null);
      if (!value.trim()) {
        setFilteredProducts([]);
        return;
      }
      const filtered = products.filter(
        (product) =>
          product.name?.toLowerCase().includes(value.toLowerCase()) ||
          product.BarCode?.includes(value)
      );
      setFilteredProducts(filtered);
    },
    [products]
  );

  // Implementação de debounce para evitar buscas a cada digitação
  const debouncedHandleSearch = useMemo(
    () => debounce(handleSearch, 300),
    [handleSearch]
  );

  const handleSelectProduct = useCallback((product) => {
    setSearchTerm(product.name);
    setSelectedProduct(product);
    setFilteredProducts([]);
  }, []);

  const handleAddProduct = useCallback(() => {
    if (selectedProduct) {
      // Se o produto já estiver na lista, incrementa sua quantidade
      const index = purchaseList.findIndex(
        (item) => item.product._id === selectedProduct._id
      );
      if (index !== -1) {
        handleQuantityChange(index, purchaseList[index].quantity + 1);
      } else {
        setPurchaseList((prev) => [
          ...prev,
          { product: selectedProduct, quantity: 1 },
        ]);
      }
      setSearchTerm("");
      setSelectedProduct(null);
      message.success("Produto adicionado à lista de compra!");
    } else {
      message.error("Selecione um produto da lista de sugestões.");
    }
  }, [selectedProduct, purchaseList, handleQuantityChange]);

  // Cálculo do total memorizado para evitar recomputações desnecessárias
  const totalValue = useMemo(() => {
    return purchaseList.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [purchaseList]);

  // Último produto adicionado (para exibir os detalhes)
  const lastProduct = useMemo(() => {
    return purchaseList.length > 0 ? purchaseList[purchaseList.length - 1].product : null;
  }, [purchaseList]);

  const handleConcluirCompra = useCallback(async () => {
    if (purchaseList.length === 0) {
      message.error("A lista de compra está vazia!");
      return;
    }
    if (!selectedPayment) {
      message.error("Selecione uma forma de pagamento!");
      return;
    }
    setIsSubmitting(true);

    // Mapeia a lista para o formato esperado pelo back-end: { productId, quantity }
    const items = purchaseList.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));

    const payment = { method: selectedPayment };
    const data = { items, payment };

    try {
      const response = await fetch("http://localhost:3000/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao registrar venda.");
      }

      await response.json();
      setSaleConfirmed(true);
      setPurchaseList([]);
      setSelectedPayment(null);
    } catch (error) {
      console.error("Erro:", error);
      message.error("Erro ao concluir a compra!");
    } finally {
      setIsSubmitting(false);
    }
  }, [purchaseList, selectedPayment]);

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
            onChange={(e) => debouncedHandleSearch(e.target.value)}
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
            {purchaseList.length === 0 ? (
              <div
                className="empty-purchase-list"
                style={{ textAlign: "center", padding: "20px" }}
              >
                <img
                  src={emptyList}
                  alt="Nenhum item"
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    marginBottom: "10px",
                  }}
                />
                <p style={{ fontSize: 20, fontWeight: 600 }}>
                  Nenhum item na lista de compras
                </p>
              </div>
            ) : (
              purchaseList.map((item, index) => (
                <ProductItem
                  key={index}
                  product={item.product}
                  quantity={item.quantity}
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(index, newQuantity)
                  }
                  onRemove={() => handleRemoveProduct(index)}
                />
              ))
            )}
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
                    <strong>Cod.produto:</strong>{" "}
                    {lastProduct.code || lastProduct.BarCode}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <img className="product-img" src={emptyGIF} alt="Produto" />
              <div className="product-details">
                <div className="detail-item">
                  <span className="empty-text">Nenhum produto adicionado</span>
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

          <Button
            type="primary"
            className="concluir-compra"
            onClick={handleConcluirCompra}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            <CheckCircleOutlined />
            Concluir Compra
          </Button>
        </div>
      </div>

      {/* Modal para exibir confirmação de venda */}
      <Modal
        visible={saleConfirmed}
        footer={null}
        onCancel={() => setSaleConfirmed(false)}
      >
        <Result
          status="success"
          title="Venda confirmada!"
          subTitle="A sua compra foi registrada com sucesso."
          extra={[
            <Button
              type="primary"
              key="ok"
              onClick={() => setSaleConfirmed(false)}
            >
              OK
            </Button>,
          ]}
        />
      </Modal>
    </div>
  );
}

export default Caixa;
