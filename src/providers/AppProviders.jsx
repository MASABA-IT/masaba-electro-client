/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

// ✅ Import API Base URL from .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  //fake data next remove
  const [allData, setAllData] = useState([]);

  //1 GLOBAL STATES
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //1.1 Categories
  //loading, error
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/categories`);
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  //1.2 Categories
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/collection/with/all-products`);

        if (!res.ok) {
          throw new Error("Failed to fetch collections");
        }
        const data = await res.json();
        setCollections(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching collections:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  //  end
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

  const appInfo = {
    BASE_URL,
    allData,
    loading,
    filterSingleProduct,
    categories,
    collections,
  };
  return <AppContext.Provider value={appInfo}>{children}</AppContext.Provider>;
};
export const useProductStore = () => useContext(AppContext);
