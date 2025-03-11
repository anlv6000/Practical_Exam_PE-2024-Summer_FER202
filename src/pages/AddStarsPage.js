import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { Form, Button, Alert, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../utils/api';

const AddStarsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { movies, stars, setMovies } = useContext(MovieContext);
    const movie = movies.find(m => m.id == parseInt(id));
    const [selectedStars, setSelectedStars] = useState(movie ? movie.stars : []);
    const [message, setMessage] = useState('');


    const handleStarToggle = (starId) => {
        setSelectedStars(prevState => prevState.includes(starId) 
                ? prevState.filter(id => id != starId) 
                : [...prevState, starId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedMovie = { ...movie, stars: selectedStars };
            await axios.patch(`${BASE_URL}/movies/${id}`, { stars: selectedStars });
            setMovies(prevMovies => prevMovies.map(m => m.id == movie.id ? updatedMovie : m));
            setMessage('Stars added successfully');
            setTimeout(() => {
                setMessage('');
                navigate('/movie');
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    };

    if (!movie) {
        return <p>Movie not found</p>;
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card className="mt-5">
                        <Card.Header as="h3">Add stars to the movie</Card.Header>
                        <Card.Body>
                            <Card.Title>Movie title: {movie.title}</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="d-flex flex-wrap">
                                    {stars.map(star => (
                                        <Form.Check 
                                            key={star.id}
                                            type="checkbox"
                                            label={star.fullname}
                                            checked={selectedStars.includes(star.id)} // Kiểm tra trạng thái checked
                                            onChange={() => handleStarToggle(star.id)}
                                            className="mb-2 mr-3"
                                        />
                                    ))}
                                </Form.Group>
                                <Button type="submit" variant="primary" className="mt-3">Add Stars</Button>
                            </Form>
                            {message && <Alert variant="success" className="mt-3">{message}</Alert>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddStarsPage;
