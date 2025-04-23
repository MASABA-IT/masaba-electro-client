import React, { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useProductStore } from "../../providers/AppProviders";
import { useParams } from "react-router-dom";
import "../../styles/layouts/_grid.scss";
import { IoCheckmark, IoClose } from "react-icons/io5";
import StarRating from "../../components/StarRating/StarRating";

import { CgComment } from "react-icons/cg";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { GoDotFill, GoShieldCheck } from "react-icons/go";
import { AiOutlineGlobal } from "react-icons/ai";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import { CiHeart } from "react-icons/ci";
import ProductDetailsInfo from "../../components/ProductDetailsInfo/ProductDetailsInfo";
import ProductDetailsRelated from "../../components/ProductDetailsRelated/ProductDetailsRelated";
import ProductDetailsDiscount from "../../components/ProductDetailsDiscount/ProductDetailsDiscount";
import ProductPriceSection from "../../components/ProductPriceSection/ProductPriceSection";
import ProductInfo from "../../components/ProductInfo/ProductInfo";
import ReviewsWithComments from "../../components/ReviewsWithComments/ReviewsWithComments";

const ProductDetails = () => {
  const { fetchProductById, productData, loading } = useProductStore();
  const { category, condition, id } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [mainImage, setMainImage] = useState(filteredProducts[0]?.image || "");

  const [saved, setSaved] = useState(false);
  const handleSaveToggle = () => setSaved((prev) => !prev);
  const handleAddToCart = (qty) => {
    console.log(`Added ${qty} of ${product.title} to cart`);
    // your cart logic here
  };

  useEffect(() => {
    fetchProductById(id);
  }, []);
  useEffect(() => {
    if (filteredProducts[0]?.image) {
      setMainImage(filteredProducts[0].image);
    }
  }, [filteredProducts]);

  const product = useMemo(
    () => productData?.productArray || null,
    [productData]
  );
  console.log(product);
  if (loading || !productData) {
    return (
      <div className="product_content animate-pulse min-h-[500px] bg-white p-6 rounded-xl shadow-md space-y-6">
        <div className="grid bg-white p-6 shadow-sm animate-pulse gap-6 grid-cols-1 md:grid-cols-3">
          {/* 1st: Image Gallery Placeholder */}
          <div className="bg-gray-200 rounded-lg h-[400px] w-full"></div>

          {/* 2nd: Product Info Placeholder */}
          <div className="flex flex-col space-y-4 col-span-1 md:col-span-1">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-24 bg-gray-100 rounded"></div>
          </div>

          {/* 3rd: Add to Cart / Price Section */}
          <div className="flex flex-col space-y-3">
            <div className="h-10 w-full bg-gray-300 rounded"></div>
            <div className="h-10 w-2/3 bg-gray-300 rounded"></div>
            <div className="h-10 w-1/2 bg-gray-400 rounded"></div>
          </div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-96 bg-gray-200 rounded"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  // //////////////////////
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Category", link: "/categories" }, // Show the category name
    { label: product.title || `${filteredProducts[0]?.title}`, p: "" }, // Show the product title if available, otherwise show the product ID
  ];
  const smallImages = [
    "/src/assets/imgs/imgw-1.jpg",
    "/src/assets/imgs/imgw-2.jpg",
    "/src/assets/imgs/imgm-3.webp",
    "/src/assets/imgs/imgm-4.webp",
    "/src/assets/imgs/imgm-5.jpeg",
    "/src/assets/imgs/imgm-6.webp",
  ];

  return (
    <div className="product_content">
      <Breadcrumb items={breadcrumbItems} />
      {/* 1st Column */}
      <div className="grid bg-white p-6 shadow-sm">
        {/* IMG GALLERY */}
        <ImageGallery
          smallImages={product.images}
          initialMainImage={product.thumbnail}
          autoSlideInterval={4000}
        />

        {/* Info */}
        <ProductInfo product={product} />

        {/*  right procut increase decrease
         */}
        <ProductPriceSection
          stock={product?.stocks?.[0]?.quantity || 0}
          price={product?.base_price}
          isSaved={saved}
          onSaveToggle={handleSaveToggle}
          onAddToCart={handleAddToCart}
        />
      </div>
      {/* 2nd Column */}
      <ProductDetailsInfo product={product} />
      {/* 3rd Column Revies & Comments */}
      <ReviewsWithComments product={product} />
      {/* 4th Column */}
      <ProductDetailsRelated />
      {/* 5th  column */}
      <ProductDetailsDiscount />
    </div>
  );
};

export default ProductDetails;
