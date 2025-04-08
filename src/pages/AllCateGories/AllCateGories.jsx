import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import CategoryList from "../../components/CategoryList/CategoryList";
import CategoriesItems from "../../components/CategoriesItems/CategoriesItems";
import { useProductStore } from "../../providers/AppProviders";

const AllCategories = () => {
  const { allData, loading } = useProductStore();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: 0,
    max: 5000,
  });

  const [reset, setReset] = useState(false);
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Category", link: "/categories" },
  ];

  return (
    <section className="allcategories_content">
      <Breadcrumb items={breadcrumbItems} />
      <CategoryList
        selectedCategories={selectedCategories}
        selectedBrands={selectedBrands}
        selectedFeatures={selectedFeatures}
        selectedRatings={selectedRatings}
        selectedPriceRange={selectedPriceRange}
        selectedCondition={selectedCondition}
        setSelectedCategories={setSelectedCategories}
        setSelectedBrands={setSelectedBrands}
        setSelectedFeatures={setSelectedFeatures}
        setSelectedRatings={setSelectedRatings}
        setSelectedCondition={setSelectedCondition}
        setSelectedPriceRange={setSelectedPriceRange}
        reset={reset}
        setReset={setReset}
        allData={allData}
      />
      {loading ? (
        <div>Loading categories...</div>
      ) : (
        <CategoriesItems
          allData={allData}
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          selectedFeatures={selectedFeatures}
          selectedRatings={selectedRatings}
          selectedPriceRange={selectedPriceRange}
          selectedCondition={selectedCondition}
          setReset={setReset}
        />
      )}
    </section>
  );
};

export default AllCategories;
