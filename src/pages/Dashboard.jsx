import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { movies, cities } from '../utils/movies';
import MovieCard from '../components/MovieCard';
import '../styles/Dashboard.css';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const filteredMovies = useMemo(() => {
        return movies.filter(movie => {
            const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCity = selectedCity ? movie.cities.includes(selectedCity) : true;
            return matchesSearch && matchesCity;
        });
    }, [searchTerm, selectedCity]);

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <motion.div
                className="dashboard-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Now Showing</h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Welcome back, <span style={{ color: 'white', fontWeight: 600 }}>{user?.name}</span>
                    </p>
                </div>

                <div className="dashboard-controls">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by movie name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        className="city-filter"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                    >
                        <option value="">All Cities</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
            </motion.div>

            <div className="movies-grid">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <div className="no-results">
                        <p>No movies found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
