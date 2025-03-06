import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import About from './pages/About/About';
import Basket from './pages/Basket/Basket';
import './App.css';

function App() {
  const [cartItems, setCartItems] = React.useState([]);

  return (
    <Router>
      <div className="App">
        <Header cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<Home />} /> {/* New landing page */}
          <Route path="/Catalog" element={<Catalog />} /> {/* Moved catalog content */}
          <Route path="/about" element={<About />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;