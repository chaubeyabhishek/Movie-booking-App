import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { movies } from '../utils/movies';
import MovieRow from '../components/MovieRow';
import '../styles/Dashboard.css';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const Dashboard = () => {

    const featuredMovie = movies.find(m => m.title === "Dune: Part Two") || movies[0];

    
    const indianMovies = movies.filter(m =>
        m.language === "Hindi" || m.language === "Telugu" || m.language === "Kannada" || m.language === "Tamil"
    );

    
    const trendingMovies = movies;

    const actionMovies = movies.filter(m => m.genre.includes("Action"));
    const sciFiMovies = movies.filter(m => m.genre.includes("Sci-Fi"));

    return (
        <div className="dashboard-container" style={{ backgroundColor: '#141414', minHeight: '100vh', paddingBottom: '2rem' }}>

            {/* Hero Section */}
            <div
                className="hero-section"
                style={{
                    height: '80vh',
                    position: 'relative',
                    backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(19, 19, 31,1)), url(${featuredMovie.poster})`,
                    
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <div
                    className="hero-content"
                    style={{
                        paddingLeft: '3rem',
                        maxWidth: '600px',
                        paddingTop: '10rem'
                    }}
                >
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: '800',
                        marginBottom: '1rem',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        {featuredMovie.title}
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        marginBottom: '2rem',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                    }}>
                        {featuredMovie.year} | {featuredMovie.rating} Rating | {featuredMovie.genre.join(', ')}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button style={{
                            padding: '0.8rem 2rem',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backgroundColor: 'white',
                            color: 'black'
                        }}>
                            <FaPlay /> Play
                        </button>
                        <button style={{
                            padding: '0.8rem 2rem',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backgroundColor: 'rgba(109, 109, 110, 0.7)',
                            color: 'white'
                        }}>
                            <FaInfoCircle /> More Info
                        </button>
                    </div>
                </div>
            </div>

            {/* Movie Rows */}
            <div style={{ marginTop: '-100px', position: 'relative', zIndex: 10 }}>
                <MovieRow title="Trending Now" movies={trendingMovies} />
                <MovieRow title="Indian Blockbusters" movies={indianMovies} />
                <MovieRow title="Action Thrillers" movies={actionMovies} />
                <MovieRow title="Sci-Fi Adventures" movies={sciFiMovies} />
            </div>
        </div>
    );
};

export default Dashboard;
