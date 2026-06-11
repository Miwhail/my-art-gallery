import React from 'react';
import GalleryCard from './GalleryCard';

function Gallery({ paintings }) {
  if (paintings.length === 0) {
    return (
      <div className="no-results-msg">
        No paintings match your filters. Try adjusting the criteria.
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