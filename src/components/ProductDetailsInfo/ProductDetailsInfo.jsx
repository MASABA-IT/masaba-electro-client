import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { IoCheckmarkOutline } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiFillLike } from "react-icons/ai";

const ProductDetailsInfo = () => {
  const [activeTab, setActiveTab] = useState(1); // Default to the first tab (Description)
  const [productData, setProductData] = useState([]); // State for dynamic product data

  const contentVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  // Simulate fetching product data
  useEffect(() => {
    // Simulated data fetching
    const fetchedData = [
      { label: "Model", value: "#85c4c1" },
      { label: "Style", value: "Classic Style" },
      { label: "Certificate", value: "ISO-39039340839" },
      { label: "Size", value: "24mm x 450mm x 18mm" },
      { label: "Memory", value: "36GB RAM" },
    ];
    setProductData(fetchedData); // Set the fetched data
  }, []);
  const items = [
    { text: "Free Shipping" },
    { text: "Gift Wrapping Available" },
    { text: "Extended Warranty" },
    { text: "24/7 Customer Support" },
    { text: "Eco-Friendly Packaging" },
    // { text: "Money-Back Guarantee" },
    // { text: "Exclusive Member Discounts" },
    // { text: "Free Returns within 30 Days" },
    // { text: "Easy Payment Options" },
    // { text: "Price Match Promise" },
  ];
  const products = [
    {
      image: "/src/assets/imgs/imgw-1.jpg",
      heading: "Product Demo Title",
      title: "Cool Gadget",
      price: "$20 - $243",
    },
    {
      image: "/src/assets/imgs/imgw-1.jpg",
      heading: "Product 2",
      title: "Smart Watch",
      price: "$50 - $120",
    },
    {
      image: "/src/assets/imgs/imgw-1.jpg",
      heading: "Product 3",
      title: "Headphones",
      price: "$30 - $90",
    },
    {
      image: "/src/assets/imgs/imgw-1.jpg",
      heading: "Product 4",
      title: "Bluetooth Speaker",
      price: "$40 - $150",
    },
    {
      image: "/src/assets/imgs/imgw-1.jpg",
      heading: "Product 5",
      title: "Wireless Mouse",
      price: "$10 - $50",
    },
  ];
  const videos = [
    "https://www.w3schools.com/html/movie.mp4", // Example video 1
    "https://www.w3schools.com/html/mov_bbb.mp4", // Example video 2
    "https://www.w3schools.com/html/movie.mp4", // Example video 3
    "https://www.w3schools.com/html/mov_bbb.mp4", // Example video 4
    "https://www.w3schools.com/html/movie.mp4", // Example video 5
  ];

  const settings = {
    dots: false, // No dots
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000, // Change every 3 seconds
    slidesToShow: 1, // Only show one video at a time
    slidesToScroll: 1,
    fade: true, // Apply fade effect between slides
  };
  return (
    <div className="productDetailsInfo mt-8 rounded-lg shadow-sm">
      {/* Content Data Daynamically set  */}
      <div className="productInfoSwitch mr-4 md:p-6 bg-white">
        {/* Buttons to Switch Content */}
        <div className="tabs border-b-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <button
            onClick={() => setActiveTab(1)}
            className={activeTab === 1 ? "active" : ""}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={activeTab === 2 ? "active" : ""}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={activeTab === 3 ? "active" : ""}
          >
            Shipping
          </button>
          <button
            onClick={() => setActiveTab(4)}
            className={activeTab === 4 ? "active" : ""}
          >
            About seller
          </button>
        </div>

        {/* Content Areas */}
        <div className="content text-2xl">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {activeTab === 1 && (
              <div>
                Description content: Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nisi, reprehenderit fuga perspiciatis rerum
                quo, corporis praesentium dicta iusto et doloribus, nostrum
                culpa commodi? Earum repudiandae suscipit totam labore veritatis
                cum obcaecati impedit porro, distinctio facere beatae ut!
                Obcaecati maiores odit autem laboriosam quis, sapiente assumenda
                ipsa quas laudantium beatae error eum facere illo non ipsum
                expedita officiis dicta repudiandae nihil accusamus dolorem
                magni consequuntur? Adipisci, magni! Sint quisquam tempora
                perspiciatis labore dolorem, illo eum. Numquam unde amet enim
                vero? Molestias optio temporibus ipsa dolor nesciunt ipsam?
                Quisquam blanditiis laudantium natus, labore odio quod omnis
                voluptatibus voluptatem amet sint officiis dignissimos?
              </div>
            )}
            {activeTab === 2 && (
              <div>
                Reviews content: Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Laboriosam veniam vitae vel. Provident animi
                quis soluta, illo laboriosam harum quo, consequatur autem iste
                veniam quia ducimus. Officiis, voluptatum ipsa quaerat beatae
                tempore eius? Ut cupiditate autem earum voluptates
                exercitationem quas perspiciatis voluptatibus ipsam cumque quis,
                nostrum amet sed unde totam doloribus quaerat. Ut fuga maiores
                fugit. Voluptas atque velit molestiae odio ex rem quae pariatur
                dolores error rerum, illo facere eveniet! Nesciunt autem,
                facilis nulla, ut dolores eum sapiente dignissimos quia
                consequuntur sunt, aliquid hic voluptates animi suscipit
                expedita?
              </div>
            )}
            {activeTab === 3 && (
              <div>
                Shipping content: Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Non, fuga velit vitae odio quis amet
                cupiditate, sint eius qui assumenda distinctio nesciunt quasi
                pariatur iure harum. Dolore minima doloribus dolorum rem natus
                consequatur consectetur consequuntur, autem sint quae neque
                placeat?
              </div>
            )}
            {activeTab === 4 && (
              <div>
                About Seller content: Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Illo dolores laudantium quos, possimus ad iste
                sed qui ipsum dolor officiis praesentium error maxime,
                perferendis vero? Consequatur ullam eaque, fugit voluptatibus
                nobis magnam autem dolores sint sit rem ratione reiciendis
                nostrum id numquam suscipit ad repellat ea voluptas maiores.
                Reprehenderit dolores deleniti tenetur aliquam, dolore
                praesentium expedita magnam voluptatem totam enim doloremque
                impedit! Consectetur sequi natus corporis tenetur vitae soluta
                laudantium delectus aliquam distinctio nulla ea, eveniet unde
                quis aut impedit reiciendis hic harum, sint minus iste. Itaque,
                quibusdam.
              </div>
            )}
          </motion.div>
        </div>

        {/* Table Section */}
        <div className="table-section text-2xl">
          {productData.map((item, index) => (
            <div key={index} className="flex-row border-b">
              <div className="column left-column">{item.label}</div>
              <div className="column right-column">{item.value}</div>
            </div>
          ))}
        </div>
        {/* Right Click Section (example for additional feature) */}
        <div className="right-click">
          <ul className="list-container">
            {items.map((item, index) => (
              <li key={index} className="flex-row">
                <IoCheckmarkOutline className="text-gray-400 text-2xl" />

                <span htmlFor={`checkbox-${index}`} className="text">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* you may like */}
      <div className="youMightLike bg-white xl:ml-4 flex flex-col gap-y-2 mt-4 ">
        <h3 className="text-2xl py-4 px-8 flex items-center gap-x-4">
          You may like{" "}
          <motion.div
            initial={{ opacity: 0, y: -1000, rotate: 360 }} // Starts from above and rotates
            animate={{
              opacity: 1, // Fades in
              y: [0, -30, 0, -20, 0], // The icon will fall and bounce (y values simulate the falling and bouncing)
              rotate: [360, 0], // The rotation resets to normal
              scale: [1, 1.1, 1], // Slight bounce scale (bigger when hitting the ground)
              transition: {
                duration: 1.5, // Total duration for the animation
                ease: "easeOut", // Easing effect to smooth out the animation
                times: [0, 0.2, 0.5, 0.7, 1], // These timings control how the animation progresses
              },
            }}
          >
            <AiFillLike className="text-blue-400 text-4xl" />
          </motion.div>
        </h3>
        {products.map((product, index) => (
          <div
            key={index}
            className=" flex items-center bg-white p-4 rounded-lg shadow-lg max-h-[80px]"
          >
            {/* Image on the left */}
            <img
              src={product.image}
              alt={product.heading}
              className="w-28 h-2w-28 object-cover mr-4 p-2 border"
            />
            <div className="text-content">
              {/* Heading */}
              <h3 className="text-2xl font-bold">{product.heading}</h3>
              {/* Title */}
              <p className="text-xl text-gray-600">{product.title}</p>
              {/* Price */}
              <p
                className="text-xl font-semibold "
                style={{ color: "rgb(182, 131, 64)" }}
              >
                {product.price}
              </p>
            </div>
          </div>
        ))}
        {/* add videos */}
        <div className="video-carousel-container">
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
      </div>
    </div>
  );
};

export default ProductDetailsInfo;
