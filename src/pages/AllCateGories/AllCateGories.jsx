import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import CategoryList from "../../components/CategoryList/CategoryList";
import CategoriesItems from "../../components/CategoriesItems/CategoriesItems";
import { useProductStore } from "../../providers/AppProviders";
import { useParams } from "react-router-dom";

const AllCategories = () => {
  const { loading, fetchSearchProducts, searchCategories, selectedCategories } =
    useProductStore();

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Category", link: "/categories" },
  ];

  //next

  const { id = 1 } = useParams();

  const [categoryId, setCategoryId] = useState(null);

  // Set categoryId initially from URL param
  useEffect(() => {
    if (id) {
      setCategoryId(parseInt(id));
    }
  }, [id]);

  // Update categoryId when user selects a category
  useEffect(() => {
    if (selectedCategories?.id) {
      setCategoryId(selectedCategories?.id);
    }
  }, [selectedCategories?.id]);

  // Fetch products whenever categoryId changes
  useEffect(() => {
    if (categoryId) {
      fetchSearchProducts({
        category_id: categoryId,
      });
    }
  }, [categoryId]);

  return (
    <section className="allcategories_content">
      <Breadcrumb items={breadcrumbItems} />
      <CategoryList allData={searchCategories?.Products} />
      {loading ? (
        <div>Loading categories...</div>
      ) : (
        <CategoriesItems allData={searchCategories?.Products?.data} />
      )}
    </section>
  );
};

export default AllCategories;
