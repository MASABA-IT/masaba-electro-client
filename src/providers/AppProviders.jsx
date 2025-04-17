/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { buildSearchQuery } from "../utils/buildSearchQuery";
import axios from "axios";

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
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //1 FILTER DATA MULTI OR SINGLE
  useEffect(() => {
    const fetchFilterData = async () => {
      setLoading(true);

      // Local fallback values
      const fallbackCategories = [];
      const fallbackBrands = [];
      const defaultPriceRanges = [
        { min: 0, max: 100 },
        { min: 101, max: 500 },
        { min: 501, max: 1000 },
        { min: 1001, max: 2000 },
      ];
      const defaultRatings = [5, 4, 3, 2, 1];
      const defaultConditions = ["New", "Used", "Refurbished"];

      try {
        const [categoryRes, brandRes] = await Promise.allSettled([
          axios.get(`${BASE_URL}/api/categories`),
          axios.get(`${BASE_URL}/api/brand/logo`),
        ]);

        const categories =
          categoryRes.status === "fulfilled"
            ? categoryRes.value.data?.categories || fallbackCategories
            : fallbackCategories;

        const brands =
          brandRes.status === "fulfilled"
            ? brandRes.value.data?.logos || fallbackBrands
            : fallbackBrands;

        const isAPIData = (data) =>
          Array.isArray(data) &&
          typeof data[0] === "object" &&
          (data[0]?.id || data[0]?.name || data[0]?.title);

        const filterData = [
          {
            key: "categories",
            name: "Categories",
            type: "list",
            multiSelect: false,
            children: { categories },
            isAPIData: isAPIData(categories), //before set
            idKey: "id",
            labelKey: "title",
          },
          {
            key: "brands",
            name: "Brands",
            type: "checkbox",
            multiSelect: true,
            children: { categories: brands },
            isAPIData: isAPIData(brands),
            idKey: "id",
            labelKey: "name",
          },
          {
            key: "priceRange",
            name: "Price Range",
            type: "range",
            multiSelect: true,
            children: defaultPriceRanges,
            isAPIData: false,
          },
          {
            key: "ratings",
            name: "Ratings",
            type: "stars",
            multiSelect: true,
            children: { categories: defaultRatings },
            isAPIData: false,
          },
          // {
          //   key: "condition",
          //   name: "Condition",
          //   type: "radio",
          //   multiSelect: false,
          //   children: { categories: defaultConditions },
          //   isAPIData: false,
          // },
        ];

        setCategories(categories);
        setFilters(filterData);
      } catch (err) {
        console.error("❌ Unexpected error in filter fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterData();
  }, []);

  console.log("filters", filters);

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
    filters,
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
