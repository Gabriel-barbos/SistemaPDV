const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  payment: {
    method: { type: String, required: true }, // Exemplo: "dinheiro", "cartão"
    details: { type: String } // Informações adicionais se necessário
  },
  date: { type: Date, default: Date.now } // Data da venda, definida automaticamente
});

module.exports = mongoose.model('Sale', SaleSchema);
