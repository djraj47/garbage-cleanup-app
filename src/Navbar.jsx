import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav style={{
            backgroundColor: '#222',
            padding: '10px 20px',
            display: 'flex',
            gap: '20px'
        }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Upload</Link>
            <Link to="/map" style={{ color: 'white', textDecoration: 'none' }}>View Map</Link>
        </nav>
    );
}
