import { motion } from "framer-motion";
import { AiFillLike } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useProductStore } from "../../providers/AppProviders";

const ProductMightLike = ({ videos = [], heading = "You may like" }) => {
  const { recentlyViewsData, BASE_URL } = useProductStore();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const handleViewsDataClick = (id) => {
    window.location.href = `/categories/product/${id}`;
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
      {recentlyViewsData?.map((product, index) => (
        <div
          key={index}
          className="flex items-center  bg-white p-4 rounded-lg shadow-md hover:shadow-lg  duration-75 cursor-pointer max-h-[80px] group"
          onClick={() => handleViewsDataClick(product?.id)}
        >
          <img
            src={`${BASE_URL}/${product.thumbnail}`}
            alt={product.heading}
            className="w-28 h-28 object-cover mr-4 p-2 border"
          />
          <div className="text-content space-y-2">
            <h3 className="text-xl font-bold text-gray-600 group-hover:text-zinc-800">
              {" "}
              {product.title.length > 20
                ? product.title.slice(0, 20) + "..."
                : product.title}
            </h3>

            {/* Base price (crossed out if discount exists) */}
            {product.discount_price && (
              <div>
                {product.discount_price && (
                  <p className="text-lg text-gray-500 line-through">
                    ৳ {product.base_price}
                  </p>
                )}

                {/* Discounted price if available */}
                {product.discount_price && (
                  <p className="text-xl font-medium text-red-500 flex">
                    ৳ {product.discount_price}{" "}
                    <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                      Best BD Price
                    </span>
                  </p>
                )}
              </div>
            )}
            {!product.discount_price && (
              <div>
                {/* Discounted price if available */}
                {product.base_price && (
                  <p className="text-xl font-medium text-red-500 flex">
                    ৳ {product.base_price}{" "}
                    <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                      Best BD Price
                    </span>
                  </p>
                )}
              </div>
            )}
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
