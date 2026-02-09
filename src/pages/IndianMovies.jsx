import { useMemo } from 'react';
import { movies } from '../utils/movies';
import MovieCard from '../components/MovieCard';
import { motion } from 'framer-motion';

const IndianMovies = () => {

    // Filter for Indian movies based on language
    const indianMovies = useMemo(() => {
        return movies.filter(m =>
            ["Hindi", "Telugu", "Kannada", "Tamil", "Malayalam"].includes(m.language)
        );
    }, []);

    return (
        <div className="container" style={{ paddingTop: '80px', paddingBottom: '2rem', minHeight: '100vh', background: '#141414' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div style={{ marginBottom: '2rem', marginTop: '2rem' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Indian Cinema</h1>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px' }}>
                        Experience the best of Bollywood, Tollywood, and beyond. From high-octane action blockbusters to heartwarming dramas.
                    </p>
                </div>

                <div className="movies-grid">
                    {indianMovies.length > 0 ? (
                        indianMovies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    ) : (
                        <div className="no-results" style={{ color: 'white' }}>
                            <p>No Indian movies found at the moment. Please check back later!</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default IndianMovies;
