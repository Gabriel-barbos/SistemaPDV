import React from 'react';
import { Form, Input, Button, InputNumber, Upload, Space, Row, Col } from 'antd';
import { EditOutlined, DollarOutlined, TagsOutlined, BarcodeOutlined, UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const ProductForm = () => {
  const onFinish = (values) => {
    console.log('Form Values:', values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Row gutter={16}>
        {/* Campo Imagem do Produto */}
        <Col span={24}>
          <Form.Item
            label="Imagem do Produto"
            name="productImage"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Por favor, faça o upload da imagem do produto!' }]}
          >
            <Upload
              name="logo"
              action="/upload.do"
              listType="picture"
              accept="image/*"
              maxCount={1}
              beforeUpload={() => false} // Impede o upload automático
            >
              <Button icon={<UploadOutlined />}>Clique para Upload</Button>
            </Upload>
          </Form.Item>
        </Col>

        {/* Campo Nome do Produto */}
        <Col span={24}>
          <Form.Item
            label="Nome do Produto"
            name="productName"
            rules={[{ required: true, message: 'Por favor, insira o nome do produto!' }]}
          >
            <Input
              prefix={<EditOutlined />}
              placeholder="Nome do Produto"
            />
          </Form.Item>
        </Col>

        {/* Campo Preço */}
        <Col span={12}>
          <Form.Item
            label="Preço"
            name="price"
            rules={[{ required: true, message: 'Por favor, insira o preço do produto!' }]}
          >
            <InputNumber
              prefix={<DollarOutlined />}
              style={{ width: '100%' }}
              placeholder="Preço do Produto"
            />
          </Form.Item>
        </Col>

        {/* Campo Custo */}
        <Col span={12}>
          <Form.Item
            label="Custo"
            name="cost"
            rules={[{ required: true, message: 'Por favor, insira o custo do produto!' }]}
          >
            <InputNumber
              prefix={<DollarOutlined />}
              style={{ width: '100%' }}
              placeholder="Custo do Produto"
            />
          </Form.Item>
        </Col>

        {/* Campo Código do Produto */}
        <Col span={12}>
          <Form.Item
            label="Código do Produto"
            name="productCode"
            rules={[{ required: true, message: 'Por favor, insira o código do produto!' }]}
          >
            <Input
              prefix={<TagsOutlined />}
              placeholder="Código do Produto"
            />
          </Form.Item>
        </Col>

        {/* Campo Código de Barra */}
        <Col span={12}>
          <Form.Item
            label="Código de Barra"
            name="barcode"
            rules={[{ required: true, message: 'Por favor, insira o código de barra do produto!' }]}
          >
            <Input
              prefix={<BarcodeOutlined />}
              placeholder="Código de Barra"
            />
          </Form.Item>
        </Col>

        {/* Botão de Submissão */}
        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Criar Produto
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductForm;
