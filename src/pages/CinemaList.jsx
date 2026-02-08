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

    // Filter cinemas that are in the movie's available cities
    // For this dummy data, let's assume all cinemas in the list show the movie if the city matches
    const availableCinemas = cinemas.filter(cinema => movie.cities.includes(cinema.city));

    return (
        <div className="container booking-container">
            <div className="page-header">
                <h2>{movie.title}</h2>
                <p>Select a cinema to view showtimes</p>
            </div>

            <div className="cinema-list">
                {availableCinemas.length > 0 ? (
                    availableCinemas.map((cinema, index) => (
                        <motion.div
                            key={cinema.id}
                            className="cinema-card"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => navigate(`/booking/${movieId}/${cinema.id}`)}
                        >
                            <div className="cinema-info">
                                <h3>{cinema.name}</h3>
                                <div className="cinema-location">
                                    <FaMapMarkerAlt /> {cinema.location}
                                </div>
                                <div className="cinema-facilities">
                                    {cinema.facilities.map(fac => (
                                        <span key={fac} className="facility-badge">{fac}</span>
                                    ))}
                                </div>
                            </div>
                            <FaChevronRight style={{ color: 'var(--color-text-secondary)' }} />
                        </motion.div>
                    ))
                ) : (
                    <div className="no-results">No cinemas available for this movie.</div>
                )}
            </div>
        </div>
    );
};

export default CinemaList;
