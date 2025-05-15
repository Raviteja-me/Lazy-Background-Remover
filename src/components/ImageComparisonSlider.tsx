import React, { useState, useRef, useEffect } from 'react';

interface ImageComparisonSliderProps {
  originalImage: string;
  processedImage: string;
}

const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({
  originalImage,
  processedImage,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) updateSliderPosition(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches.length > 0) {
      updateSliderPosition(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updateSliderPosition(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      onClick={handleClick}
    >
      {/* Background - Original Image (right side) */}
      <div className="absolute inset-0">
        <img
          src={originalImage}
          alt="Original"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
        />
      </div>

      {/* Foreground - Processed Image (left side) */}
      <div className="absolute inset-0">
        <img
          src={processedImage}
          alt="Processed"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        />
      </div>

      {/* Slider line and handle */}
      <div
        className="absolute inset-y-0 z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Line */}
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-md"></div>

        {/* Handle */}
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8L16 16M16 8L8 16"
              stroke="#8A2BE2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs py-1 px-2 rounded">
        Removed Background
      </div>
      <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs py-1 px-2 rounded">
        Original
      </div>
    </div>
  );
};

export default ImageComparisonSlider;