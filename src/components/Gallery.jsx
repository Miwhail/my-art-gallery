import React from 'react';
import GalleryCard from './GalleryCard';

function Gallery({ paintings, searchTerm }) {
  if (paintings.length === 0) {
    return (
      <div className="no-results-msg">
        No results found for "{searchTerm}"
      </div>
    );
  }

  return (
    <div className="gallery-block">
      {paintings.map(painting => (
        <GalleryCard key={painting.id} painting={painting} />
      ))}
    </div>
  );
}

export default Gallery;