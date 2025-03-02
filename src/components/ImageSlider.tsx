import { useState } from "react";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-48">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <Image
                src={src}
                alt={`Slide ${index}`}
                className="w-full h-48 object-cover"
                width={416}
                height={192}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handlePrev}
        className="hidden md:block absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        &gt;
      </button>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-gray-100 p-2 rounded-full">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-black" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
