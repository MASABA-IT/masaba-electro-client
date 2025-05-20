import React, { useEffect, useState } from "react";
import ProductMainOffers from "../ProductMainOffers/ProductMainOffers";

import AllCollections from "../AllCollections/AllCollections";

const HomeCollections = ({ collectionsRef }) => {
  // const [initialLoading, setInitialLoading] = useState(true);

  return (
    <div className="home_collections gap-1 xl:gap-3 " ref={collectionsRef}>
      <ProductMainOffers />
      <AllCollections />
    </div>
  );
};

export default HomeCollections;
