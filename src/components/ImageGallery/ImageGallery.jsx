import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageGallery = ({
  smallImages = [],
  initialMainImage = "",
  autoSlideInterval = 3000,
}) => {
  const [mainImage, setMainImage] = useState(
    initialMainImage || smallImages[0] || ""
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailRefs = useRef([]);
  const intervalRef = useRef(null);

  // Auto-slide logic
  useEffect(() => {
    if (smallImages.length <= 1) return;

    startAutoSlide();

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [smallImages]);

  // Reset image when props change
  useEffect(() => {
    if (initialMainImage) {
      setMainImage(initialMainImage);
      setActiveIndex(smallImages.indexOf(initialMainImage));
    } else if (smallImages.length > 0) {
      setMainImage(smallImages[0]);
      setActiveIndex(0);
    }
  }, [initialMainImage, smallImages]);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % smallImages.length;
        setMainImage(smallImages[nextIndex]);
        return nextIndex;
      });
    }, autoSlideInterval);
  };

  const handleImageClick = (img, index) => {
    setMainImage(img);
    setActiveIndex(index);
    startAutoSlide(); // Reset timer on manual click

    thumbnailRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div className="product_img">
      {/* Main Image with Animation */}
      <div className="main-image border-2 rounded-lg overflow-hidden h-[350px] xl:h-[500px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={mainImage}
            src={mainImage}
            alt="Main Product"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="object-contain h-full w-auto absolute"
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="small-images flex overflow-x-auto gap-2 mt-4 scrollbar-hide">
        {smallImages.map((image, index) => (
          <motion.div
            key={index}
            ref={(el) => (thumbnailRefs.current[index] = el)}
            onClick={() => handleImageClick(image, index)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className={`min-w-[7rem] m-1 cursor-pointer border-2 rounded-md transition-all duration-300 p-2 ${
              activeIndex === index
                ? "border-blue-500 shadow-lg"
                : "border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`Thumb ${index + 1}`}
              className="h-20 w-full object-cover rounded"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
