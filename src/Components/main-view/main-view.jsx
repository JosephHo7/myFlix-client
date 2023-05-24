import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BroweserRouter, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { NavigationBar } from '../navigation-bar/navigation-bar';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser:null);
    const [token, setToken] = useState(storedToken? storedToken:null);
    const [movies, setMovies] = useState ([]);
  

useEffect(() => {
    if (!token) {
        return;
    }
    
    fetch ('https://movieapi-lcrt.onrender.com/movies',{headers: {Authorization: 'Bearer${token}'}})
    .then ((response) => response.json())
    .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((doc) => {
            return {
                _id: doc._id,
                title: doc.Title,
                description: doc.Description
            };
        });
        console.log(moviesFromApi);
        setMovies(moviesFromApi);
    });
}, [token]);

return(
    <BrowserRouter>
        <NavigationBar></NavigationBar>
        <Row className='justify-content-md-center'>
            <Routes>
                <Route
                path="/signup"
                element={
                    <>
                        {user? (
                            <Navigate to="/" />
                        ):(
                            <Col md={5}>
                                <SignupView/>
                            </Col>
                        )}
                    </>
                }
                />
                <Route
                path="/login"
                element={
                    <>
                        {user? (
                            <Navigate to="/" />
                        ):(
                            <Col md={5}>
                                <LoginView onLoggedIn={(user) => setUser(user)} />
                            </Col>
                        )}
                    </>
                }
                />
                <Route
                path="/movies/:movieId"
                element={
                    <>
                        {!user ? (
                            <Navigate to="/login" replace />
                        ): movies.length ===0 ?(
                            <Col>There are no movies here!</Col> 
                        ): (
                            <Col md={8}>
                                <MovieView movieData = {movies}/>
                            </Col>
                        )}
                    </>
                }
                />
                <Route
                path="/"
                element={
                    <>
                        {!user ?( 
                            <Navigate to="/login" replace />
                        ):movies.length ===0 ?(
                            <Col>There are no movies here!</Col>        
                       ):(
                        <>
                        {movies.map((movie) => (
                            <Col key ={movie._id} md={4} className='mb-5'>
                            <MovieCard 
                                movieData = {movie}
                            />
                            </Col>
                            ))} 
                        </>
                       )}
                    </>
                }
                />
            </Routes>
        </Row>
    </BrowserRouter>
)};