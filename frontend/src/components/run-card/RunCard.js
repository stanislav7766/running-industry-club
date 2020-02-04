import React, { Fragment } from 'react';
import { Card, Col } from 'react-bootstrap';
import defaultPreviewCard from '../../assets/default-preview-card.jpg';
import preparePace from '../../utils/preparePace';
const RunCard = ({ run }) => (
  <Fragment>
    <Col
      xs={12}
      sm={6}
      md={6}
      lg={3}
      xl={3}
      className="card-template text-left"
    >
      <Card className="widthCard">
        <Card.Img
          variant="top"
          src={run.runPreview ? run.runPreview.url : defaultPreviewCard}
        />
        <Card.Body>
          <Card.Title>
            <div
              style={{
                fontSize: '1.3em'
              }}
              className="font-weight-bold text-center"
            >
              {run.nameRun}
            </div>
          </Card.Title>
          <Card.Text>
            &bull; {run.distance} km
            <br />
            &bull; {preparePace(run.pace)}/km
            <br />
            &bull; {run.time}
            <br />
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-center ">
          <small className="text-muted">Добавлено {run.date}</small>
        </Card.Footer>
      </Card>
    </Col>
  </Fragment>
);

export default RunCard;
