import { useParams, useNavigate } from 'react-router-dom';
import { movies } from '../utils/movies';
import { cinemas } from '../utils/cinemas';
import { motion } from 'framer-motion';
import '../styles/Booking.css';
import { FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';

const CinemaList = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const movie = movies.find(m => m.id === parseInt(movieId));

    if (!movie) return <div className="container">Movie not found</div>;

    const availableCinemas = cinemas.filter(cinema => movie.cities.includes(cinema.city));

    return (
        <div className="container booking-container">
            <div className="page-header">
                <h2>{movie.title}</h2>
                <p>Select a cinema to view showtimes</p>
            </div>

            <div className="cinema-list">
                {availableCinemas.length > 0 ? (
                    availableCinemas.map((cinema, index) => {
                        // Simulate some availability status for UI demo
                        const availability = index % 3 === 0 ? "Fast Filling" : index % 2 === 0 ? "Available" : "Almost Full";
                        const badgeColor = availability === "Fast Filling" ? "#ff9900" : availability === "Available" ? "#4caf50" : "#f44336";

                        return (
                            <motion.div
                                key={cinema.id}
                                className="cinema-card"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => navigate(`/booking/${movieId}/${cinema.id}`)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1.5rem',
                                    background: '#1a1a1a',
                                    border: '1px solid #333',
                                    marginBottom: '1rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s, border-color 0.2s'
                                }}
                                whileHover={{ scale: 1.02, borderColor: '#e50914' }}
                            >
                                <div className="cinema-info">
                                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#fff' }}>{cinema.name}</h3>
                                    <div className="cinema-location" style={{ color: '#aaa', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaMapMarkerAlt style={{ color: '#e50914' }} /> {cinema.location}
                                    </div>
                                    <div className="cinema-facilities" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        {cinema.facilities.map(fac => (
                                            <span key={fac} className="facility-badge" style={{
                                                fontSize: '0.75rem',
                                                padding: '0.2rem 0.6rem',
                                                background: '#333',
                                                borderRadius: '12px',
                                                color: '#ddd'
                                            }}>{fac}</span>
                                        ))}
                                        <span style={{
                                            fontSize: '0.75rem',
                                            padding: '0.2rem 0.6rem',
                                            background: badgeColor,
                                            borderRadius: '12px',
                                            color: '#000',
                                            fontWeight: 'bold',
                                            marginLeft: '1rem'
                                        }}>
                                            {availability}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ textAlign: 'right', marginRight: '1rem' }}>
                                        <div style={{ color: '#4caf50', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Mobile Ticket</div>
                                        <div style={{ color: '#aaa', fontSize: '0.8rem' }}>M-Ticket Avail</div>
                                    </div>
                                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                        View Seats
                                    </button>
                                    <FaChevronRight style={{ color: 'var(--color-text-secondary)' }} />
                                </div>
                            </motion.div>
                        )
                    })
                ) : (
                    <div className="no-results">No cinemas available for this movie.</div>
                )}
            </div>
        </div>
    );
};

export default CinemaList;
