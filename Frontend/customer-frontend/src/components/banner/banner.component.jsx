import React, { useState, useEffect } from 'react';
import './banner.styles.css'; // We'll create this CSS file next

import Banner1 from '../../images/banner-image-1.jpg'
import Banner2 from '../../images/banner-image-2.jpg'
import Banner3 from '../../images/banner-image-3.jpg'

const Banner = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
    { src: Banner1, alt: 'Description for image one' },
    { src: Banner2, alt: 'Description for image two' },
    { src: Banner3, alt: 'Description for image three' },
    ];
  // Go to the next image
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Go to the previous image
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance the slider every 3 seconds (adjust as needed)
  useEffect(() => {
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [currentIndex, images.length]); // Re-run effect if currentIndex or images change

  return (
    <div className="slider-container">
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="slider-slide" key={`slider-${index}`}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
      <button className="slider-button prev" onClick={goToPrevious}>
        &#10094; {/* Left arrow */}
      </button>
      <button className="slider-button next" onClick={goToNext}>
        &#10095; {/* Right arrow */}
      </button>
      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`slider-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;