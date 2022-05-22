import logo from './logo.svg';
import './App.css';
import Inventory from './components/Inventory';
import Shipments from './components/Shipments';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Inventory />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/shipments' element={<Shipments />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
