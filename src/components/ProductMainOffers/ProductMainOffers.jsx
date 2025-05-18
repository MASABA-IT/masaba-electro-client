import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import framer-motion
import { useProductStore } from "../../providers/AppProviders";
import { useNavigate } from "react-router-dom";

// CountdownTimer Component
const CountdownTimer = ({ endDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  const updateCountdown = () => {
    const now = new Date();
    const end = new Date(endDate); // Make sure endDate is a proper Date
    const timeDiff = end - now;

    if (timeDiff <= 0) {
      setTimeRemaining("Offer has ended!");
    } else {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    }
  };

  useEffect(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  if (timeRemaining === "Offer has ended!") {
    return <div className="text-red-500 font-medium">{timeRemaining}</div>;
  }

  return (
    <div className="countdown flex gap-3 mt-2">
      <div className="countdown-box text-center">
        <p className="text-2xl font-bold">{timeRemaining?.days}</p>
        <span className="text-xs text-gray-300">Days</span>
      </div>
      <div className="countdown-box text-center">
        <p className="text-2xl font-bold">{timeRemaining?.hours}</p>
        <span className="text-xs text-gray-300">Hours</span>
      </div>
      <div className="countdown-box text-center">
        <p className="text-2xl font-bold">{timeRemaining?.minutes}</p>
        <span className="text-xs text-gray-300">Min</span>
      </div>
      <div className="countdown-box text-center">
        <p className="text-2xl font-bold">{timeRemaining?.seconds}</p>
        <span className="text-xs text-gray-300">Sec</span>
      </div>
    </div>
  );
};

// MainOffer Component
const MainOffer = ({ offer }) => {
  const isLoading = !offer;
  return (
    <motion.div
      className="main-offer-left"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {isLoading ? (
        // FAKE
        <div className="animate-pulse">
          <div className="h-8 w-1/2 bg-gray-300 rounded mb-3" />
          <div className="h-6 w-2/3 bg-gray-300 rounded mb-2" />
          <div className="h-6 w-1/3 bg-gray-300 rounded mb-6" />

          <div className="h-5 w-40 bg-gray-300 rounded mb-2" />
          <div className="h-8 w-32 bg-gray-300 rounded" />
        </div>
      ) : (
        // ✅ Real
        <>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Deals and Offers
            </h2>
            <p className="text-xl md:text-2xl text-gray-600">{offer.title}</p>
            <p className="text-xl md:text-2xl">{offer.subtitle}</p>
          </div>
          <div className="countdown-timer mt-4">
            <h3 className="text-xl font-semibold text-gray-600">
              Time Left for Offer:
            </h3>
            <CountdownTimer endDate={offer.expire} />
          </div>
        </>
      )}
    </motion.div>
  );
};

// OfferItem Component
const OfferItem = ({ item }) => {
  const { BASE_URL } = useProductStore();
  const base = parseFloat(item.product.base_price);
  const discount = parseFloat(item.product.discount_price);
  const discountPercent = ((base - discount) / base) * 100;
  const navigate = useNavigate();
  // State to track when the image has finished loading
  const [imageLoaded, setImageLoaded] = useState(!item);

  const handleProductClick = () => {
    navigate(`/categories/product/${item?.product_id}`);
  };
  return (
    <motion.div
      key={item.id}
      className="offer-box p-4 bg-white rounded cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onClick={handleProductClick}
    >
      <div className="offer-image relative overflow-hidden w-full h-48 rounded">
        {/* Skeleton loader overlay for the image */}
        {!imageLoaded && (
          <div className="absolute  inset-0 bg-gray-300 animate-pulse" />
        )}
        <img
          src={`${BASE_URL}/${item.product.thumbnail}`}
          alt={item.product.title}
          onLoad={() => setImageLoaded(true)}
          className={`transition duration-700 ease-in-out w-full h-full object-cover ${
            !imageLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      <div className="offer-details flex flex-col justify-center items-center mt-4">
        {/* Conditional rendering for text placeholder */}
        {!imageLoaded ? (
          <div className="w-full flex flex-col items-center">
            <div className="bg-gray-300 h-6 w-3/4 my-2 animate-pulse rounded"></div>
            <div className="bg-gray-300 h-4 w-1/2 my-2 animate-pulse rounded"></div>
          </div>
        ) : (
          <>
            <h4 className="text-2xl font-medium text-gray-800">
              {item.product.title}
            </h4>
            <p className="bg-red-100 min-w-28 py-3 px-10 flex justify-center items-center rounded-full text-red-500 font-bold text-sm text-center">
              {discountPercent.toFixed(0)}%
              <span className="text-sm text-zinc-700 xl:mt-4">&nbsp;OFF</span>
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
};

// Main ProductMainOffers Component
const ProductMainOffers = () => {
  const { dealsOffers } = useProductStore();
  if (!dealsOffers || !dealsOffers.deals_offers_products) {
    return <div className="min-h-[300px]"></div>;
  }

  return (
    <motion.div className="product-main-offers">
      <MainOffer offer={dealsOffers} />
      <div className="main-offer-right">
        {dealsOffers?.deals_offers_products.slice(0, 5).map((item) => (
          <OfferItem key={item.id} item={item} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProductMainOffers;
