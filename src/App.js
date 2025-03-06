import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BasketProvider } from './context/BasketContext';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import About from './pages/About/About';
import Basket from './pages/Basket/Basket';
import './App.css';

function App() {
  return (
    <BasketProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/about" element={<About />} />
            <Route path="/basket" element={<Basket />} />
          </Routes>
        </div>
      </Router>
    </BasketProvider>
  );
}

export default App;