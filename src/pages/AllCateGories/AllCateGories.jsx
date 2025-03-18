import React from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import CategoryList from "../../components/CategoryList/CategoryList";

const AllCateGories = () => {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Category", link: "/categories" },
  ];

  return (
    <section className="categories_content">
      <Breadcrumb items={breadcrumbItems} />
       <CategoryList/>
    </section>
  );
};

export default AllCateGories;
