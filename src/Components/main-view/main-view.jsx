import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser:null);
    const [token, setToken] = useState(storedToken? storedToken:null);
    const [movies, setMovies] = useState ([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
  
//fetch data from API
useEffect(() => {
    if (!token) {
        return;
    }
    fetch ('https://movieapi-lcrt.onrender.com/movies',{headers: {Authorization: `Bearer${token}`}})
    .then ((response) => response.json())
    .then((data) => {
        const moviesFromApi = data.map((doc) => {
            return {
                _id: doc._id,
                title: doc.Title,
                description: doc.Description,
                image: doc.ImagePath
            };
        });
        setMovies(moviesFromApi);
        console.log(data);
    });
}, [token]);

return (
    <BrowserRouter>
        <NavigationBar user={user} onLoggedOut={()=>{setUser(null);}} />
        <Row>
            <Routes>
{/* allow users to signup for a new account */}
                <Route 
                    path='/signup'
                    element={ 
                        <>
                            {user ? (
                                <Navigate to='/' />
                            ):(
                                <Col md={5} ><SignupView/></Col>
                            )}
                        </>
                    }
                />
{/* allow existing users to log in  */}
                <Route
                    path='/login'
                    element={
                        <>
                            {user ? (
                                <Navigate to='/'/>
                            ):(
                                <Col><LoginView onLoggedIn={(user) => setUser(user)}/></Col>
                            )}
                        </>
                    }
                />
{/* allow exisitng user to access and view movie datbase by individual movies */}
                <Route
                    path='/movies/:movieId'
                    element={
                        <>
                            { !user ? (
                                <Navigate to='/login' replace />
                            ) : movies.length ===0 ?(
                                <Col> There are no movies here! </Col>
                            ) : (
                                <Col><MovieView movieData={movies}/></Col>
                            )}
                        </>
                    }
                />
{/* allow exisitng users to view all movie database */}
                <Route 
                    path='/'
                    element={
                        <>
                            {!user ? (
                                <Navigate to='/login' replace />
                            ): movies.length ===0 ? (
                                <Col> There are no movies here!</Col>
                            ): (
                                <> 
                                    {movies.map((movie) => {
                                        return (
                                            <Col md={3} key={movie.id} className='mb-5'>
                                                <MovieCard
                                                    movieData={movie} />
                                            </Col>
                                            )
                                        })
                                    }
                                </>
                            )
                            }
                        </>
                    }
                />
            </Routes>
        </Row>
    </BrowserRouter>
)
};
