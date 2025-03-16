import React from "react";
import ProductMainOffers from "../ProductMainOffers/ProductMainOffers";

import AllCollections from "../AllCollections/AllCollections";

const HomeCollections = () => {
    
  return (
    <div className="home_collections">
      <ProductMainOffers />
      <AllCollections />
    </div>
  );
};

export default HomeCollections;
