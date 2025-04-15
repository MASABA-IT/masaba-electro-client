/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { buildSearchQuery } from "../utils/buildSearchQuery";

// ✅ Import API Base URL from .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  //fake data next remove
  const [allData, setAllData] = useState([]);

  //1 GLOBAL STATES
  const [categories, setCategories] = useState([]);
  const [searchCategories, setSearchCategories] = useState(null);
  const [collections, setCollections] = useState(null);
  const [navCollections, setNavCollections] = useState(null);
  const [dealsOffers, setDealsOffers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //1Categories
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

  //1.1 categories search
  // {{loaclUrl}}/api/product/search?category_id=3
  const fetchSearchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const query = buildSearchQuery(params);
      const res = await fetch(`${BASE_URL}/api/product/search?${query}`);
      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();
      console.log(data);
      setSearchCategories(data || data.products || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  //2 collections-with-all-products
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
  //3 Deals Offers
  useEffect(() => {
    const fetchDealsOffers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/deals-offers`);
        if (!res.ok) {
          throw new Error("Failed to fetch DealsOffers");
        }
        const data = await res.json();
        setDealsOffers(data?.dealsOffers);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching DealsOffers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDealsOffers();
  }, []);
  //4 NavCollection
  useEffect(() => {
    const fetchNavCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/collections`);

        if (!res.ok) {
          throw new Error("Failed to fetch DealsOffers");
        }
        const data = await res.json();
        setNavCollections(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching DealsOffers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNavCategories();
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
    dealsOffers,
    navCollections,
    fetchSearchProducts,
    searchCategories,
  };
  return <AppContext.Provider value={appInfo}>{children}</AppContext.Provider>;
};
export const useProductStore = () => useContext(AppContext);
