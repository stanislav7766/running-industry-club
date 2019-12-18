import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Footer.css';

const Footer = () => (
  <Row>
    <Col xs={12}>
      <footer className="FooterBlock">
        Copyright &copy; {new Date().getFullYear()} Running Industry Club
      </footer>
    </Col>
  </Row>
);

export default Footer;
