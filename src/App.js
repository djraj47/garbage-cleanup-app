import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Upload from './Upload';
import MapPage from './MapPage';
import ReportDetails from './ReportDetails';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <BrowserRouter>
      {/* Simple Navbar */}
      <nav style={{
        backgroundColor: '#2c3e50',
        padding: '12px 20px',
        display: 'flex',
        gap: '20px'
      }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          📤 Upload
        </Link>
        <Link to="/map" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          🗺️ View Map
        </Link>
      </nav>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/report/:id" element={<ReportDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
