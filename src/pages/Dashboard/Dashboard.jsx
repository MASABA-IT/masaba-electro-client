import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/imgs/fake_profile.jpg";
import { useProductStore } from "../../providers/AppProviders";
// Sample page data for navigation
const topNavigationItems = [{ name: "Navigate", path: "/navigate" }];

const pageNames = [
  { name: "Page 1", path: "/page1" },
  { name: "Page 2", path: "/page2" },
  { name: "Page 3", path: "/page3" },
];

const bottomNavigationItems = [
  { name: "Chart Data", path: "/chart-data" },
  { name: "Saved Data", path: "/saved-data" },
];

const Dashboard = () => {
  const { userData, handleLogout } = useProductStore();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
  });

  const handlePasswordChangeClick = () => {
    setIsPasswordModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImg(URL.createObjectURL(file));
  };

  const handlePasswordChangeSubmit = () => {
    setIsPasswordModalOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    // Save the changes, e.g., via an API
  };
  const handleButtonClick = () => {
    if (userData?.token) {
      navigate("/dashboard");
      // handleLogout(navigate);
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="dashboard__content">
      {/* Left Side Navigation */}
      <div className="dashboard_left-listArea">
        {/* Top Navigation Tile */}
        <div className="navigation-title">
          {topNavigationItems.map((item, index) => (
            <div key={index}>
              <h2 className="text-gray-600">{item.name}</h2>
            </div>
          ))}
        </div>

        {/* Page Names List */}
        <ul className="page-names-list">
          {pageNames.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>
                <button>{item.name}</button>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom Navigation List */}
        <ul className="bottom-nav-list">
          {bottomNavigationItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>
                <button>{item.name}</button>
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button Always at the Bottom */}
        <div className="logout-button">
          <Link to="/logout">
            <button onClick={handleButtonClick}>Logout</button>
          </Link>
        </div>
      </div>

      {/* Right Side Profile Area */}
      <div className="dashboard_right-profileArea">
        {/* Profile Section */}
        <div className="profile-sections h-full bg-red-200">
          <div className="profile-img-container">
            <img src={profile} alt="Profile" className="profile-img" />

            <input
              type="file"
              accept="image/*"
              className="upload-btn"
              onChange={handleImageUpload}
            />
          </div>
          <div className="password-change">
            <button onClick={handlePasswordChangeClick}>Change Password</button>
          </div>
        </div>

        {/* User Information Section */}
        <div className="user-info">
          <h2>User Information</h2>
          <div className="editable-fields">
            <div className="field">
              <strong>Name:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{userInfo.name}</span>
              )}
            </div>
            <div className="field">
              <strong>Email:</strong>
              <span>{userInfo.email}</span>
            </div>
            <div className="field">
              <strong>Phone:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{userInfo.phone}</span>
              )}
            </div>
            <div className="field">
              <strong>Password:</strong>
              <span>********</span>
            </div>
          </div>
          {/* Edit Profile Button */}
          <button className="edit-profile-btn" onClick={handleEditClick}>
            Edit Profile
          </button>
          {isEditing && (
            <button className="save-profile-btn" onClick={handleSaveChanges}>
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Modal for Changing Password */}
      {isPasswordModalOpen && (
        <div className="password-modal">
          <div className="modal-content">
            <h3>Change Password</h3>
            <input type="password" placeholder="New Password" />
            <button onClick={handlePasswordChangeSubmit}>Submit</button>
            <button onClick={() => setIsPasswordModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
