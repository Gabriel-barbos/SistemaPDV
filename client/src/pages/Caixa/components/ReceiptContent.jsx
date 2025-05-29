
import React from "react";

function ReceiptContent({ receiptData }) {
  return (
    <div id="receipt-content" style={{ display: "none" }}>
      <h1>Comprovante de Venda</h1>
      {receiptData && (
        <>
          <p>
            <strong>Total:</strong>{" "}
            {receiptData.total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          
          <h3>Itens:</h3>
          <ul>
            {receiptData.items.map((item, index) => (
              <li key={index}>
                {item.product.name} - Quantidade: {item.quantity} - Valor unitário:{" "}
                {Number(item.product.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })} - Subtotal:{" "}
                {(item.product.price * item.quantity).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </li>
            ))}
          </ul>
          
          <p>
            <strong>Forma de Pagamento:</strong> {receiptData.payment}
          </p>
          
          <p style={{ marginTop: '20px', textAlign: 'center' }}>
            <small>
              Obrigado pela preferência!
              <br />
              Data: {new Date().toLocaleString('pt-BR')}
            </small>
          </p>
        </>
      )}
    </div>
  );
}

export default ReceiptContent;