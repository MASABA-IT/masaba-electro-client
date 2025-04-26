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

  const { id } = useParams();
  const [categoryId, setCategoryId] = useState(() => {
    return id ? parseInt(id) : 1;
  });

  // If selected category changes from UI, override categoryId
  useEffect(() => {
 
    if (!id && selectedCategories?.id && selectedCategories.id !== categoryId) {
      setCategoryId(selectedCategories.id);
    } else if (selectedCategories?.id && selectedCategories.id !== categoryId) {
      setCategoryId(selectedCategories.id);
    }
  }, [selectedCategories, id]);

  // Fetch products when categoryId changes
  useEffect(() => {
    if (categoryId) {
      fetchSearchProducts({ category_id: categoryId });
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
