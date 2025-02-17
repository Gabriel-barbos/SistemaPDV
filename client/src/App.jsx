import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Caixa from "./pages/Caixa";
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

        </Routes>
      </Router>
    </>
  )
}

export default App
