import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/imgs/fake_profile.jpg";
import {
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaSave,
  FaLock,
  FaSignOutAlt,
  FaEdit,
} from "react-icons/fa"; // Import icons from react-icons
import { useProductStore } from "../../providers/AppProviders";
import ProfileSection from "../../components/ProfileSection/ProfileSection";

const Dashboard = () => {
  const { BASE_URL, userData, handleLogout } = useProductStore();
  const { data } = userData.profile;
  console.log(data, "------------data-----------");
  const navigate = useNavigate();
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone_number);
  const [address, setAddress] = useState(data.address);

  const [profileImg, setProfileImg] = useState(
    data.image ? `${BASE_URL}/${data.image}` : defaultProfile
  );

  console.log(profileImg);
  const [selectedSection, setSelectedSection] = useState("profile");
  const [image, setImage] = useState(profileImg);

  const menuItems = [
    { name: "Profile", icon: <FaUser />, section: "profile" },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      section: "orders",
    },
    {
      name: "Wishlist",
      icon: <FaHeart />,
      section: "wishlist",
    },
    {
      name: "Saved Data",
      icon: <FaSave />,
      section: "saved-data",
    },
    {
      name: "Change Password",
      icon: <FaLock />,
      section: "change-password",
    },
  ];

  const handleMenuClick = (section) => {
    setSelectedSection(section); // Update the selected section based on the clicked menu item
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); // Append the image file

    // Log FormData contents
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData?.token;

      // Log headers and body
      console.log("Headers:", {
        Authorization: `Bearer ${token}`,
      });

      const response = await fetch(`${BASE_URL}/api/change-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, 
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Image updated successfully ✅", result);
        // console.log(result.data?.imageUrl, "result.data?.imageUrl");
        setImage(result.data?.imageUrl || URL.createObjectURL(file));
        if (userData) {
          const updatedUserData = {
            ...userData,
            profile: {
              ...userData.profile,
              image: result.data?.imageUrl, 
            },
          };

          // Save the updated user data back to localStorage
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
        }
        console.log(result.data?.imageUrl, "result.data?.imageUrl", result);
        alert("Profile image updated!");
      } else {
        console.error("Image update failed ❌", result);
        alert(result.message || "Failed to update image.");
      }
    } catch (error) {
      console.error("Error uploading image ❌", error);
      alert("Something went wrong while uploading image.");
    }
  };

  // Trigger the file input click programmatically
  const handleImageClick = () => {
    const fileInput = document.getElementById("profileImageInput");
    console.log(fileInput, "fileInput");
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
  const handleSaveProfile = (
    newName,
    newEmail,
    newPhone,
    newAddress,
    newProfileImg
  ) => {
    setName(newName);
    setEmail(newEmail);
    setPhone(newPhone);
    setAddress(newAddress);
    setProfileImg(newProfileImg);
    console.log(name, email, phone, newAddress, newProfileImg);
    alert("Profile Updated!");
  };

  return (
    <div className="dashboard__content">
      {/* Left Side: Profile Info */}
      <div className="dashboard_left-listArea bg-white">
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
        <div className="w-full flex justify-center items-center flex-col p-4 gap-4 overflow-y-auto">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMenuClick(item.section)} // Update the selected section on click
              className="w-full dashboard_btnarea   hover:bg-blue-200 duration-75 text-2xl text-gray-600 p-6 rounded flex items-center gap-x-6"
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}

          <button
            onClick={handleButtonClick}
            className="w-full bg-gray-500 text-2xl text-white p-4 rounded  "
          >
            Logout
          </button>
        </div>
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
            onSave={handleSaveProfile}
          />
        )}

        {selectedSection === "orders" && (
          <div>
            <h3 className="text-xl mb-4">Orders</h3>
            <p>Your orders will be displayed here.</p>
          </div>
        )}

        {selectedSection === "wishlist" && (
          <div>
            <h3 className="text-xl mb-4">Wishlist</h3>
            <p>Your wishlist will be displayed here.</p>
          </div>
        )}

        {selectedSection === "saved-data" && (
          <div>
            <h3 className="text-xl mb-4">Saved Data</h3>
            <p>Your saved data will be displayed here.</p>
          </div>
        )}

        {selectedSection === "change-password" && (
          <div>
            <h3 className="text-xl mb-4">Change Password</h3>
            <p>Your password change section will be here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
