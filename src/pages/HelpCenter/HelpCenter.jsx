import { useState } from "react";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaShippingFast,
  FaUndo,
  FaUser,
  FaCreditCard,
  FaHeadset,
} from "react-icons/fa";
const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const helpTopics = [
    {
      title: "Ordering",
      desc: "Place orders, track progress, and view history.",
      icon: <FaBoxOpen className="text-blue-500 text-3xl" />,
    },
    {
      title: "Shipping & Delivery",
      desc: "Get shipping info, cost estimates, and delivery status.",
      icon: <FaShippingFast className="text-green-500 text-3xl" />,
    },
    {
      title: "Returns & Refunds",
      desc: "Return your items or request refunds easily.",
      icon: <FaUndo className="text-red-500 text-3xl" />,
    },
    {
      title: "Account & Login",
      desc: "Manage login info, preferences, and security.",
      icon: <FaUser className="text-yellow-500 text-3xl" />,
    },
    {
      title: "Payments & Billing",
      desc: "Learn about payment methods and resolve issues.",
      icon: <FaCreditCard className="text-purple-500 text-3xl" />,
    },
    {
      title: "Contact Support",
      desc: "Still stuck? Reach our support team directly.",
      icon: <FaHeadset className="text-pink-500 text-3xl" />,
    },
  ];

  const filteredTopics = helpTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto  ">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          How can we help?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find answers to your questions or contact our support team
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12 flex justify-center"
      >
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search help articles..."
            className="block w-full text-xl pl-10 pr-4 py-4 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </motion.div>

      {/* Help Topics Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTopics.map((topic, index) => (
          <HelpCard
            key={index}
            title={topic.title}
            desc={topic.desc}
            icon={topic.icon}
            index={index}
          />
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredTopics.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold mb-2">No results found</h3>
          <p className="text-xl text-gray-600">Try different search terms</p>
        </motion.div>
      )}
    </div>
  );
};

const HelpCard = ({ title, desc, icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-100 group"
  >
    <div className="flex items-start">
      <span className="text-3xl mr-4">{icon}</span>
      <div>
        <h2 className="text-3xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
          {title}
        </h2>
        <p className="text-2xl text-gray-600 mb-4">{desc}</p>
        <button className="flex items-center text-blue-600 font-medium text-xl group-hover:text-blue-700 transition-colors">
          Learn more
          <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  </motion.div>
);

export default HelpCenter;
