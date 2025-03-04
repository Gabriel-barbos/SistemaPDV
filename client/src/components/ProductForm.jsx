import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Upload, Row, Col, message } from 'antd';
import { EditOutlined, DollarOutlined, FieldNumberOutlined,PlusOutlined, TagsOutlined, BarcodeOutlined, UploadOutlined } from '@ant-design/icons';
import useProducts from '../pages/Produtos/useProducts';

const ProductForm = () => {
  const { createProduct, loading } = useProducts();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const normFile = (e) => {
    return e?.fileList ? e.fileList.slice(-1) : [];
  };

  const handleSubmit = async (values) => {
    if (!fileList.length) {
      message.error('Por favor, faça o upload da imagem do produto!');
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('price', values.price);
    formData.append('cost', values.cost);
    formData.append('quantity', values.quantity);
    formData.append('code', values.code);
    formData.append('BarCode', values.BarCode);
    formData.append('image', fileList[0].originFileObj); // Apenas um arquivo permitido

    try {
      await createProduct(formData);
      message.success('Produto criado com sucesso!');
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error('Erro ao criar produto.');
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Imagem do Produto"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Por favor, faça o upload da imagem do produto!' }]}
          >
            <Upload
              listType="picture"
              accept="image/*"
              maxCount={1}
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              <Button icon={<UploadOutlined />}>Selecionar Imagem  PNG ou JPEG</Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Nome do Produto"
            name="name"
            rules={[{ required: true, message: 'Por favor, insira o nome do produto!' }]}
          >
            <Input prefix={<EditOutlined />} placeholder="Nome do Produto" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Quantidade"
            name="quantity"
            rules={[{ required: true, message: 'Por favor, insira a quantidade do produto!' }]}
            prefix={<FieldNumberOutlined />}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Quantidade" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Preço"
            name="price"
            rules={[{ required: true, message: 'Por favor, insira o preço do produto!' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Ex: 6.50" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Custo"
            name="cost"
            rules={[{ required: true, message: 'Por favor, insira o custo do produto!' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Custo" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Código do Produto"
            name="code"
            rules={[{ required: true, message: 'Por favor, insira o código do produto!' }]}
          >
            <Input prefix={<TagsOutlined />} placeholder="Código do Produto" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Código de Barras"
            name="BarCode"
            rules={[{ required: true, message: 'Por favor, insira o código de barras do produto!' }]}
          >
            <Input prefix={<BarcodeOutlined />} placeholder="Código de Barras" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}
            icon={<PlusOutlined />}>
              Criar Produto
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductForm;
