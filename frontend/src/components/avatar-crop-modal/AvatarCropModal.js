import React, { useState, useCallback } from 'react';
import { Modal, Button, Col, Row, Container } from 'react-bootstrap';
import Cropper from 'react-easy-crop';
import AdjustBar from '../adjust-bar';
import getCroppedImg from '../../utils/cropImage';
import dataURItoBlob from '../../utils/dataURLtoBlob';

import './AvatarCropModal.css';

const AvatarCropModal = ({
  image,
  setImage,
  showModal,
  setShowModaL,
  setCroppedAvatar
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback(
    (_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels),
    []
  );
  const createCroppedImage = async () => {
    try {
      const avatarBase64 = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      setCroppedAvatar(dataURItoBlob(avatarBase64));
      setShowModaL(!showModal);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Modal
      centered
      size="lg"
      show={showModal}
      onHide={() => setShowModaL(false)}
      aria-labelledby="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Кадрирование фото</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </Modal.Body>
      <Modal.Footer>
        <Container fluid={true}>
          <Col className="mt-2">
            <Row>
              <Col xs={4} className="px-0">
                Масштаб
              </Col>
              <Col xs={8} className="pr-0">
                <AdjustBar
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={zoom => setZoom(zoom)}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4} className="px-0">
                Вращение
              </Col>
              <Col xs={8} className="pr-0">
                <AdjustBar
                  min={0}
                  max={360}
                  step={1}
                  value={rotation}
                  onChange={rotation => setRotation(rotation)}
                />
              </Col>
            </Row>
          </Col>
          <Col className="px-0 mt-3">
            <Button className="bg-blue" block onClick={createCroppedImage}>
              Обрезать
            </Button>
          </Col>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};
export default AvatarCropModal;
