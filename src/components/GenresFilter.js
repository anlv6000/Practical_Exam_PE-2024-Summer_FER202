import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { Navbar, Nav } from 'react-bootstrap';

const GenresFilter = () => {
    const { genres } = useContext(MovieContext);

    return (
        <Navbar bg="light" variant="light" className="justify-content-center">
            <Nav>
                <Nav.Item>
                    <Nav.Link as={Link} to="/movie">Show all movies</Nav.Link>
                </Nav.Item>
                {genres.map(genre => (
                    <Nav.Item key={genre}>
                        <Nav.Link as={Link} to={`/movie?genre=${genre}`}>{genre}</Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </Navbar>
    );
};

export default GenresFilter;
