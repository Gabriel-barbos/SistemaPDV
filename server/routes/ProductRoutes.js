const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // já configurado

// Configuração do multer com Cloudinary para produtos
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'produtos', // define uma pasta específica para produtos
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// Criar um novo Produto
router.post('/', upload.array('image', 5), async (req, res) => {
  try {
    const imageUrls = req.files.map(file => file.path);

    const product = new Product({
      name: req.body.name,
      image: imageUrls,
      price: req.body.price,
      cost: req.body.cost,
      quantity: req.body.quantity,
      code: req.body.code,
      BarCode: req.body.BarCode,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos os Produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter um Produto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um Produto
router.put('/:id', upload.array('image', 5), async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      price: req.body.price,
      cost: req.body.cost,
      quantity: req.body.quantity,
      code: req.body.code,
      BarCode: req.body.BarCode,
    };

    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map(file => file.path);
      updatedData.image = imageUrls;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Excluir um Produto
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ message: 'Produto excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar apenas nome e quantidade dos produtos
router.get('/estoque', async (req, res) => {
  try {
    const products = await Product.find({}, 'name quantity'); // Busca apenas os campos 'name' e 'quantity'
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar apenas a quantidade de um produto
router.patch('/estoque/:id', async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({ error: 'A quantidade é obrigatória' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
