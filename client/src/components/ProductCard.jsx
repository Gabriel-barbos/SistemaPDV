import React, { useState } from 'react';
import { Button, Drawer, Form, Input, InputNumber, message, Popconfirm } from 'antd';
import { DeleteOutlined, SaveOutlined, FileSearchOutlined } from '@ant-design/icons';
import "../assets/productCard.css";

function ProductCard({ product, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
    form.setFieldsValue({
      name: product.name,
      price: product.price,
      cost: product.cost,
      quantity: product.quantity,
      code: product.code,
      BarCode: product.BarCode,
    });
  };

  const onClose = () => setOpen(false);

  const handleUpdate = async (values) => {
    try {
      const updatedProduct = { ...values, images: product.images };
      await onUpdate(product._id, updatedProduct);
      message.success('Produto atualizado com sucesso!');
      onClose();
    } catch {
      message.error('Erro ao atualizar produto');
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(product._id);
      message.success('Produto excluído com sucesso!');
      onClose();
    } catch {
      message.error('Erro ao excluir produto');
    }
  };

  return (
    <div className="card-container">
      <img
        className="card-img"
        src={product.image?.[0] || "https://via.placeholder.com/150"}
        alt={product.name}
      />

      <div className="card-content">
        <span className="card-title">{product.name || "Produto sem nome"}</span>
        <span className="card-code">cod. {product.code || "N/A"}</span>
        <span className="card-price">R$ {product.price ? product.price.toFixed(2) : "0,00"}</span>
      </div>

      <button className="custom-button" onClick={showDrawer}>
        <FileSearchOutlined style={{ marginRight: '8px' }} />
        Ver detalhes
      </button>

      <Drawer title="Editar Produto" onClose={onClose} open={open} width={400}>
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item name="name" label="Nome do Produto" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="code" label="Código do Produto" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="BarCode" label="Código de Barras" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Preço (R$)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item name="cost" label="Custo (R$)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item name="quantity" label="Quantidade em Estoque" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Button type="primary" icon={<SaveOutlined />} htmlType="submit" block>
            Salvar Alterações
          </Button>
        </Form>

        <Popconfirm
          title="Tem certeza que deseja excluir?"
          onConfirm={handleDelete}
          okText="Sim"
          cancelText="Não"
        >
          <Button type="default" danger icon={<DeleteOutlined />} block style={{ marginTop: 10 }}>
            Excluir Produto
          </Button>
        </Popconfirm>
      </Drawer>
    </div>
  );
}

export default ProductCard;
