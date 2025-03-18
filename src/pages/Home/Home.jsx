import React from "react";

import Hero from "../../components/Home_Hero/Hero";
import HomeCollections from "../../components/HomeCollections/HomeCollections";
import HomeEmail from "../../components/HomeEmail/HomeEmail";
import HomeRecommendedItems from "../../components/HomeRecommendedItems/HomeRecommendedItems";
import HomeExtraServices from "../../components/HomeExtraServices/HomeExtraServices";
import HomeSuppliers from "../../components/HomeSuppliers/HomeSuppliers";

const Home = () => {
  return (
    <div className="home_content">
      <Hero />
      <HomeCollections />
      <HomeEmail />
      <HomeRecommendedItems />
      <HomeExtraServices />
      <HomeSuppliers />
    </div>
  );
};

export default Home;
