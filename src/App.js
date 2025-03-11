import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage';
import AddStarsPage from './pages/AddStarsPage';
import MovieProvider from './context/MovieContext'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <MovieProvider>
            <Router>
                <Routes>
                    <Route path="/movie" element={<MoviesPage />} />
                    <Route path="/movie/:id/add-stars" element={<AddStarsPage />} />
                </Routes>
            </Router>
        </MovieProvider>
    );
}

export default App;
