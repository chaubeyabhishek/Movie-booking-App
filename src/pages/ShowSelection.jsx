import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movies } from '../utils/movies';
import { cinemas, generateShows } from '../utils/cinemas';
import { motion } from 'framer-motion';
import '../styles/Booking.css';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const ShowSelection = () => {
    const { movieId, cinemaId } = useParams();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(0); // Index of selected date
    const [selectedShow, setSelectedShow] = useState(null);

    const movie = movies.find(m => m.id === parseInt(movieId));
    const cinema = cinemas.find(c => c.id === parseInt(cinemaId));

    // Generate next 7 days
    const dates = useMemo(() => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            days.push({
                day: d.toLocaleDateString('en-US', { weekday: 'short' }),
                date: d.getDate(),
                fullDate: d.toISOString().split('T')[0]
            });
        }
        return days;
    }, []);

    
    const shows = useMemo(() => generateShows(movieId, cinemaId), [movieId, cinemaId]);

    const handleProceed = () => {
        if (selectedShow) {
          
            const bookingDetails = {
                movie,
                cinema,
                date: dates[selectedDate].fullDate,
                show: selectedShow
            };
            
            localStorage.setItem('currentBooking', JSON.stringify(bookingDetails));
            navigate('/booking/confirmation');
        }
    };

    if (!movie || !cinema) return <div className="container">Invalid Selection</div>;

    return (
        <div className="container booking-container">
            <div className="page-header">
                <h2>{movie.title}</h2>
                <p>{cinema.name} • {cinema.location}</p>
            </div>

            <div className="show-selection-container">
                <div>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaCalendarAlt className="text-gradient" /> Select Date
                    </h3>
                    <div className="date-picker">
                        {dates.map((date, index) => (
                            <motion.div
                                key={index}
                                className={`date-card ${selectedDate === index ? 'selected' : ''}`}
                                onClick={() => setSelectedDate(index)}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="day">{date.day}</div>
                                <div className="date">{date.date}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaClock className="text-gradient" /> Select Time
                    </h3>
                    <div className="time-grid">
                        {shows.map((show) => (
                            <motion.div
                                key={show.id}
                                className={`time-slot ${selectedShow?.id === show.id ? 'selected' : ''}`}
                                onClick={() => setSelectedShow(show)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {show.time}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <button
                        className={`btn btn-primary ${!selectedShow ? 'disabled' : ''}`}
                        onClick={handleProceed}
                        disabled={!selectedShow}
                        style={{ opacity: selectedShow ? 1 : 0.5, width: '100%', maxWidth: '300px' }}
                    >
                        Proceed to Book
                    </button>
                    {!selectedShow && <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Please select a showtime to proceed</p>}
                </div>
            </div>
        </div>
    );
};

export default ShowSelection;
