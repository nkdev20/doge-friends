import React from 'react';

const DogCardInfo = ({ imgUrl, pictureId }) => (
    <div className='card dog-card'>
      <div className='card-image'>
        <figure className='image' style={{ backgroundImage: `url(${imgUrl})` }}>
          <img src={imgUrl} alt={`A nice dog`} className='is-sr-only' />
        </figure>
      </div>
      <div className='card-content'>
        <div className='content'>
          <strong>picture id:</strong> {pictureId}
        </div>
      </div>
    </div>
  );


export default DogCardInfo;