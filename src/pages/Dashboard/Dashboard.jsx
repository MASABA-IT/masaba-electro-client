import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import defaultProfile from "../../assets/imgs/fake_profile.jpg";
import {
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaSave,
  FaLock,
  FaSignOutAlt,
  FaEdit,
  FaAddressCard,
  FaTimes,
  FaBars,
  FaChevronRight,
} from "react-icons/fa"; // Import icons from react-icons
import { useProductStore } from "../../providers/AppProviders";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
import ChangePasswordSection from "../../components/ChangePasswordSection/ChangePasswordSection";
import UserAddressSection from "../../components/UserAddressSection/UserAddressSection";
import AddAddressModal from "../../components/AddAddressModal/AddAddressModal";
import Swal from "sweetalert2";
import { IoMdSettings } from "react-icons/io";
import { MdPageview } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import ReviewModal from "../../components/ReviewModal/ReviewModal";
// import WishlistProducts from "../WishlistProducts/WishlistProducts";

const Dashboard = () => {
  const {
    BASE_URL,
    userData,
    handleLogout,
    billingAddress,
    showModal,
    setShowModal,
    editAddress,
    setEditAddress,
    fetchOrderList,
    clientOrders,
    getStatusColor,
  } = useProductStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const { orders, profile, index } = useParams();

  const menuItems = [
    { name: "Profile", icon: <FaUser />, section: "profile" },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      section: "orders",
    },
    {
      name: "Your Address",
      icon: <FaAddressCard />,
      section: "address",
    },
    // {
    //   name: "Saved Data",
    //   icon: <FaSave />,
    //   section: "saved-data",
    // },
    {
      name: "Change Password",
      icon: <FaLock />,
      section: "change-password",
    },
  ];

  const { section } = useParams();

  const validSections = menuItems.map((item) => item.section);

  const isValidSection = validSections.includes(section);

  const [selectedSection, setSelectedSection] = useState(
    isValidSection ? section : "profile"
  );

  const user = userData?.user;
  const profileData = userData?.profile?.data;

  const data =
    profileData?.name &&
    profileData?.address &&
    profileData &&
    Object.keys(profileData).length > 0
      ? profileData
      : user;

  const navigate = useNavigate();
  const [name, setName] = useState(data?.name);
  const [email, setEmail] = useState(data?.email);
  const [phone, setPhone] = useState(
    data?.phone ? data?.phone : profileData?.phone_number
  );
  const [address, setAddress] = useState(
    data?.address ? data?.address : profileData?.address || ""
  );

  const [profileImg, setProfileImg] = useState(
    data?.image || userData?.profile?.data?.image
      ? `${BASE_URL}/${data?.image || userData?.profile?.data?.image}`
      : defaultProfile
  );

  const [image, setImage] = useState(profileImg);

  const token = userData?.token;
  useEffect(() => {
    const shouldShowPopup = localStorage.getItem("showLoginSuccess");

    if (shouldShowPopup === "true") {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        html: `
        <div style="font-size: 18px; font-weight: 600;">
          Login successful! 🎉<br/>
          <span style="font-size: 15px; font-weight: 400;">Welcome to your dashboard.</span>
        </div>
      `,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: "custom-popup",
        },
      });

      localStorage.removeItem("showLoginSuccess");
    }
  }, []);
  useEffect(() => {
    if (orders && index) {
      setSelectedSection(orders);
      setActiveIndex(Number(index));
      if (orders === "orders") {
        fetchOrderList();
      }
      // if (orders !== "profile") {
      // }
    }
  }, [orders, index]);
  const handleMenuClick = (section, index) => {
    setSelectedSection(section);
    setActiveIndex(index);
    if (section === "orders") {
      fetchOrderList();
    }
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${BASE_URL}/api/change-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // console.log(result.data?.imageUrl, "result.data?.imageUrl");
        setImage(result.image || URL.createObjectURL(file));

        if (userData) {
          const updatedUserData = {
            ...userData,

            profile: {
              ...(userData.profile || {}),

              data: {
                ...(userData.profile?.data || {}),
                image: result.image,
              },
            },
          };

          // Save the updated user data back to localStorage
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
        }

        alert("Profile image updated!");
        window.location.reload();
      } else {
        console.error("Image update failed ❌", result);
        alert(result.message || "Failed to update image.");
      }
    } catch (error) {
      console.error("Error uploading image ❌", error);
      alert("Something went wrong while uploading image.");
    }
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById("profileImageInput");

    fileInput.click();
  };
  const handleButtonClick = () => {
    if (userData?.token) {
      navigate("/dashboard");
      handleLogout(navigate);
    } else {
      navigate("/login");
    }
  };

  // const handleSaveProfile = (
  //   newName,
  //   newEmail,
  //   newPhone,
  //   newAddress,
  //   newProfileImg
  // ) => {
  //   setName(newName);
  //   setEmail(newEmail);
  //   setPhone(newPhone);
  //   setAddress(newAddress);
  //   setProfileImg(newProfileImg);
  //   console.log(name, email, phone, newAddress, newProfileImg);
  //   alert("Profile Updated!");
  // };
  const [userAddresses, setUserAddresses] = useState([]);
  useEffect(() => {
    if (billingAddress) {
      setUserAddresses(billingAddress);
    }
  }, [billingAddress]);

  const [selectedAddress, setSelectedAddress] = useState(
    userAddresses[0]?.id || null
  );
  // const [showModal, setShowModal] = useState(false);
  // const [editAddress, setEditAddress] = useState(null);

  // To Add New
  const handleAddNew = () => {
    setEditAddress(null);
    setShowModal(true);
  };

  // To Edit
  const handleEdit = (address) => {
    setEditAddress(address);
    setShowModal(true);
  };

  const handleSaveAddress = (newAddress) => {
    setUserAddresses((prev) => [...prev, newAddress]);
    setSelectedAddress(newAddress.id);
  };

  const handleDeleteAddress = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (!confirmed) return;

    setUserAddresses((prev) => prev.filter((addr) => addr.id !== id));
    if (selectedAddress === id) {
      setSelectedAddress(null);
    }
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    console.log("click");
    setIsSidebarOpen(!isSidebarOpen);
  };
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  // Function to open and close the modal
  const toggleModal = (orderID = null) => {
    setIsModalOpen(!isModalOpen);
    setSelectedOrderId(orderID);
  };
  const canReview = (orderStatus) => orderStatus === "Delivered";
  const submitReview = async (formData) => {
    const response = await fetch(`${BASE_URL}/api/review`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to submit review");
    }

    return await response.json();
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  return (
    <div className="dashboard__content relative">
      <button
        onClick={toggleSidebar}
        className={` absolute left-8 top-8 text-4xl text-amber-700 sm:hidden z-10 ${
          orders === "profile" ? "block" : "hidden"
        }`}
      >
        <IoMdSettings className="rounded-full backdrop-blur-sm bg-transparent  " />
      </button>
      {/* Left Side: Profile Info */}
      <div className="dashboard_left-listArea bg-white relative hidden md:block">
        <div className="profile-info p-4">
          {/* Title */}
          <h2 className="text-2xl font-bold">Profile</h2>

          {/* Flex Container for Image and Profile Details */}
          <div className="flex gap-4 mt-4">
            {/* Profile Image (Left 50%) */}

            <img
              src={profileImg} // Default image if none uploaded
              alt="Profile"
              className="rounded-full w-28 h-28"
            />

            {/* Profile Name and Email (Right 50%) */}
            <div className="w-full flex-1 flex flex-col justify-center items-start p-2  ">
              <p className="text-xl text-gray-600">Hello</p>
              <h2 className="text-2xl font-bold">{name}</h2>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="w-full   h-[350px]  flex   items-center flex-col p-4 gap-4 overflow-y-auto ">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMenuClick(item.section, index)}
              className={`w-full dashboard_btnarea text-2xl text-gray-600 p-4 rounded flex items-center gap-x-6 duration-75 
                ${
                  activeIndex === index
                    ? "bg-blue-300 text-white"
                    : "hover:bg-blue-100"
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        <button
          onClick={handleButtonClick}
          className="w-full bg-gray-500 hover:bg-blue-400 duration-75 text-2xl text-white p-4 rounded  absolute bottom-0"
        >
          Logout
        </button>
      </div>
      {/* Mobile Sidebar */}
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`md:hidden pt-10 fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 relative">
          {/* ❌ Close Button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-red-500"
          >
            <FaTimes />
          </button>

          <h2 className="text-2xl font-bold mb-4">Menu</h2>

          <div className="mt-6 flex flex-col gap-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(item.section, index)}
                className={`flex items-center text-gray-700 gap-3 text-xl p-3 rounded transition
            ${
              activeIndex === index
                ? "bg-blue-300 text-white"
                : "hover:bg-blue-100"
            }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-2xl mt-8 bg-gray-600 hover:bg-blue-400 text-white p-3 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Right Side: Editable Profile or Other Sections */}
      <div className={`dashboard_right-profileArea bg-white p-10 rounded-lg `}>
        {/* Conditional Rendering Based on Selected Section */}
        {selectedSection === "profile" && (
          <ProfileSection
            image={image}
            name={name}
            email={email}
            phone={phone}
            address={address}
            handleImageClick={handleImageClick}
            handleImageUpload={handleImageUpload}
            //onSave={handleSaveProfile}
          />
        )}

        {selectedSection === "orders" && (
          <div className="py-10 ">
            <h3 className="text-2xl mb-4 ">Orders</h3>

            <div className="flex flex-col sm:flex-row sm:justify-between ">
              <p>Your orders will be displayed here.</p>
              {clientOrders.length > 0 && (
                <p>Total Orders: {clientOrders.length}</p>
              )}
            </div>
            {isLoading ? (
              <div className="space-y-4 p-4">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="border rounded p-4 shadow-sm bg-white animate-pulse space-y-3"
                  >
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="flex justify-between mt-4">
                      <div className="h-6 bg-gray-300 rounded w-20"></div>
                      <div className="h-6 bg-gray-300 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              clientOrders?.length > 0 && (
                <div className="orders-list space-y-4 p-4 max-h-[400px] overflow-y-auto">
                  {clientOrders.map((order) => (
                    <div
                      key={order.id}
                      className="order-card border rounded p-4 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white"
                    >
                      <div className="w-full sm:w-1/2">
                        <div>
                          {" "}
                          <p>
                            <strong>Order ID:</strong> #{order.id}
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            <span
                              className={`font-semibold text-2xl ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </p>
                          <p>
                            <strong>Payment Method:</strong>{" "}
                            {order.payment_method}
                          </p>
                          <div className="flex">
                            <button
                              onClick={() => toggleModal(order.id)}
                              className="flex justify-center items-center gap-x-2 text-xl  sm:text-2xl border-2 px-2 py-1 bg-blue-500 text-white rounded-xl"
                            >
                              <CiViewList className="text-2xl sm:text-3xl text-white" />
                              <span>Views</span>
                            </button>
                            {canReview(order.status) && (
                              <ReviewModal
                                orderId={order.id}
                                orderDetails={order.order_details}
                                userData={userData}
                                BASE_URL={BASE_URL}
                                onReviewSubmit={submitReview}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:w-1/2 text-left sm:text-right space-y-1">
                        <div className="flex justify-between sm:justify-end gap-2 sm:gap-4 text-xl">
                          <span className="text-gray-500 font-medium">
                            Subtotal:
                          </span>
                          <span className="font-semibold text-gray-700">
                            ৳ {order.sub_total}
                          </span>
                        </div>
                        <div className="flex justify-between sm:justify-end gap-2 sm:gap-4 text-xl">
                          <span className="text-gray-500 font-medium">
                            Delivery:
                          </span>
                          <span className="text-gray-700">
                            + ৳ {order.delivery_charge}
                          </span>
                        </div>
                        <div className="border-t pt-1 mt-1 flex justify-between sm:justify-end gap-2 sm:gap-4 text-2xl">
                          <span className="text-gray-600 font-bold">
                            Total:
                          </span>
                          <span className="text-2xl font-bold text-green-600">
                            ৳ {order.total_amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* {clientOrders && (
              <div className="orders-list space-y-4 p-4 max-h-[400px] overflow-y-auto">
                {clientOrders.map((order) => (
                  <div
                    key={order.id}
                    className="order-card border rounded p-4 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white"
                  >
                    <div className="w-full sm:w-1/2">
                      <div>
                        {" "}
                        <p>
                          <strong>Order ID:</strong> #{order.id}
                        </p>
                        <p>
                          <strong>Status:</strong>{" "}
                          <span
                            className={`font-semibold text-2xl ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </p>
                        <p>
                          <strong>Payment Method:</strong>{" "}
                          {order.payment_method}
                        </p>
                        <div className="flex">
                          <button
                            onClick={() => toggleModal(order.id)}
                            className="flex justify-center items-center gap-x-2 text-xl  sm:text-2xl border-2 px-2 py-1 bg-blue-500 text-white rounded-xl"
                          >
                            <CiViewList className="text-2xl sm:text-3xl text-white" />
                            <span>Views</span>
                          </button>
                          {canReview(order.status) && (
                            <ReviewModal
                              orderId={order.id}
                              orderDetails={order.order_details}
                              userData={userData}
                              BASE_URL={BASE_URL}
                              onReviewSubmit={submitReview}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2 text-left sm:text-right space-y-1">
                      <div className="flex justify-between sm:justify-end gap-2 sm:gap-4 text-xl">
                        <span className="text-gray-500 font-medium">
                          Subtotal:
                        </span>
                        <span className="font-semibold text-gray-700">
                          ৳ {order.sub_total}
                        </span>
                      </div>
                      <div className="flex justify-between sm:justify-end gap-2 sm:gap-4 text-xl">
                        <span className="text-gray-500 font-medium">
                          Delivery:
                        </span>
                        <span className="text-gray-700">
                          + ৳ {order.delivery_charge}
                        </span>
                      </div>
                      <div className="border-t pt-1 mt-1 flex justify-between sm:justify-end gap-2 sm:gap-4 text-2xl">
                        <span className="text-gray-600 font-bold">Total:</span>
                        <span className="text-2xl font-bold text-green-600">
                          ৳ {order.total_amount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )} */}
          </div>
        )}
        {selectedSection === "address" && (
          <div className="checkout_content">
            <UserAddressSection //  addresses={userAddresses}
              addresses={Array.isArray(userAddresses) ? userAddresses : []}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              onAddNew={handleAddNew}
              handleEdit={handleEdit}
              onDeleteAddress={handleDeleteAddress}
            />

            {/* Modal logic (conditionally rendered form, etc.) */}
            {showModal && (
              <AddAddressModal
                defaultAddress={editAddress}
                onClose={() => setShowModal(false)}
                onSave={handleSaveAddress}
              />
            )}
          </div>
        )}

        {/* {selectedSection === "wishlist" && <WishlistProducts />} */}

        {selectedSection === "saved-data" && (
          <div>
            <h3 className="text-xl mb-4">Saved Data</h3>
            <p>Your saved data will be displayed here.</p>
          </div>
        )}

        {selectedSection === "change-password" && <ChangePasswordSection />}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto relative">
            <h2 className="text-2xl font-semibold mb-4">Order Products</h2>

            {/* Filter and display products */}
            {clientOrders
              ?.filter((order) => order.id === selectedOrderId)
              ?.map((order) => (
                <div key={order.id} className="space-y-4">
                  {order.order_details.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border rounded-md p-3 shadow-sm"
                    >
                      <img
                        src={` ${BASE_URL}/${item.product.thumbnail}`}
                        alt={item.product.title}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <div>
                        <h3 className="font-semibold">{item.product.title}</h3>
                        <p className="text-gray-700">Price: ৳{item.price}</p>
                        <p className="text-gray-700">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

            {/* Close Modal Button */}
            <button
              onClick={() => toggleModal()}
              className="absolute top-2 right-4 text-4xl text-gray-600 hover:text-black"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
