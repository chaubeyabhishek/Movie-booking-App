import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import '../styles/Booking.css';
import { FaCheckCircle, FaHome } from 'react-icons/fa';

const BookingConfirmation = () => {
    const { user } = useAuth();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const currentBooking = localStorage.getItem('currentBooking');
        if (currentBooking) {
            const parsedBooking = JSON.parse(currentBooking);
            setBooking(parsedBooking);

           
            const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            allBookings.push({
                ...parsedBooking,
                userId: user?.email, // Using email as ID for simplicity
                bookingId: Math.random().toString(36).substr(2, 9).toUpperCase(),
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('bookings', JSON.stringify(allBookings));

           
        }
    }, [user]);

    if (!booking) {
        return <div className="container" style={{ textAlign: 'center', paddingTop: '5rem' }}>No booking found.</div>;
    }

    return (
        <div className="container booking-container">
            <motion.div
                className="booking-summary"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                <FaCheckCircle className="success-icon" />
                <h2 className="text-gradient" style={{ marginBottom: '0.5rem' }}>Booking Confirmed!</h2>
                <p>Your ticket has been successfully booked.</p>

                <div className="ticket-details">
                    <div className="ticket-row">
                        <span className="ticket-label">Movie</span>
                        <span className="ticket-value">{booking.movie.title}</span>
                    </div>
                    <div className="ticket-row">
                        <span className="ticket-label">Cinema</span>
                        <span className="ticket-value">{booking.cinema.name}</span>
                    </div>
                    <div className="ticket-row">
                        <span className="ticket-label">Date</span>
                        <span className="ticket-value">{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="ticket-row">
                        <span className="ticket-label">Time</span>
                        <span className="ticket-value">{booking.show.time}</span>
                    </div>
                    <div className="ticket-row">
                        <span className="ticket-label">User</span>
                        <span className="ticket-value">{user?.name}</span>
                    </div>
                </div>

                <Link to="/dashboard" className="btn btn-primary">
                    <FaHome style={{ marginRight: '0.5rem' }} /> Back to Dashboard
                </Link>
            </motion.div>
        </div>
    );
};

export default BookingConfirmation;
