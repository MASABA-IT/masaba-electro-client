import React, { useState } from "react";
import bgImg from "../../assets/imgs/emailBgimg.png";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useProductStore } from "../../providers/AppProviders";

const HomeEmail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { emailRef, contactDetails } = useProductStore();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here...
    alert("Message sent!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div
      ref={emailRef}
      className="home_email relative min-h-[20vh] md:min-h-[40vh] flex flex-col md:flex-row items-center justify-between rounded-lg shadow-md overflow-hidden px-6 py-10 md:px-14"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1c1c1c]/90 to-[#9BE0CB]/80 "></div>

      {/* Left: Contact Info */}
      <div className="relative w-full h-full md:w-1/2  flex flex-col justify-between text-left md:p-8 z-10   mt-10 md:mt-0 space-y-4 ">
        <div>
          <h2 className="text-4xl font-bold mb-2 text-gray-200">Contact Us</h2>
          <p className="text-xl md:text-xl text-gray-200">
            Reach out to us and we’ll respond as soon as possible.
          </p>
        </div>
        <div className="space-y-2   mt-4 ">
          <p className="text-gray-200 text-xl sm:text-2xl">
            <strong>Phone:</strong> {contactDetails?.contact_phone}
          </p>
          <p className="text-gray-200 text-xl sm:text-2xl">
            <strong>Email:</strong> {contactDetails?.contact_email}
          </p>
          <p className="text-gray-200 text-xl sm:text-2xl">
            <strong>Location:</strong> {contactDetails?.contact_address}
          </p>
        </div>
        <div className="flex gap-4 bg-transparent mt-4">
          {/* Facebook */}

          <a
            href={`${contactDetails?.social_facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-full shadow-lg transition-all duration-300"
          >
            <FaFacebookF size={16} />
          </a>

          {/* Twitter */}
          <a
            href={`${contactDetails?.social_twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-[#1DA1F2] hover:bg-[#0d8ddb] p-2 rounded-full shadow-lg transition-all duration-300"
          >
            <FaTwitter size={16} />
          </a>

          {/* LinkedIn */}
          <a
            href={`${contactDetails?.social_linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-[#0077b5] hover:bg-[#005f90] p-2 rounded-full shadow-lg transition-all duration-300"
          >
            <FaLinkedinIn size={16} />
          </a>
        </div>
        <button
          type="button"
          onClick={toggleModal}
          className="block md:hidden mt-6 w-[80px] text-lg bg-blue-600 text-white py-2 rounded-lg font-semibold active:bg-blue-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
        >
          Contact Us
        </button>
      </div>

      {/* Right: Contact Form (Desktop) */}
      <div className="hidden md:flex flex-col gap-y-4 relative w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md z-10">
        <h2 className="text-3xl text-center font-semibold text-gray-700">
          Get In Touch
        </h2>
        <form
          onSubmit={handleSubmit}
          className=" w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white   rounded-2xl"
        >
          {/* Name Field */}
          <div className=" relative ">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              className=" peer  w-full border-b-2 border-gray-300 bg-transparent px-3 pt-6 pb-2 text-xl text-gray-900 focus:outline-none focus:border-blue-500"
            />
            <label className=" absolute left-3 top-2 text-gray-500 text-xl transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-2xl peer-placeholder-shown:text-gray-600 peer-focus:top-2 peer-focus:text-xl peer-focus:text-blue-500">
              Full Name
            </label>
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full border-b-2 border-gray-300 bg-transparent px-3 pt-6 pb-2 text-base text-gray-900 focus:outline-none focus:border-blue-500"
            />
            <label className="absolute left-3 top-2 text-gray-500 text-xl transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-2xl peer-placeholder-shown:text-gray-600 peer-focus:top-2 peer-focus:text-xl peer-focus:text-blue-500">
              Email Address
            </label>
          </div>

          {/* Phone Field */}
          <div className="relative col-span-1 md:col-span-2">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full border-b-2 border-gray-300 bg-transparent px-3 pt-6 pb-2 text-base text-gray-900 focus:outline-none focus:border-blue-500"
            />
            <label className="absolute left-3 top-2 text-gray-500 text-xl transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-2xl peer-placeholder-shown:text-gray-600 peer-focus:top-2 peer-focus:text-xl peer-focus:text-blue-500">
              Phone Number
            </label>
          </div>

          {/* Message Field */}
          <div className="relative col-span-1 md:col-span-2">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder=" "
              className="peer w-full border-2 rounded-lg border-gray-300 bg-transparent px-3 pt-6 pb-2 text-base text-gray-900 focus:outline-none focus:border-blue-500 resize-none"
            ></textarea>
            <label className="absolute left-3 top-2 text-gray-500 text-xl transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-2xl peer-placeholder-shown:text-gray-600 peer-focus:top-2 peer-focus:text-xl peer-focus:text-blue-500">
              Your message
            </label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white   sm:text-xl font-medium rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md relative">
            <h2 className="text-2xl font-semibold text-black mb-6 text-center">
              Get In Touch
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full border-b-2 border-gray-300 bg-transparent px-3 pt-6 pb-2 text-lg text-gray-900 focus:outline-none focus:border-blue-500"
                />
                <label className="absolute left-3 top-2 text-gray-500 text-lg transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-600 peer-focus:top-2 peer-focus:text-lg peer-focus:text-blue-500">
                  Full Name
                </label>
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full border-b-2 border-gray-300 bg-transparent px-3 pt-6 pb-2 text-lg text-gray-900 focus:outline-none focus:border-blue-500"
                />
                <label className="absolute left-3 top-2 text-gray-500 text-lg transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-600 peer-focus:top-2 peer-focus:text-lg peer-focus:text-blue-500">
                  Email Address
                </label>
              </div>

              {/* Phone Field */}
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full border-b-2 border-gray-300 bg-transparent px-3 pt-6 pb-2 text-lg text-gray-900 focus:outline-none focus:border-blue-500"
                />
                <label className="absolute left-3 top-2 text-gray-500 text-lg transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-600 peer-focus:top-2 peer-focus:text-lg peer-focus:text-blue-500">
                  Phone Number
                </label>
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  rows="4"
                  className="peer w-full border-2 border-gray-300 bg-transparent px-3 pt-6 pb-2 text-lg text-gray-900 focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
                <label className="absolute left-3 top-2 text-gray-500 text-lg transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-600 peer-focus:top-2 peer-focus:text-lg peer-focus:text-blue-500">
                  Your Message
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-lg bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300"
              >
                Send Message
              </button>
            </form>

            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-3 right-4 text-4xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeEmail;
