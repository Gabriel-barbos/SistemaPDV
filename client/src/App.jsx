// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Caixa from "./pages/Caixa/Caixa";
import ProductPage from "./pages/Produtos/ProductPage";
import Login from "./pages/Login/login";
import Estoque from "./pages/Estoque/Estoque";
import Relatorios from "./pages/Relatorio/Relatorios";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota de Login */}
        <Route path="/" element={<Login />} />

        {/* Rota de Caixa: Acessível para operador e admin */}
        <Route
          path="/caixa"
          element={
            <ProtectedRoute allowedRoles={['admin', 'operador']}>
              <AppLayout selectedKey="1">
                <Caixa />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Rotas Exclusivas para Admin */}
        <Route
          path="/admin/estoque"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AppLayout selectedKey="3">
                <Estoque />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/produtos"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AppLayout selectedKey="2">
                <ProductPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/relatorios"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AppLayout selectedKey="4">
                <Relatorios />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Rota de Acesso Negado */}
        <Route path="/unauthorized" element={<div>Acesso negado!</div>} />
      </Routes>
    </Router>
  );
}

export default App;
