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

const ProductDetails = () => {
  const { filterSingleProduct, productData, loading } = useProductStore();
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
    if (filteredProducts[0]?.image) {
      setMainImage(filteredProducts[0].image);
    }
  }, [filteredProducts]);

  const product = useMemo(() => productData?.product || null, [productData]);
  console.log(product, "product");
  if (loading || !productData) {
    return <p>Loading...</p>;
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
          smallImages={smallImages}
          initialMainImage={mainImage}
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
      {/* 3rd Column */}
      <ProductDetailsRelated />
      {/* 4th column */}
      <ProductDetailsDiscount />
    </div>
  );
};

export default ProductDetails;
