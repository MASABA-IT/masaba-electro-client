/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { buildSearchQuery } from "../utils/buildSearchQuery";
import axios from "axios";

// ✅ Import API Base URL from .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  //fake data next remove
  const [productData, setProductData] = useState(null);

  const [isLiked, setIsLiked] = useState(false);
  //1 GLOBAL STATES
  const [categories, setCategories] = useState([]);
  const [showWishlist, setShowWishlist] = useState([]);
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cartData")) || []
  );
  const [searchCategories, setSearchCategories] = useState(null);
  const [collections, setCollections] = useState(null);
  const [navCollections, setNavCollections] = useState(null);
  const [dealsOffers, setDealsOffers] = useState(null);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //////////////////
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: 0,
    max: 5000,
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [reset, setReset] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [recentlyViewsData, setRecentlyViewsData] = useState(null);
  ///LOGIN&SIGNUP
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [userData, setUserData] = useState(null);

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

  //1.1 categories search
  // {{loaclUrl}}/api/product/search?category_id=3
  const fetchSearchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const query = buildSearchQuery(params);
      const res = await fetch(`${BASE_URL}/api/product/search?${query}`);
      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();

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
  const fetchProductById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/product/view/${id}`);
      const data = await response.json();
      setProductData(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };
  ///////////////
  /////// Comments
  const postComment = async ({
    product_id,
    username,
    phone_number,
    email,
    comment,
  }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/product/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product_id,
          username,
          phone_number,
          email,
          comment,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to post comment");
      }

      const result = await response.json();
      return result; // You can handle this in your UI
    } catch (error) {
      console.error("Error posting comment:", error.message);
      throw error; // Let the caller handle the error
    }
  };
  ///////////////
  /////// Recently Views Data

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(stored.map(Number));
  }, []);

  // Add productId to recentlyViewed
  const addToRecentlyViewed = (productId) => {
    // Remove the productId if it already exists to avoid duplicates
    const updated = recentlyViewed.filter((id) => id !== productId);

    // Add the new productId to the front of the array
    updated.unshift(productId);

    // Limit the array to 5 productIds only
    if (updated.length > 6) updated.length = 6;

    // Only update the state if the array has changed
    if (JSON.stringify(updated) !== JSON.stringify(recentlyViewed)) {
      setRecentlyViewed(updated);
    }
  };

  // Update localStorage whenever recentlyViewed changes
  useEffect(() => {
    if (recentlyViewed.length) {
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }
  }, [recentlyViewed]);
  // Send data to API whenever recentlyViewed changes
  useEffect(() => {
    const updateRecentlyViewedData = async () => {
      if (recentlyViewed.length) {
        try {
          const response = await fetch(`${BASE_URL}/api/recent-product/view`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: recentlyViewed }), // Send the updated array
          });

          if (response.ok) {
            const result = await response.json();

            setRecentlyViewsData(result);
          } else {
            console.error("Failed to update recently viewed products.");
          }
        } catch (error) {
          console.error("Error while sending recently viewed data:", error);
        }
      }
    };

    updateRecentlyViewedData();
  }, [recentlyViewed]);
  ////FILTER SINGLE PRODUCT VIEWS
  // Filter function that accepts only ID, category (single string), and condition
  function filterSingleProduct(allData, selectedFilters) {
    // const { products } = allData;
    // const { id } = selectedFilters;
    // // const { id, category, condition } = selectedFilters;
    // console.log(products, id);
    // return products.filter((product) => {
    //   // Filter by category (single string match)
    //   // if (category && product.category !== category) {
    //   //   return false;
    //   // }
    //   // Filter by condition
    //   // if (condition && product.condition !== condition) {
    //   //   return false;
    //   // }
    //   // Filter by ID
    //   if (id && product.id !== id) {
    //     return false;
    //   }
    //   return true;
    // });
  }
  //USER-DATA-SET
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);
  //LOgOut
  const handleLogout = async (navigate) => {
    try {
      console.log(userData?.token, "token");
      const response = await fetch(`${BASE_URL}/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userData?.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Logout successful ✅");
      } else {
        console.warn("Logout request failed, but clearing local data anyway.");
      }
    } catch (error) {
      console.error("Logout error ❌:", error);
    } finally {
      localStorage.removeItem("userData");
      setUserData(null);
      if (navigate) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  useEffect(() => {
    const syncWishlistFromLocalStorage = () => {
      const wishlistData =
        JSON.parse(localStorage.getItem("wishlistData")) || [];

      if (wishlistData.length > 0) {
        const url = `${BASE_URL}/api/wishlist/products`;
        const data = { product_ids: wishlistData };

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            setShowWishlist(data.products);
          })
          .catch((error) => {
            console.error("Error syncing wishlist:", error);
          });
      } else {
        setShowWishlist([]);
      }
    };

    // Custom event শুনো
    window.addEventListener("wishlistUpdated", syncWishlistFromLocalStorage);

    // একবার রান করাও পেজ লোডে
    syncWishlistFromLocalStorage();

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        syncWishlistFromLocalStorage
      );
    };
  }, []);
  ///////////////
  //////CARTDATA

  // 1) Initialize from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartData");
    return stored ? JSON.parse(stored) : [];
  });

  // 2) Keep localStorage in sync whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartItems));
  }, [cartItems]);
  // 3) Add to cart (if not already there, qty=1)
  const createCartItem = (product, qty = 1) => ({
    id: product.id,
    title: product.title,
    image: product.thumbnail,
    price: product.base_price,
    quantity: qty,
    subtotal: product.subtotal,
  });

  // Add or update product in cart
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.id === product.id);
      const price = parseFloat(product.price); // Ensure numeric
      const itemSubtotal = price * qty;

      if (index !== -1) {
        const updated = [...prev];
        const existingItem = updated[index];
        const newQty = existingItem.quantity + qty;

        const newSubtotal =
          parseFloat(existingItem.subtotal || 0) + itemSubtotal;

        updated[index] = {
          ...existingItem,
          quantity: newQty,
          subtotal: newSubtotal.toFixed(2),
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          image: product.image,
          price: price.toFixed(2),
          quantity: qty,
          subtotal: itemSubtotal.toFixed(2),
        },
      ];
    });
  };

  // Update cart item (e.g., from another page)
  const updateCartItem = (id, changes = {}) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...changes, subtotal: changes.price * changes.quantity }
          : item
      )
    );
  };

  // Remove item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // function updateCartItem(productId, updates) {
  //   setCartItems((prev) => {
  //     const index = prev.findIndex((item) => item.id === productId);
  //     if (index === -1) return prev;

  //     const updatedCart = [...prev];
  //     const existing = updatedCart[index];
  //     const updatedItem = createCartItem(
  //       { ...existing },
  //       { ...existing, ...updates }
  //     );

  //     updatedCart[index] = updatedItem;
  //     localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  //     return updatedCart;
  //   });
  // }

  //HANDLE LOGIN
  console.log(cartItems, "cartItems");
  const appInfo = {
    BASE_URL,
    loading,
    filterSingleProduct,
    filters,
    categories,
    collections,
    dealsOffers,
    navCollections,
    fetchSearchProducts,
    searchCategories,
    // filter//
    selectedCategories,
    setSelectedCategories,
    selectedBrands,
    setSelectedBrands,
    selectedFeatures,
    setSelectedFeatures,
    selectedRatings,
    setSelectedRatings,
    selectedCondition,
    setSelectedCondition,
    selectedPriceRange,
    setSelectedPriceRange,
    selectedItems,
    setSelectedItems,
    reset,
    setReset,
    productData,
    setProductData,
    fetchProductById,
    postComment,
    //recently viewd
    recentlyViewed,
    addToRecentlyViewed,
    recentlyViewsData,
    //LOGIN&PASS
    formData,
    setFormData,
    userData,
    setUserData,
    handleLogout,
    //showWishlist
    showWishlist,
    //cart-data
    cartData,
    addToCart,
    updateCartItem,
    removeFromCart,
    createCartItem,
    cartItems,
  };
  return <AppContext.Provider value={appInfo}>{children}</AppContext.Provider>;
};
export const useProductStore = () => useContext(AppContext);
