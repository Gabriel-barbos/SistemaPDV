import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar todos os produtos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Função para criar um novo produto
  const createProduct = async (productData) => {
    try {
      // productData deve ser um FormData para enviar imagens
      await axios.post(API_URL, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Atualiza a lista de produtos após criação
      fetchProducts();
    } catch (err) {
      setError(err);
    }
  };

  // Função para atualizar um produto
  const updateProduct = async (id, productData) => {
    try {
      await axios.put(`${API_URL}/${id}`, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Atualiza a lista de produtos após atualização
      fetchProducts();
    } catch (err) {
      setError(err);
    }
  };

  // Função para deletar um produto
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Atualiza a lista de produtos após exclusão
      fetchProducts();
    } catch (err) {
      setError(err);
    }
  };

  // Buscar os produtos na carga inicial
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;
