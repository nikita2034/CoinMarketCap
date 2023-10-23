import React from "react";
import { Route, Routes } from "react-router-dom";
import CurrencyPage from "./pages/CurrencyPage/CurrencyPage";
import CurrencyInfoPage from "./pages/CurrencyInfoPage/CurrencyInfoPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CurrencyPage />} />
        <Route path="/currency/:id" element={<CurrencyInfoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
