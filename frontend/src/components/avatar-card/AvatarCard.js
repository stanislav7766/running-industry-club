import React, { useState, useEffect, Fragment } from 'react';
import { Card } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import readFile from '../../utils/readFile';
import AvatarCropModal from '../../components/avatar-crop-modal';

import './AvatarCard.css';

const AvatarCard = ({ croppedAvatar, setCroppedAvatar, nickname }) => {
  const [showModal, setShowModal] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [image, setImage] = useState(null);
  const avatarDims = { width: '200px', height: '200px', borderRadius: '100%' };

  const onFileChange = async e => {
    const {
      target: { files }
    } = e;
    if (files && files.length > 0) {
      try {
        setShowModal(true);
        const img = await readFile(files[0]);
        setImage(img);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const input = window.document.getElementById('upload-img');
    isClicked && input && input.click();
  }, [isClicked]);

  return (
    <Fragment>
      <Fragment>
        <input
          type="file"
          id="upload-img"
          className="d-none"
          onChange={onFileChange}
        />
        <canvas className="d-none" id="canvas1"></canvas>
      </Fragment>
      {showModal && (
        <AvatarCropModal
          image={image}
          setImage={setImage}
          setCroppedAvatar={setCroppedAvatar}
          showModal={showModal}
          setShowModaL={setShowModal}
        />
      )}
      <Card
        onClick={() => setIsClicked(!isClicked)}
        style={{ borderRadius: '4px' }}
        className="bg-blue text-white"
      >
        {croppedAvatar ? (
          <img
            className="mx-auto mt-4"
            style={avatarDims}
            src={croppedAvatar}
            alt=""
          ></img>
        ) : (
          <IconContext.Provider
            value={{
              style: avatarDims
            }}
          >
            <div className="mx-auto mt-4">
              <FaUser />
            </div>
          </IconContext.Provider>
        )}

        <Card.Body className="text-center">
          <div className="display-4">{nickname}</div>
          <div className="small lead">Вы можете изменить свои данные</div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
export default AvatarCard;
