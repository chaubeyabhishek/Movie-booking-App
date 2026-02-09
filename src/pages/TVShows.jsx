import { movies } from '../utils/movies';
import { tvShows } from '../utils/movies';
import MovieRow from '../components/MovieRow';
import '../styles/Dashboard.css';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const TVShows = () => {
    // Featured TV Display
    const featuredShow = tvShows[0];

    // Categorize
    const hindiShows = tvShows.filter(s => s.language === "Hindi");
    const popularShows = tvShows.filter(s => s.rating > 9.0);
    const dramaShows = tvShows.filter(s => s.genre.includes("Drama"));
    const thrillerShows = tvShows.filter(s => s.genre.includes("Thriller"));

    return (
        <div className="dashboard-container" style={{ backgroundColor: '#141414', minHeight: '100vh', paddingBottom: '2rem' }}>
            {/* Reuse Hero Style */}
            <div
                className="hero-section"
                style={{
                    height: '80vh',
                    position: 'relative',
                    backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(19, 19, 31,1)), url(${featuredShow.poster})`,
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
                        {featuredShow.title}
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        marginBottom: '2rem',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                    }}>
                        {featuredShow.year} | {featuredShow.rating} Rating | {featuredShow.genre.join(', ')}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-primary" style={{ background: 'white', color: 'black' }}>
                            <FaPlay /> Play
                        </button>
                        <button className="btn" style={{ background: 'rgba(109, 109, 110, 0.7)', color: 'white' }}>
                            <FaInfoCircle /> More Info
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '-100px', position: 'relative', zIndex: 10 }}>
                <MovieRow title="Indian Hits" movies={hindiShows} />
                <MovieRow title="Critically Acclaimed" movies={popularShows} />
                <MovieRow title="Binge-worthy Dramas" movies={dramaShows} />
                <MovieRow title="Edge of Seat Thrillers" movies={thrillerShows} />
                <MovieRow title="All TV Shows" movies={tvShows} />
            </div>
        </div>
    );
};

export default TVShows;
