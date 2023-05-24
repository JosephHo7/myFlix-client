import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

export const MovieView = ({movieData}) => {
    const { movieId } = useParams();
    const  movie =movieData.find((m) => m._id === movieId );

    return (
        <div>
            <div>
                <span>Title: </span>
                <span>{movie.title} </span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description} </span>
            </div>
            <Link to={`/`} >
                <Button className='back-button' variant="primary">Back</Button>
            </Link>
        </div>
    )
}