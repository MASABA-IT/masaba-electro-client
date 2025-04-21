import { motion } from "framer-motion";
import { AiFillLike } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductMightLike = ({
  products = [],
  videos = [],
  heading = "You may like",
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="youMightLike bg-white xl:ml-4 flex flex-col gap-y-2 mt-4">
      <h3 className="text-2xl py-4 px-8 flex items-center gap-x-4">
        {heading}
        <motion.div
          initial={{ opacity: 0, y: -1000, rotate: 360 }}
          animate={{
            opacity: 1,
            y: [0, -30, 0, -20, 0],
            rotate: [360, 0],
            scale: [1, 1.1, 1],
            transition: {
              duration: 1.5,
              ease: "easeOut",
              times: [0, 0.2, 0.5, 0.7, 1],
            },
          }}
        >
          <AiFillLike className="text-blue-400 text-4xl" />
        </motion.div>
      </h3>

      {/* Recommended Products */}
      {products.map((product, index) => (
        <div
          key={index}
          className="flex items-center bg-white p-4 rounded-lg shadow-lg max-h-[80px]"
        >
          <img
            src={product.image}
            alt={product.heading}
            className="w-28 h-28 object-cover mr-4 p-2 border"
          />
          <div className="text-content">
            <h3 className="text-2xl font-bold">{product.heading}</h3>
            <p className="text-xl text-gray-600">{product.title}</p>
            <p
              className="text-xl font-semibold"
              style={{ color: "rgb(182, 131, 64)" }}
            >
              {product.price}
            </p>
          </div>
        </div>
      ))}

      {/* Video Carousel */}
      {videos.length > 0 && (
        <div className="video-carousel-container px-4 mt-4">
          <Slider {...settings}>
            {videos.map((video, index) => (
              <div key={index} className="video-slide">
                <video
                  src={video}
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ProductMightLike;
