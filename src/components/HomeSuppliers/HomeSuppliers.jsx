import React from "react";
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const suppliers = [
  {
    id: 1,
    country: "Arabic Emirates",
    flag: "/src/assets/imgs/imgF1.png",
    site: "shopname.ae",
  },
  {
    id: 2,
    country: "Australia",
    flag: "/src/assets/imgs/imgF2.png",
    site: "www.canada-supplier.com",
  },
  {
    id: 3,
    country: "United States",
    flag: "/src/assets/imgs/imgF3.png",
    site: "www.germany-supplier.com",
  },
  {
    id: 4,
    country: "Russia",
    flag: "/src/assets/imgs/imgF4.png",
    site: "www.france-supplier.com",
  },
  {
    id: 5,
    country: "Italy",
    flag: "/src/assets/imgs/imgF5.png",
    site: "www.japan-supplier.com",
  },
  {
    id: 6,
    country: "Denmark",
    flag: "/src/assets/imgs/imgF6.png",
    site: "www.australia-supplier.com",
  },
  {
    id: 7,
    country: "France",
    flag: "/src/assets/imgs/imgF7.png",
    site: "www.brazil-supplier.com",
  },
  {
    id: 8,
    country: "Palestine",
    flag: "/src/assets/imgs/imgF8.png",
    site: "https://www.palestine-supplier.com",
  },
  {
    id: 9,
    country: "China",
    flag: "/src/assets/imgs/imgF9.png",
    site: "www.china-supplier.com",
  },
  {
    id: 10,
    country: "Great Britain",
    flag: "/src/assets/imgs/imgF10.png",
    site: "www.uk-supplier.com",
  },
];

const HomeSuppliers = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, // No arrows for a cleaner look
  };

  return (
    <div className="home_suppliers w-full rounded-lg mb-2 md:m-0">
      <h2 className="mb-6 px-4 md:p-0">Suppliers by Region</h2>

      {/* Mobile view - Swipeable carousel */}
      <div className="md:hidden  ">
        <Slider {...settings}>
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="flex justify-center  ">
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
                {/* Flag and Country Name */}
                <div className="flex items-center mb-2">
                  <img
                    src={supplier.flag}
                    alt={supplier.country}
                    className="w-14 h-8 mr-3 object-cover"
                  />
                  <h3 className="text-lg md:text-2xl font-semibold">
                    {supplier.country}
                  </h3>
                </div>

                {/* Supplier Site - Clickable Link */}
                <p className="text-sm md:text-lg text-gray-600 mt-2">
                  <a
                    href={`https://${supplier.site}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:underline"
                  >
                    {supplier.site}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Desktop view - grid layout */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="flex flex-col bg-white p-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
          >
            {/* Flag and Country Name */}
            <div className="flex items-center mb-2">
              <img
                src={supplier.flag}
                alt={supplier.country}
                className="w-14 h-8 mr-3 object-cover"
              />
              <h3 className="text-lg md:text-2xl font-semibold">
                {supplier.country}
              </h3>
            </div>

            {/* Supplier Site - Clickable Link */}
            <p className="text-sm md:text-lg text-gray-600 mt-2">
              <a
                href={`https://${supplier.site}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:underline"
              >
                {supplier.site}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSuppliers;
