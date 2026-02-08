import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import '../styles/global.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav style={{
            background: 'rgba(19, 19, 31, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            padding: '1rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/dashboard" style={{ fontSize: '1.5rem', fontWeight: 'bold' }} className="text-gradient">
                    MovieApp
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                        <FaUserCircle size={20} />
                        <span>{user.name}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                    >
                        <FaSignOutAlt />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
