import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies }) => {
    const rowRef = useRef(null);

    const slide = (offset) => {
        rowRef.current.scrollLeft += offset;
    };

    return (
        <div style={{ marginBottom: '3rem' }}>
            <h2
                className="movie-row-header"
                style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#e5e5e5',
                    paddingLeft: '2rem' // Default, overridden by CSS on mobile
                }}>
                {title}
            </h2>

            <div style={{ position: 'relative' }}>
                <div
                    className="slider-arrow left"
                    onClick={() => slide(-500)}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50px',
                        cursor: 'pointer',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                >
                    <FaChevronLeft size={30} color="white" />
                </div>

                <div
                    ref={rowRef}
                    style={{
                        display: 'flex',
                        gap: '10px',
                        overflowX: 'scroll',
                        scrollbarWidth: 'none', // Firefox
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                        scrollBehavior: 'smooth'
                    }}
                    className="movie-row-scroll" // Identify for css hiding scrollbar
                >
                    {movies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            style={{ flex: '0 0 auto', width: '200px' }}
                        />
                    ))}
                </div>

                <div
                    className="slider-arrow right"
                    onClick={() => slide(500)}
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50px',
                        cursor: 'pointer',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                >
                    <FaChevronRight size={30} color="white" />
                </div>
            </div>

            <style jsx>{`
                .movie-row-scroll::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default MovieRow;
