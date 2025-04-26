import { motion } from "framer-motion";
import { AiFillLike } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useProductStore } from "../../providers/AppProviders";

const ProductMightLike = ({ videos = [], heading = "You may like" }) => {
  const { recentlyViewsData, BASE_URL } = useProductStore();

  const isLoading = !recentlyViewsData || recentlyViewsData.length === 0;

  const handleViewsDataClick = (id) => {
    window.location.href = `/categories/product/${id}`;
  };

  return (
    <div className="youMightLike bg-white xl:ml-4 flex flex-col gap-y-2">
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

      {/* Loading Placeholder */}
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-100 rounded-lg p-4 flex gap-4 items-center shadow"
            >
              <div className="w-24 h-24 bg-gray-300 rounded-md" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-300 rounded w-1/2" />
                <div className="h-4 bg-gray-300 rounded w-2/3" />
              </div>
            </div>
          ))
        : recentlyViewsData.map((product, index) => (
            <div
              key={index}
              className="flex md:flex-col lg:flex-row xl:flex-row items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg duration-75 cursor-pointer xl:max-h-[80px] group"
              onClick={() => handleViewsDataClick(product?.id)}
            >
              <img
                src={`${BASE_URL}/${product.thumbnail}`}
                alt={product.heading}
                className="w-44 h-44 md:w-28 md:h-28 object-cover mr-4 p-2 border"
              />
              <div className="text-content space-y-2">
                <h3 className="text-2xl md:text-xl font-bold text-gray-600 group-hover:text-zinc-800">
                  {product.title.length > 20
                    ? product.title.slice(0, 20) + "..."
                    : product.title}
                </h3>
                {product.discount_price ? (
                  <div>
                    <p className="text-xl md:text-lg text-gray-500 line-through">
                      ৳ {product.base_price}
                    </p>
                    <p className="text-2xl md:text-xl font-medium text-red-500 flex">
                      ৳ {product.discount_price}
                      <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded-full ml-2">
                        Best BD Price
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="text-xl font-medium text-red-500 flex">
                    ৳ {product.base_price}
                    <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded-full ml-2">
                      Best BD Price
                    </span>
                  </p>
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default ProductMightLike;
{
  /* Video Carousel */
  /* {videos.length > 0 && (
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
      )} */
}
