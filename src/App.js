import Producto from "./components/Producto"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Producto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
