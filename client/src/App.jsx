import { BrowserRouter, Routes, Route } from "react-router-dom";

import FlashCards from "./components/FlashCards";
import Add from "./components/Add";
import Update from "./components/Update";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="font-medium">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FlashCards />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
