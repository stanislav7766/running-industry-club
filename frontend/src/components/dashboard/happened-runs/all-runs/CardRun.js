import React, { Fragment } from 'react';
import { Card, Col } from 'react-bootstrap';
import tempPreviewCard from '../../../../img/temp_preview-card.jpg';
import preparePace from '../../../common/preparePace';
const CardRun = ({ run }) => (
  <Fragment>
    <Col xs={12} sm={6} md={6} lg={3} xl={3} className="card-template">
      <Card className="widthCard">
        <Card.Img variant="top" src={tempPreviewCard} />
        <Card.Body>
          <Card.Title>{run.nameRun}</Card.Title>
          <Card.Text>
            &bull; Дистанция - {run.distance} km
            <br />
            &bull; Время - {run.time}
            <br />
            &bull; Темп - {preparePace(run.pace)}/km
            <br />
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Добавлено {run.date}</small>
        </Card.Footer>
      </Card>
    </Col>
  </Fragment>
);

export default CardRun;
