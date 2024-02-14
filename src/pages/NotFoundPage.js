import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 Not Found</h1>
            <p>🙈</p>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <p>It might have been removed, had its name changed, or is temporarily unavailable.</p>
            <p><Link to="/">Click here</Link> to go to the homepage.</p>
        </div>
    )
}

export default NotFoundPage;