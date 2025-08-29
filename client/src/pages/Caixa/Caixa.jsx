import React, { useState, useEffect, useCallback } from "react";
import { BarcodeOutlined } from "@ant-design/icons";
import { message, Modal, Result, Button } from "antd";
import "../Caixa/caixa.css";
import useProducts from "../Produtos/useProducts";
import ProductSearch from "./components/ProductSearch";
import PurchaseList from "./components/PurchaseList";
import OrderDetails from "./components/OrderDetails";
import OrderSummary from "./components/OrderSummary";
import ReceiptContent from "./components/ReceiptContent";

function Caixa() {
  const { products, fetchProducts } = useProducts();
  
  // Estados principais
  const [purchaseList, setPurchaseList] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [saleConfirmed, setSaleConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  
  // Estados para dados adicionais de pagamento
  const [fiadoName, setFiadoName] = useState("");
  const [dinheiroModalVisible, setDinheiroModalVisible] = useState(false);
  const [dinheiroReceived, setDinheiroReceived] = useState("");
  const [dinheiroTroco, setDinheiroTroco] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = useCallback((product) => {
    const index = purchaseList.findIndex(
      (item) => item.product._id === product._id
    );
    
    if (index !== -1) {
      handleQuantityChange(index, purchaseList[index].quantity + 1);
    } else {
      setPurchaseList((prev) => [
        ...prev,
        { product, quantity: 1 },
      ]);
    }
    message.success("Produto adicionado à lista de compra!");
  }, [purchaseList]);

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
    if (paymentType === "dinheiro") {
      setSelectedPayment("dinheiro");
      setDinheiroModalVisible(true);
    } else {
      setSelectedPayment(selectedPayment === paymentType ? null : paymentType);
      setDinheiroModalVisible(false);
    }
  }, [selectedPayment]);

  const totalValue = purchaseList.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const lastProduct = purchaseList.length > 0 ? 
    purchaseList[purchaseList.length - 1].product : null;

  const handleConcluirCompra = useCallback(async () => {
    if (purchaseList.length === 0) {
      message.error("A lista de compra está vazia!");
      return;
    }
    if (!selectedPayment) {
      message.error("Selecione uma forma de pagamento!");
      return;
    }
    if (selectedPayment === "fiado" && !fiadoName.trim()) {
      message.error("Informe o nome do cliente para pagamento fiado");
      return;
    }
    if (selectedPayment === "dinheiro" && dinheiroTroco === null) {
      message.error("Calcule o troco para pagamento em dinheiro");
      return;
    }
    
    setIsSubmitting(true);

    const items = purchaseList.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));

    const payment = { method: selectedPayment };
    if (selectedPayment === "fiado") {
      payment.details = fiadoName;
    } else if (selectedPayment === "dinheiro") {
      payment.details = `Valor recebido: R$ ${parseFloat(dinheiroReceived).toFixed(2)}`;
    }

    const data = { items, payment };

    try {
      const response = await fetch("https://sistema-pdv-eight.vercel.app/sales", {
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

      const saleDataForReceipt = {
        items: purchaseList,
        total: totalValue,
        payment:
          selectedPayment === "fiado"
            ? `Fiado - ${fiadoName}`
            : selectedPayment === "dinheiro"
            ? `Dinheiro - Valor recebido: R$ ${parseFloat(dinheiroReceived).toFixed(2)} | Troco: R$ ${
                dinheiroTroco !== null ? dinheiroTroco.toFixed(2) : "0.00"
              }`
            : "Cartão",
      };

      setReceiptData(saleDataForReceipt);
      setSaleConfirmed(true);

      // Limpa os dados da compra
      setPurchaseList([]);
      setSelectedPayment(null);
      setFiadoName("");
      setDinheiroTroco(null);
      setDinheiroReceived("");
    } catch (error) {
      console.error("Erro:", error);
      message.error("Erro ao concluir a compra!");
    } finally {
      setIsSubmitting(false);
    }
  }, [purchaseList, selectedPayment, fiadoName, dinheiroReceived, totalValue, dinheiroTroco]);

  const handlePrint = () => {
    const printContents = document.getElementById("receipt-content").innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Comprovante de Venda</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; }
            ul { list-style-type: none; padding: 0; }
            li { margin-bottom: 5px; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="page-container">
      <div className="left-page">
        <ProductSearch 
          products={products}
          onAddProduct={handleAddProduct}
        />
        
        <PurchaseList
          purchaseList={purchaseList}
          onQuantityChange={handleQuantityChange}
          onRemoveProduct={handleRemoveProduct}
        />
      </div>

      <div className="right-page">
        <OrderDetails lastProduct={lastProduct} />
        
        <OrderSummary
          totalValue={totalValue}
          selectedPayment={selectedPayment}
          onPaymentSelect={handlePaymentSelect}
          fiadoName={fiadoName}
          onFiadoNameChange={setFiadoName}
          onConcluirCompra={handleConcluirCompra}
          isSubmitting={isSubmitting}
          dinheiroModalVisible={dinheiroModalVisible}
          dinheiroReceived={dinheiroReceived}
          onDinheiroReceivedChange={setDinheiroReceived}
          dinheiroTroco={dinheiroTroco}
          onDinheiroTrocoChange={setDinheiroTroco}
          onCloseDinheiroModal={() => {
            setDinheiroModalVisible(false);
            // Se cancelar, remove a seleção de dinheiro
            if (selectedPayment === "dinheiro" && !dinheiroTroco) {
              setSelectedPayment(null);
            }
          }}
        />
      </div>

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
            <Button type="primary" key="print" onClick={handlePrint}>
              Imprimir Comprovante
            </Button>,
            <Button type="default" key="ok" onClick={() => setSaleConfirmed(false)}>
              OK
            </Button>,
          ]}
        />
      </Modal>

      <ReceiptContent receiptData={receiptData} />
    </div>
  );
}

export default Caixa;