/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  ///////////////
  ///////ALL DATA
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/src/data/categories.json");
        const data = await response.json();

        setAllData(data);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  ////////////
  ////FILTER SINGLE PRODUCT VIEWS
  // Filter function that accepts only ID, category (single string), and condition
  function filterSingleProduct(allData, selectedFilters) {
    
    const { products } = allData;
    const { id, category, condition } = selectedFilters;

    return products.filter((product) => {
      // Filter by category (single string match)
      if (category && product.category !== category) {
        return false;
      }

      // Filter by condition
      if (condition && product.condition !== condition) {
        return false;
      }

      // Filter by ID
      if (id && product.id !== id) {
        return false;
      }

      return true;
    });
  }

  const appInfo = { allData, loading, filterSingleProduct };
  return <AppContext.Provider value={appInfo}>{children}</AppContext.Provider>;
};
export const useProductStore = () => useContext(AppContext);
