import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Added useState import
import '../styles/Dashboard.css';

const MovieCard = ({ movie, style, className }) => {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false); 

    if (imageError) return null; 
    return (
        <motion.div
            className={`movie-card ${className || ''}`}
            style={style}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(`/cinema/${movie.id}`)}
        >
            <div className="movie-badge">{movie.language}</div>
            <div className="movie-poster-wrapper">
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="movie-poster"
                    loading="lazy"
                    onError={() => setImageError(true)} 
                />
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-meta">
                    <span>{movie.year}</span>
                    <span className="movie-rating">★ {movie.rating}</span>
                </div>
                <div className="movie-meta" style={{ marginTop: '0.2rem' }}>
                    <span>{movie.genre.join(', ')}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieCard;
