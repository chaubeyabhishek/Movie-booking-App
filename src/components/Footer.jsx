import '../styles/global.css';

const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            padding: '2rem 0',
            marginTop: 'auto',
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
            fontSize: '0.9rem'
        }}>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} MovieApp. All rights reserved.</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>
                    Made with ReactJS & Love
                </p>
            </div>
        </footer>
    );
};

export default Footer;
