import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUserCircle, FaTicketAlt, FaHistory, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Dashboard.css'; // 

const Profile = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
       
        const userBookings = allBookings.filter(b => b.userId === user?.email);
        setBookings(userBookings.reverse()); 
    }, [user]);

    if (!user) return <div className="container" style={{ paddingTop: '100px' }}>Loading...</div>;

    return (
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '3rem', minHeight: '100vh' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="profile-header"
                style={{
                    background: 'linear-gradient(to right, #222, #111)',
                    padding: '2rem',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                    marginBottom: '3rem',
                    border: '1px solid #333'
                }}
            >
                <div style={{ color: '#e50914' }}>
                    <FaUserCircle size={80} />
                </div>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2.5rem' }}>{user.name}</h1>
                    <p style={{ color: '#aaa', margin: '0.5rem 0 0' }}>{user.email}</p>
                </div>
            </motion.div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <FaHistory style={{ color: '#e50914' }} /> Booking History
                </h2>
                {bookings.length > 0 && (
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to clear your booking history?')) {
                                const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
                                const remaining = allBookings.filter(b => b.userId !== user?.email);
                                localStorage.setItem('bookings', JSON.stringify(remaining));
                                setBookings([]);
                            }
                        }}
                        style={{
                            background: '#333',
                            color: 'white',
                            border: '1px solid #555',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        Clear History
                    </button>
                )}
            </div>

            {bookings.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {bookings.map((booking, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                background: '#1a1a1a',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                border: '1px solid #333',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                            }}
                        >
                            <div style={{ height: '150px', overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={booking.movie.poster}
                                    alt={booking.movie.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                                    padding: '1rem',
                                    paddingTop: '2rem'
                                }}>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{booking.movie.title}</h3>
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: '#ccc' }}>
                                    <FaMapMarkerAlt style={{ color: '#e50914' }} />
                                    <span>{booking.cinema.name}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: '#ccc' }}>
                                    <FaCalendarAlt style={{ color: '#e50914' }} />
                                    <span>{new Date(booking.date).toLocaleDateString()} at {booking.show.time}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ccc' }}>
                                    <FaTicketAlt style={{ color: '#e50914' }} />
                                    <span>Booking ID: <span style={{ fontFamily: 'monospace', color: '#fff' }}>{booking.bookingId}</span></span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#666', background: '#111', borderRadius: '8px' }}>
                    <p style={{ fontSize: '1.2rem' }}>No bookings found yet.</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
