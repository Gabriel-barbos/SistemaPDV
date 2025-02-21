import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Caixa from "./pages/Caixa/Caixa";
import ProductPage from "./pages/Produtos/ProductPage";
import Login from "./pages/Login/login";
import Estoque from "./pages/Estoque/Estoque";
function App() {

  return (
    <>
      <Router>
        <Routes>

          <Route
            path="/caixa"
            element={
              <AppLayout selectedKey="5">
                <Caixa />
              </AppLayout>
            }
          />

               <Route
            path="/admin/produtos"
            element={
              <AppLayout selectedKey="5">
                <ProductPage />
              </AppLayout>
            }
          />

<Route
            path="/"
            element={
                <Login/>
           
            }
          />

<Route
            path="/admin/estoque"
            element={
              <AppLayout selectedKey="5">
                  <Estoque/>
            </AppLayout>           
            }
          />
       
        </Routes>
      </Router>
    </>
  )
}

export default App
