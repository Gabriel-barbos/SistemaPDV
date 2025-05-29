import React, { useMemo } from "react";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  DollarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Input, Button, Modal, message } from "antd";

function OrderSummary({
  totalValue,
  selectedPayment,
  onPaymentSelect,
  fiadoName,
  onFiadoNameChange,
  onConcluirCompra,
  isSubmitting,
  dinheiroModalVisible,
  dinheiroReceived,
  onDinheiroReceivedChange,
  dinheiroTroco,
  onDinheiroTrocoChange,
  onCloseDinheiroModal
}) {
  
  // Calcula o troco em tempo real
  const computedTroco = useMemo(() => {
    const received = parseFloat(dinheiroReceived);
    if (!isNaN(received) && received >= totalValue) {
      return received - totalValue;
    }
    return null;
  }, [dinheiroReceived, totalValue]);

  const handleConfirmDinheiro = () => {
    const received = parseFloat(dinheiroReceived);
    if (isNaN(received) || received < totalValue) {
      message.error("Valor recebido deve ser maior ou igual ao total");
      return;
    }
    const troco = received - totalValue;
    onDinheiroTrocoChange(troco);
    onCloseDinheiroModal();
    message.success(`Troco calculado: R$ ${troco.toFixed(2)}`);
  };

  const handleCancelDinheiro = () => {
    onCloseDinheiroModal();
  };

  return (
    <>
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
            onClick={() => onPaymentSelect("cartao")}
            disabled={selectedPayment && selectedPayment !== "cartao"}
            className={selectedPayment === "cartao" ? "selected" : ""}
          >
            Cartão
          </Button>
          
          <Button
            icon={<DollarOutlined />}
            onClick={() => onPaymentSelect("dinheiro")}
            disabled={selectedPayment && selectedPayment !== "dinheiro"}
            className={selectedPayment === "dinheiro" ? "selected" : ""}
          >
            Dinheiro
          </Button>
          
          <Button
            icon={<FileTextOutlined />}
            onClick={() => onPaymentSelect("fiado")}
            disabled={selectedPayment && selectedPayment !== "fiado"}
            className={selectedPayment === "fiado" ? "selected" : ""}
          >
            Fiado
          </Button>
        </div>

        {selectedPayment === "fiado" && (
          <Input
            placeholder="Nome do cliente"
            value={fiadoName}
            onChange={(e) => onFiadoNameChange(e.target.value)}
            style={{ marginTop: "10px" }}
          />
        )}

        {selectedPayment === "dinheiro" && dinheiroTroco !== null && (
          <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f0f8ff", borderRadius: "4px" }}>
            <p style={{ margin: 0, color: "#1890ff" }}>
              <strong>✓ Troco calculado: R$ {dinheiroTroco.toFixed(2)}</strong>
            </p>
          </div>
        )}

        <Button
          type="primary"
          className="concluir-compra"
          onClick={onConcluirCompra}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          <CheckCircleOutlined />
          Concluir Compra
        </Button>
      </div>

      {/* Modal para calcular troco */}
      <Modal
        visible={dinheiroModalVisible}
        title="Calcular Troco"
        onCancel={handleCancelDinheiro}
        footer={[
          <Button key="cancel" onClick={handleCancelDinheiro}>
            Cancelar
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleConfirmDinheiro}
          >
            Confirmar
          </Button>,
        ]}
      >
        <div style={{ marginBottom: '16px' }}>
          <label>Valor recebido:</label>
          <Input
            type="number"
            placeholder="0.00"
            value={dinheiroReceived}
            onChange={(e) => onDinheiroReceivedChange(e.target.value)}
            style={{ marginTop: '8px' }}
          />
        </div>
        
        <p><strong>Total da compra:</strong> R$ {totalValue.toFixed(2)}</p>
        
        {computedTroco !== null && (
          <p style={{ color: computedTroco >= 0 ? 'green' : 'red', fontWeight: 'bold' }}>
            <strong>Troco:</strong> R$ {computedTroco.toFixed(2)}
          </p>
        )}
      </Modal>
    </>
  );
}

export default OrderSummary;