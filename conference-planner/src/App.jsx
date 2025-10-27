import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductSelectionPage from './components/ProductSelectionPage';

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/select" element={<ProductSelectionPage/>} />
      </Routes>
    </Router>
  );
}
