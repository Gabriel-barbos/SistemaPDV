import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Caixa from "./pages/Caixa/Caixa";
import ProductPage from "./pages/Produtos/ProductPage";
import Login from "./pages/Login/login";
import Estoque from "./pages/Estoque/Estoque";
import Relatorios from "./pages/Relatorio/Relatorios";
function App() {

  return (
    <>
      <Router>
        <Routes>

          <Route
            path="/caixa"
            element={
              <AppLayout selectedKey="1">
                <Caixa />
              </AppLayout>
            }
          />

          <Route
            path="/admin/estoque"
            element={
              <AppLayout selectedKey="3">
                  <Estoque/>
            </AppLayout>           
            }
          />
               <Route
            path="/admin/produtos"
            element={
              <AppLayout selectedKey="2">
                <ProductPage />
              </AppLayout>
            }
          />

          <Route
            path="/admin/relatorios"
            element={
              <AppLayout selectedKey="4">
                  <Relatorios/>
            </AppLayout>           
            }
          />
      
<Route
            path="/"
            element={
                <Login/>
           
            }
          />
       
        </Routes>
      </Router>
    </>
  )
}

export default App
