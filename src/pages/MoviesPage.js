import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ProducersList from '../components/ProducersList';
import GenresFilter from '../components/GenresFilter';
import MovieTable from '../components/MovieTable';
import { MovieContext } from '../context/MovieContext';

const MoviesPage = () => {
    const {handleGenreSelect,handleProducerSelect,handleDirectorSelect} = useContext(MovieContext);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const genre = params.get('genre');
        const producer = params.get('producer');
        const director = params.get('director');

        if (genre) {
            handleGenreSelect(genre);
        } else if (producer) {
            handleProducerSelect(Number(producer));
        } else if (director) {
            handleDirectorSelect(Number(director));
        } else {
            handleGenreSelect(null);
        }
    }, [location.search, handleGenreSelect, handleProducerSelect, handleDirectorSelect]);

    return (
        <Container>
            <GenresFilter />
            <Row>
                <Col md={3}>
                    <ProducersList />
                </Col>
                <Col md={9}>
                    <MovieTable />
                </Col>
            </Row>
        </Container>
    );
};

export default MoviesPage;
