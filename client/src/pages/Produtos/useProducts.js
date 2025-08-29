import { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';

const API_URL = 'https://sistemapdv-3.onrender.com/products';
const CACHE_KEY = 'products_cache';
const CACHE_TTL = 1000 * 60 * 5; // 5 minutos

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar todos os produtos
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const cache = localStorage.getItem(CACHE_KEY);
      if (cache) {
        const cachedData = JSON.parse(cache);
        const now = new Date().getTime();

        // Se cache ainda é válido
        if (now - cachedData.timestamp < CACHE_TTL) {
          setProducts(cachedData.data);
          setLoading(false);
          return;
        }
      }

      // Se não tem cache ou expirou
      const response = await axios.get(API_URL);
      setProducts(response.data);

      // Salva no cache
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data: response.data, timestamp: new Date().getTime() })
      );

    } catch (err) {
      setError(err);
      message.error("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar cache após criação/edição/deleção
  const updateCache = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: newProducts, timestamp: new Date().getTime() })
    );
  };

  // Criar produto
  const createProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(API_URL, productData, { headers: { 'Content-Type': 'multipart/form-data' } });
      message.success("Produto criado com sucesso!");
      await fetchProducts(); // atualiza cache
    } catch (err) {
      setError(err);
      message.error("Erro ao criar produto.");
    } finally {
      setLoading(false);
    }
  };

  // Atualizar produto
  const updateProduct = async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${API_URL}/${id}`, productData, { headers: { 'Content-Type': 'multipart/form-data' } });
      message.success("Produto atualizado com sucesso!");
      await fetchProducts(); // atualiza cache
    } catch (err) {
      setError(err);
      message.error("Erro ao atualizar produto.");
    } finally {
      setLoading(false);
    }
  };

  // Deletar produto
  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Produto excluído com sucesso!");
      await fetchProducts(); // atualiza cache
    } catch (err) {
      setError(err);
      message.error("Erro ao excluir produto.");
    } finally {
      setLoading(false);
    }
  };

  // Buscar produtos ao carregar a página
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
