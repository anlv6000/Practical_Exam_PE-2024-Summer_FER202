import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { Card, ListGroup } from 'react-bootstrap';

const ProducersList = () => {
    const { producers } = useContext(MovieContext);

    return (
        <Card>
            <Card.Header as="h4">Producers</Card.Header>
            <ListGroup variant="flush">
                {producers.map(producer => (
                    <ListGroup.Item key={producer.id}>
                        <Link to={`/movie?producer=${producer.id}`}>{producer.name}</Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    );
};

export default ProducersList;
