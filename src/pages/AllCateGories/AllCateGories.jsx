import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import CategoryList from "../../components/CategoryList/CategoryList";
import CategoriesItems from "../../components/CategoriesItems/CategoriesItems";

const AllCateGories = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Category", link: "/categories" },
  ];
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  return (
    <section className="allcategories_content">
      <Breadcrumb items={breadcrumbItems} />
      <CategoryList
        selectedBrands={selectedBrands}
        selectedFeatures={selectedFeatures}
        selectedRatings={selectedRatings}
        selectedCondition={selectedCondition}
        selectedPriceRange={selectedPriceRange}
        setSelectedBrands={setSelectedBrands}
        setSelectedFeatures={setSelectedFeatures}
        setSelectedRatings={setSelectedRatings}
        setSelectedCondition={setSelectedCondition}
        setSelectedPriceRange={setSelectedPriceRange}
      />
      <CategoriesItems/>
    </section>
  );
};

export default AllCateGories;
