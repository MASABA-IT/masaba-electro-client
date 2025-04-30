export const updateWishlistInLocalStorage = (productId, action) => {
  const existingWishlist =
    JSON.parse(localStorage.getItem("wishlistData")) || [];

  if (action === "add") {
    const isProductAlreadyInWishlist = existingWishlist.some(
      (item) => item.product_id === productId
    );

    if (!isProductAlreadyInWishlist) {
      existingWishlist.push({ product_id: productId });
      localStorage.setItem("wishlistData", JSON.stringify(existingWishlist));
      window.dispatchEvent(new Event("wishlistUpdated"));
    }
  } else if (action === "remove") {
    const updatedWishlist = existingWishlist.filter(
      (item) => item.product_id !== productId
    );
    localStorage.setItem("wishlistData", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));
  }
};
// const updateWishlistInLocalStorage = (productId, action) => {
//   const existingWishlist =
//     JSON.parse(localStorage.getItem("wishlistData")) || [];

//   if (action === "add") {
//     const isProductAlreadyInWishlist = existingWishlist.some(
//       (item) => item.product_id === productId
//     );

//     if (!isProductAlreadyInWishlist) {
//       existingWishlist.push({ product_id: productId });
//       localStorage.setItem("wishlistData", JSON.stringify(existingWishlist));

//       // 🟢 Trigger event to notify React
//       window.dispatchEvent(new Event("wishlistUpdated"));
//     }
//   } else if (action === "remove") {
//     const updatedWishlist = existingWishlist.filter(
//       (item) => item.product_id !== productId
//     );
//     localStorage.setItem("wishlistData", JSON.stringify(updatedWishlist));

//     // 🔴 Trigger event after removal too
//     window.dispatchEvent(new Event("wishlistUpdated"));
//   }
// };
