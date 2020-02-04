import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import './LandingCard.css';

const LandingCard = ({ cardImage, cardBody, cardTitle, cardLink }) => (
  <Col
    xs={12}
    sm={6}
    md={6}
    lg={3}
    xl={3}
    className="card-template text-center"
  >
    <Card className="widthCard">
      {cardLink[0] === '/' ? (
        <Link className="no-style-link" to={cardLink}>
          <Card.Img variant="top" src={cardImage} />
          <Card.Body>
            <Card.Title>{cardTitle}</Card.Title>
            <Card.Text>{cardBody}</Card.Text>
          </Card.Body>
        </Link>
      ) : (
        <a target="_blank" rel="noopener noreferrer" href={cardLink}>
          <Card.Img variant="top" src={cardImage} />
          <Card.Body>
            <Card.Title>{cardTitle}</Card.Title>
            <Card.Text>{cardBody}</Card.Text>
          </Card.Body>
        </a>
      )}
    </Card>
  </Col>
);

export default LandingCard;
