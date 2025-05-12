import React, { useEffect, useState } from "react";
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
} from "react-icons/fa"; // Import icons from react-icons
import { useProductStore } from "../../providers/AppProviders";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
import ChangePasswordSection from "../../components/ChangePasswordSection/ChangePasswordSection";
import UserAddressSection from "../../components/UserAddressSection/UserAddressSection";
import AddAddressModal from "../../components/AddAddressModal/AddAddressModal";
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
  } = useProductStore();
  const [activeIndex, setActiveIndex] = useState(0);
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

  const handleMenuClick = (section, index) => {
    setSelectedSection(section);
    setActiveIndex(index);
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); // Append the image file

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

  return (
    <div className="dashboard__content ">
      {/* Left Side: Profile Info */}
      <div className="dashboard_left-listArea bg-white relative">
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

      {/* Right Side: Editable Profile or Other Sections */}
      <div className="dashboard_right-profileArea bg-gray-100 p-4 rounded-lg ">
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
          <div>
            <h3 className="text-xl mb-4">Orders</h3>
            <p>Your orders will be displayed here.</p>
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
    </div>
  );
};

export default Dashboard;
