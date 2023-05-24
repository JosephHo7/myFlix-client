import PropTypes from 'prop-types'; 
import {Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
  
export const MovieCard = ({ movieData }) => {
    return (
        <Card className='h-100'>
            <Card.Body>
                <Card.Title>{movieData.title}</Card.Title>
                <Link to={`/movies/${encodeURIComponent(movieData._id)}`}  >
                    <Button variant="primary link" className='back-button'> Open </Button>
                </Link> 
            </Card.Body>
        </Card>
    
    )
};

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string
    }).isRequired
};