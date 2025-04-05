import React, { useEffect, useState } from "react";
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

const ProductDetails = () => {
  const { filterSingleProduct, allData, loading } = useProductStore();
  const { category, condition, id } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productTitle, setProductTitle] = useState(""); // State to store the product title

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Category", link: "/categories" },
    { label: category || "Unknown Category", p: "" }, // Show the category name
    { label: productTitle || `Product ID: ${id}`, p: "" }, // Show the product title if available, otherwise show the product ID
  ];
  const smallImages = [
    "/src/assets/imgs/imgF1.png",
    "/src/assets/imgs/imgF2.png",
    "/src/assets/imgs/imgF3.png",
    "/src/assets/imgs/imgF4.png",
    "/src/assets/imgs/imgF5.png",
    "/src/assets/imgs/imgF6.png",
  ];
  console.log(allData);
  useEffect(() => {
    if (loading) {
      return;
    }

    if (!allData || !Array.isArray(allData.products)) {
      console.error("allData is not an array:", allData);
      return;
    }

    const selectedFilters = {
      id: id ? parseInt(id) : null,
      categories: category || "",
      condition: condition || "Any",
    };

    const filteredData = filterSingleProduct(allData, selectedFilters);
    setFilteredProducts(filteredData);

    if (filteredData.length > 0) {
      const product = filteredData;
      setProductTitle(product.title);
    }
  }, [id, category, condition, allData, loading, filterSingleProduct]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (filteredProducts.length === 0) {
    return <p>No products found matching the selected filters.</p>;
  }
  console.log(filteredProducts);
  return (
    <div className="product_content">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid bg-white p-6">
        <div className="product_img">
          <div className="main-image border-2   rounded-lg">
            <img
              src={`${filteredProducts[0].image}`}
              alt="Main Product"
              className="w-full h-auto"
            />
          </div>
          {/* Small Images (Dynamic Grid) */}
          <div className="small-images grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-4  ">
            {smallImages.map((image, index) => (
              <div key={index} className="small-img border-2   ">
                <img
                  src={image}
                  alt={`Small Image ${index + 1}`}
                  className="w-28 h-20 object-cover p-1"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="product_info px-10 py-2">
          <p className="flex justify-start items-center text-xl">
            {filteredProducts[0]?.quantity > 0 ? (
              <>
                <IoCheckmark className="text-3xl text-green-400" />
                In Stock
              </>
            ) : (
              <>
                <IoClose className="text-3xl text-red-400" />
                Out of Stock
              </>
            )}
          </p>

          <h2 className="text-3xl font-medium font-sans ">
            <span>{filteredProducts[0]?.title}</span>,&nbsp;
            <span>{filteredProducts[0]?.subtitle}</span> <br />
            {filteredProducts[0]?.features.map((feature) => (
              <span>{feature}&nbsp;</span>
            ))}
          </h2>
          {/* Rating/reviews */}
          <div className="text-3xl flex flex-wrap gap-x-4 items-center text-gray-600">
            {/* Rating */}
            <div className="flex items-center gap-x-1">
              <StarRating rating={filteredProducts[0]?.rating} />
              <span className="">{filteredProducts[0]?.rating}</span>
            </div>
            <GoDotFill className="text-gray-300 text-xl" />

            {/* Reviews */}
            <div className="flex items-center gap-x-1">
              <CgComment className="" />
              <span className="">{filteredProducts[0]?.reviews}</span>
            </div>
            <GoDotFill className="text-gray-300 text-xl" />

            {/* Sold */}
            <div className="flex items-center gap-x-1">
              <MdOutlineShoppingBasket className="" />
              <span className="">&nbsp;{filteredProducts[0]?.sold} sold</span>
            </div>
          </div>
          {/* price-box */}
          <div className="flex items-center   gap-x-4 py-6 px-4 bg-orange-100 ">
            <div className="flex flex-col border-r-2 border-neutral-300 p-4 pr-16 ">
              <p className="text-3xl font-bold text-red-500">$98.00</p>
              <span className="text-2xl">50-100 pcs</span>
            </div>
            <div className="flex flex-col border-r-2 border-neutral-300 p-4 pr-16">
              <p className="text-3xl font-bold">$90.00</p>
              <span className="text-2xl">100-700 pcs</span>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl font-bold">$78.00</p>
              <span className="text-2xl">700+ pcs</span>
            </div>
          </div>
          {/*  */}
          <div className="px-4 py-5 text-[1.8rem] ">
            <div className="flex  border-b pb-2 py-4">
              <span className="w-1/2 text-gray-500  font-medium">Price:</span>
              <span className="text-gray-800 ">Negotiable</span>
            </div>
            <div className="flex  pb-2 py-4">
              <span className="w-1/2 text-gray-500  font-medium">Brand:</span>
              <span className="text-gray-800 ">Apple</span>
            </div>
            <div className="flex  pb-2">
              <span className="w-1/2 text-gray-500  font-medium">
                Material:
              </span>
              <span className="text-gray-800 ">
                {filteredProducts[0]?.product_material}
              </span>
            </div>
            <div className="flex  border-b pb-2 py-4">
              <span className="w-1/2 text-gray-500  font-medium">Design:</span>
              <span className="text-gray-800 ">
                {filteredProducts[0]?.design}
              </span>
            </div>
            <div className="flex  pb-2 py-4">
              <span className="w-1/2 text-gray-500  font-medium">
                Condition:
              </span>
              <span className="text-gray-800 ">
                {" "}
                {filteredProducts[0]?.condition}
              </span>
            </div>
            <div className="flex  pb-2">
              <span className="w-1/2 text-gray-500 font-medium">warranty:</span>
              <span className="text-gray-800 ">
                {" "}
                {filteredProducts[0]?.warranty}
              </span>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="product_supplier  ">
          <div className="flex flex-col border-2">
            {/* 1 */}
            <div className="flex  items-center">
              <div className=" h-24 flex justify-center items-center p-10   ">
                <span className="text-6xl font-bold w-[50px] h-[50px] flex justify-center items-center bg-[#c5f3f2] text-[#85c4c1]">
                  R
                </span>
              </div>
              <div className="text-3xl text-gray-700">
                <h3>Supplier</h3>
                <h3>Guanjoi Trading LLC</h3>
              </div>
            </div>
            {/* 2 */}
            <div className="flex flex-col gap-4 py-4">
              {/* First row */}
              <div className="flex items-center gap-2 ">
                <div className="w-[17%] flex justify-center items-center ">
                  <img src="/src/assets/imgs/imgF1.png" alt="" />
                </div>
                <span className="text-3xl text-gray-400">Germany, Berlin</span>
              </div>
              {/* Second row */}
              <div className="flex items-center gap-2">
                <GoShieldCheck className="text-4xl w-[17%]" />

                <span className="text-3xl text-gray-400">Verified Seller</span>
              </div>
              {/* Third row */}
              <div className="flex items-center gap-2">
                <AiOutlineGlobal className="text-4xl w-[17%]" />

                <span className="text-3xl text-gray-400">
                  Worldwide shipping
                </span>
              </div>
            </div>
            {/* 3 */}
            <button className="text-3xl bg-blue-500 rounded-lg py-4 my-2 w-[95%] mx-auto text-white">
              Send inquiry
            </button>
            <button className="text-3xl  border rounded-lg py-4 my-2 w-[95%] mx-auto">
              Seller's profile
            </button>
          </div>
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
