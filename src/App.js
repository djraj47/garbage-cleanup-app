import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Upload from './Upload';
import MapPage from './MapPage';
import Preloader from './Preloader';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., for fetching Supabase data)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <div className="left-panel">
          <Upload />
        </div>
        <div className="right-panel">
          <MapPage />
        </div>
      </div>
    </div>
  );
}

export default App;
