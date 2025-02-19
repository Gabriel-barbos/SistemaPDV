import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Caixa from "./pages/Caixa";
import ProductPage from "./pages/Produtos/ProductPage";
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

        </Routes>
      </Router>
    </>
  )
}

export default App
