import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Blueprints from "./pages/Blueprints";
import Contracts from "./pages/Contracts";
import Navbar from "./components/Navbar";
import ContractView from "./pages/ContractView";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/blueprints" element={<Blueprints />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/contracts/:id" element={<ContractView />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
