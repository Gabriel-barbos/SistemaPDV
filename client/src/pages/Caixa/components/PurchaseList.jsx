import React from "react";
import { TagOutlined } from "@ant-design/icons";
import emptyCart from "../../../assets/EmptyCart.gif";
import ProductItem from "../../../components/ProductItem";

function PurchaseList({ purchaseList, onQuantityChange, onRemoveProduct }) {
  return (
    <div className="order-list">
      <div className="page-title">
        <TagOutlined style={{ fontSize: 25, marginRight: 5 }} />
        <h2>Lista de compra</h2>
      </div>
      
      <div className="list">
        {purchaseList.length === 0 ? (
          <div className="empty-purchase-list" style={{ textAlign: "center", padding: "20px" }}>
            <img
              src={emptyCart}
              alt="Nenhum item"
              style={{ width: "100%", maxWidth: "250px", marginBottom: "5px" }}
            />
            <p style={{ fontSize: 20, fontWeight: 600 }}>
              Nenhum item na lista de compras
            </p>
          </div>
        ) : (
          purchaseList.map((item, index) => (
            <ProductItem
              key={`${item.product._id}-${index}`}
              product={item.product}
              quantity={item.quantity}
              onQuantityChange={(newQuantity) => onQuantityChange(index, newQuantity)}
              onRemove={() => onRemoveProduct(index)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PurchaseList;