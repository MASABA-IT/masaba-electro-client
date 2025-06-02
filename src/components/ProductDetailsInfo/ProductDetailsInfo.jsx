import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { IoCheckmarkOutline } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiFillLike } from "react-icons/ai";
import ProductInfoDescription from "../ProductInfoDescription/ProductInfoDescription";
import ProductMightLike from "../ProductMightLike/ProductMightLike";

const ProductDetailsInfo = ({ product }) => {
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
  // const videos = [
  //   "https://www.w3schools.com/html/movie.mp4", // Example video 1
  //   "https://www.w3schools.com/html/mov_bbb.mp4", // Example video 2
  //   "https://www.w3schools.com/html/movie.mp4", // Example video 3
  //   "https://www.w3schools.com/html/mov_bbb.mp4", // Example video 4
  //   "https://www.w3schools.com/html/movie.mp4", // Example video 5
  // ];

  // const settings = {
  //   dots: false, // No dots
  //   infinite: true,
  //   speed: 500,
  //   autoplay: true,
  //   autoplaySpeed: 3000, // Change every 3 seconds
  //   slidesToShow: 1, // Only show one video at a time
  //   slidesToScroll: 1,
  //   fade: true, // Apply fade effect between slides
  // };
  console.log(product, "product");
  return (
    <div className="productDetailsInfo mt-8 rounded-lg shadow-sm  ">
      {/* Content Data Daynamically set  left */}
      <ProductInfoDescription
        description={
          product.description
            ? product.description
            : `
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, aspernatur? Incidunt est dolores saepe impedit, blanditiis in commodi a eveniet?sit amet consectetur adipisicing elit. Voluptatum, aspernatur? Incidunt est dolores saepe impedit, blanditiis in commodi a eveniet?...</p>
            <ul>
              <li>Free Shipping</li>
              <li>Gift Wrapping Available</li>
              <li>Extended Warranty</li>
              <li>24/7 Customer Support</li>
              <li>Eco-Friendly Packaging</li>
            </ul>
            <table  >
              <tr>
                <th>Label</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>Model</td>
                <td>#85c4c1</td>
              </tr>
              <tr>
                <td>Style</td>
                <td>Classic Style</td>
              </tr>
              <tr>
                <td>Certificate</td>
                <td>ISO-39039340839</td>
              </tr>
              <tr>
                <td>Size</td>
                <td>24mm x 450mm x 18mm</td>
              </tr>
              <tr>
                <td>Memory</td>
                <td>36GB RAM</td>
              </tr>
            </table>
            `
        }
        reviews={product?.reviews}
        termsAndConditions={product?.terms_conditions}
        shipping={product.shipping}
        author={product?.author}
        specifications={
          product?.specifications.length ? product.specifications : null
        }
        summary={product?.summary}
      />

      {/* you may like right */}
      <ProductMightLike />
      {/* <ProductMightLike products={products} videos={videos} /> */}
    </div>
  );
};

export default ProductDetailsInfo;
