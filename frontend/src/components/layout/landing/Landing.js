import React, { useState, useLayoutEffect, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LandingCard from '../landing-card/';
import nrcCard from '../../../img/nrc-card.jpg';
import profileCard from '../../../img/own-profile-card.jpg';
import newsCard from '../../../img/news-card.jpg';
import linkCard from '../../../img/link-card.jpg';
import './Landing.css';

const simulatedCards = {
  downloadApp: {
    image: nrcCard,
    title: 'Присоединись к RIC',
    body: 'Стать участником нашего сервиса',
    link: '/register'
  },
  ownProfile: {
    image: profileCard,
    title: 'Личный Профиль',
    body: 'Следить за своей активностю в личном кабинете',
    link: '/own-profile'
  },
  news: {
    image: newsCard,
    title: 'Новости',
    body: 'Читать актуальные новостные подборки по бегу',
    link: '/news'
  },
  linkOfficialSite: {
    image: linkCard,
    title: 'Nike',
    body: 'Посетить Официальный Сайт',
    link: 'https://www.nike.com/ru/ru_ru/c/running/nike-run-club'
  }
};

const Landing = () => {
  const [sizeLandingImage, setSizeLandingImage] = useState([
    window.innerWidth,
    window.innerWidth / 4
  ]);

  const imgTop = window.innerHeight * 0.08;
  const indent = window.innerHeight * 0.1;
  useLayoutEffect(() => {
    const updateSize = () =>
      setSizeLandingImage([window.innerWidth, window.innerWidth / 4]);
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div id="landing">
      <Container fluid={true}>
        <Row>
          <Col className="pad-x" xs={12}>
            {useMemo(
              () => (
                <div
                  className="main-image-template landing-image"
                  style={{
                    marginTop: `${imgTop}px`,
                    width: `${sizeLandingImage[0]}px`,
                    height: `${sizeLandingImage[1]}px`
                  }}
                />
              ),
              [sizeLandingImage[0]]
            )}
            <h1
              className="text-center font-weight-bold"
              style={{
                marginTop: `${window.innerHeight * 0.1}px`
              }}
            >
              RUNNING INDUSTRY CLUB
            </h1>
            <Row>
              <Col xs={{ span: 8, offset: 2 }}>
                <h3 className="font-weight-light subHeaderText">
                  Бег – это величайшая метафора для жизни, потому что ты
                  получаешь от него столько же, сколько в него вкладываешь.
                </h3>
                <h1
                  style={{
                    marginTop: '80px'
                  }}
                  className="subHeaderText inclinedText"
                >
                  “Running is about finding your inner peace, and so is a life
                  well lived.”
                </h1>
                <h6
                  style={{
                    textAlign: 'right',
                    marginTop: '-8px'
                  }}
                >
                  &copy; Dean Karnazes
                </h6>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: `${indent}px`,
                marginBottom: `${indent}px`
              }}
            >
              <Col xs={12}>
                <Row style={{ textAlign: 'center' }}>
                  {Object.keys(simulatedCards).map(card => (
                    <LandingCard
                      key={card}
                      cardImage={simulatedCards[card].image}
                      cardBody={simulatedCards[card].body}
                      cardTitle={simulatedCards[card].title}
                      cardLink={simulatedCards[card].link}
                    ></LandingCard>
                  ))}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Landing;
