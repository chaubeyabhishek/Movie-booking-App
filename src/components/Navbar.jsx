import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import '../styles/global.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Removed the "if (!user) return null;" check to allow Navbar on Login/Signup

    return (
        <nav style={{
            background: isScrolled ? 'rgb(10, 10, 10)' : 'transparent',
            backgroundImage: isScrolled ? 'none' : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0))',
            padding: '0.8rem 2rem',
            position: 'fixed', // Added to ensure it overlays correctly
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            transition: 'background-color 0.3s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link to={user ? "/dashboard" : "/login"} style={{
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    color: '#e50914',
                    textDecoration: 'none',
                    marginRight: '1rem'
                }}>
                    BOOK-YOUR-MOVIES
                </Link>

                {user && (
                    <div
                        className="nav-links"
                        style={{
                            display: 'flex',
                            gap: '1.2rem',
                            fontSize: '0.9rem',
                            color: '#e5e5e5',
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                            maxWidth: '100%',
                            paddingBottom: '5px',
                            scrollbarWidth: 'none'
                        }}>
                        <Link to="/dashboard" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>Home</Link>
                        <span style={{ cursor: 'pointer' }}>TV Shows</span>
                        <span style={{ cursor: 'pointer' }}>Movies</span>
                        <Link to="/indian-movies" style={{ color: '#e5e5e5', textDecoration: 'none', cursor: 'pointer' }}>Indian Movies</Link>
                        <span style={{ cursor: 'pointer' }}>My List</span>
                        <style>{`
                            .nav-links::-webkit-scrollbar { display: none; }
                        `}</style>
                    </div>
                )}
            </div>

            {user && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
                    <div
                        className="user-menu"
                        style={{ position: 'relative', cursor: 'pointer' }}
                        onMouseEnter={() => document.getElementById('user-dropdown').style.display = 'block'}
                        onMouseLeave={() => document.getElementById('user-dropdown').style.display = 'none'}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', padding: '0.5rem' }}>
                            <FaUserCircle size={24} />
                            <span style={{ fontSize: '0.9rem' }}>{user.name}</span>
                        </div>

                        <div
                            id="user-dropdown"
                            style={{
                                display: 'none',
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                background: 'rgba(0, 0, 0, 0.9)',
                                border: '1px solid #333',
                                borderRadius: '4px',
                                minWidth: '150px',
                                padding: '0.5rem 0',
                                zIndex: 1001
                            }}
                        >
                            <Link
                                to="/profile"
                                style={{
                                    display: 'block',
                                    padding: '0.8rem 1rem',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#333'}
                                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                            >
                                Profile
                            </Link>
                            <div
                                onClick={handleLogout}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.8rem 1rem',
                                    color: '#e50914',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    borderTop: '1px solid #333'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#333'}
                                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                            >
                                <FaSignOutAlt /> Sign Out
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
