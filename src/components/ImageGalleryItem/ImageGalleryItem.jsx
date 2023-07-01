import React from 'react';

export const ImageGalleryItem = ({ imgUrl, alt }) => {
  return (
    <li className="gallery-item">
      <img src={imgUrl} alt={alt} />
    </li>
  );
};
