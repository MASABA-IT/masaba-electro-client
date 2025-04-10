import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import framer-motion

// CountdownTimer Component
const CountdownTimer = ({ endDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Function to update the countdown every second
  const updateCountdown = () => {
    const now = new Date();
    const timeDiff = endDate ? endDate - now : 0;

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
    updateCountdown(); // Initial countdown
    const interval = setInterval(updateCountdown, 1000); // Update countdown every second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [endDate]);

  if (timeRemaining === "Offer has ended!") {
    return <div>{timeRemaining}</div>;
  }

  return (
    <div className="countdown">
      <div className="countdown-box">
        <p>{timeRemaining?.days}</p>
        <span>Days</span>
      </div>
      <div className="countdown-box">
        <p>{timeRemaining?.hours}</p>
        <span>Hour</span>
      </div>
      <div className="countdown-box">
        <p>{timeRemaining?.minutes}</p>
        <span>Min</span>
      </div>
      <div className="countdown-box">
        <p>{timeRemaining?.seconds}</p>
        <span>Sec</span>
      </div>
    </div>
  );
};

// MainOffer Component
const MainOffer = ({ offer }) => (
  <motion.div
    className="main-offer-left"
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <div>
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
        {offer?.title}
      </h2>
      <p className="text-xl md:text-2xl">{offer?.subtitle}</p>
    </div>
    {/* <div className="countdown-timer">
      <h3 className="text-xl font-semibold">Time Left for Offer:</h3>
      <CountdownTimer endDate={offer?.countdownEndDate} />
    </div> */}
  </motion.div>
);

// OfferItem Component
const OfferItem = ({ item }) => (
  <motion.div
    key={item.id}
    className="offer-box"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="offer-image ">
      <img src={item.imageUrl} alt={item.title} />
    </div>
    <div className="offer-details flex flex-col justify-center items-center">
      <h4 className="text-2xl font-medium">{item.title}</h4>
      <p className="bg-red-100 w-24 px-3 rounded-full">-{item.discount}</p>
    </div>
  </motion.div>
);

// Main ProductMainOffers Component
const ProductMainOffers = () => {
  const [offersData, setOffersData] = useState([]);

  useEffect(() => {
    setOffersData([
      {
        id: 1,
        title: "Deals and Offers",
        subtitle: "Hygiene equipments",
        countdownEndDate: new Date("2025-03-20T00:00:00"), // Example end date
        items: [
          {
            id: 1,
            title: "New Collection",
            discount: "10%",
            imageUrl: "../../src/assets/imgs/img.png",
          },
          {
            id: 2,
            title: "Winter Sale",
            discount: "15%",
            imageUrl: "../../src/assets/imgs/img1.png",
          },
          {
            id: 3,
            title: "Summer Essentials",
            discount: "25%",
            imageUrl: "../../src/assets/imgs/img2.png",
          },
          {
            id: 4,
            title: "Summer Essentials",
            discount: "25%",
            imageUrl: "../../src/assets/imgs/img3.png",
          },
          {
            id: 5,
            title: "Summer Essentials",
            discount: "25%",
            imageUrl: "../../src/assets/imgs/img4.png",
          },
          {
            id: 6,
            title: "Summer Essentials",
            discount: "25%",
            imageUrl: "../../src/assets/imgs/img4.png",
          },
        ],
      },
    ]);
  }, []);

  return (
    <motion.div
      className="product-main-offers shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Display the first offer and its countdown */}
      <MainOffer offer={offersData[0]} />

      <div className="main-offer-right">
        {offersData[0]?.items.map((item) => (
          <OfferItem key={item.id} item={item} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProductMainOffers;
