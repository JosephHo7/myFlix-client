import './movie-view.scss';
import Button from 'react-bootstrap/Button';

export const MovieView = ({movieData, onBackClick}) => {
    return (
        <div>
            <div>
                <span>Title: </span>
                <span>{movieData.title} </span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movieData.description} </span>
            </div>
            <Button onClick={onBackClick} className='back-button' variant="primary">Back</Button>
        </div>
    )
}