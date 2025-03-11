import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { Table, Button } from 'react-bootstrap';

const MovieTable = () => {
    const { movies, producers, directors, stars } = useContext(MovieContext);

    const getProducerName = (id) => {
        const producer = producers.find(p => p.id == id);
        return producer ? producer.name : 'Unknown';
    };

    const getDirectorName = (id) => {
        const director = directors.find(d => d.id == id);
        return director ? director.fullname : 'Unknown';
    };

    const getStarNames = (starIds) => {
        return (
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {starIds.map((id, index) => {
                    const star = stars.find(s => s.id == id);
                    return <li key={id}>{`${index + 1}. ${star ? star.fullname : 'Unknown'}`}</li>;
                })}
            </ul>
        );
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options); 
    };

    return (
        <Table striped bordered hover className="mt-3">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Release</th>
                    <th>Description</th>
                    <th>Producer</th>
                    <th>Director</th>
                    <th>Genres</th>
                    <th>Stars</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {movies.map(movie => (
                    <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.title}</td>
                        <td>{formatDate(movie.release)}</td>
                        <td>{movie.description}</td>
                        <td>
                            <Link to={`/movie?producer=${movie.producer}`}>
                                {getProducerName(movie.producer)}
                            </Link>
                        </td>
                        <td>
                            <Link to={`/movie?director=${movie.director}`}>
                                {getDirectorName(movie.director)}
                            </Link>
                        </td>
                        <td>{movie.genres.join(', ')}</td>
                        <td className="stars-column">{getStarNames(movie.stars)}</td>
                        <td>
                            <Button variant="primary" as={Link} to={`/movie/${movie.id}/add-stars`}>
                                Add stars
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default MovieTable;
