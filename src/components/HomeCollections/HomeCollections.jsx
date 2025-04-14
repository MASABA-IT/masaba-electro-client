import React from "react";
import ProductMainOffers from "../ProductMainOffers/ProductMainOffers";

import AllCollections from "../AllCollections/AllCollections";

const HomeCollections = () => {
  return (
    <div className="home_collections gap-1 xl:gap-3 ">
      <ProductMainOffers />
      <AllCollections />
    </div>
  );
};

export default HomeCollections;
