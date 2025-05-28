import React, { useEffect, useState } from "react";
import aboutImg from "../../assets/imgs/about.jpg";
import { IoNewspaperOutline } from "react-icons/io5";
import AboutStatsSection from "../../components/AboutStatsSection/AboutStatsSection";
import { useProductStore } from "../../providers/AppProviders";

const AboutUs = () => {
  const { fetchAboutData, BASE_URL } = useProductStore();

  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchAboutData();
        setAboutData(data.about);
      } catch (err) {
        setError("Failed to load About Us content.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading)
    return (
      <div className="py-16 px-4 flex flex-col gap-6 items-center animate-pulse">
        <div className="h-10 w-40 bg-gray-300 rounded"></div>
        <div className="h-8 w-3/4 sm:w-1/2 bg-gray-300 rounded"></div>
        <div className="h-24 w-full sm:w-2/3 bg-gray-200 rounded"></div>

        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6 mt-6">
          <div className="flex-1 h-48 bg-gray-200 rounded-xl"></div>
          <div className="flex-1 h-48 bg-gray-200 rounded-xl"></div>
          <div className="flex-1 h-48 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="aboutUs_content bg-slate-50">
      <div className="aboutUs_content--childOne py-10">
        <div className="flex flex-col justify-center items-center py-14 bg-white">
          <p className="text-xl sm:text-2xl text-yellow-700 mb-2">About Us</p>
          <h2 className="text-2xl sm:text-5xl font-mono text-gray-700 relative">
            <span className="absolute -left-8 top-1 md:-left-20 text-zinc-400">
              <IoNewspaperOutline />
            </span>
            {aboutData.title}
          </h2>
          <p className="sm:w-2/3 text-[14px] sm:text-2xl mx-auto pt-4 pb-10 px-4 text-center">
            {aboutData.des}
          </p>
          {loading ? (
            <div className="w-full bg-gradient-to-br from-[#3f382a] via-[#302b63] to-[#44353e] py-16 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gray-500 blur-sm opacity-30"></div>
              <div className="relative z-10 w-full max-w-7xl px-4 text-center">
                <div className="mt-10 flex flex-col md:flex-row gap-6 items-center justify-center animate-pulse">
                  {[1, 2, 3].map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white/10 md:min-h-[170px] backdrop-blur-lg p-6 rounded-xl shadow-lg w-full md:w-1/3 text-center h-full flex flex-col justify-center"
                    >
                      <div className="h-6 w-24 bg-gray-400 mx-auto mb-4 rounded"></div>
                      <div className="h-4 w-3/4 bg-gray-300 mx-auto mb-2 rounded"></div>
                      <div className="h-3 w-2/3 bg-gray-300 mx-auto rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <AboutStatsSection
              statsData={aboutData}
              backgroundImage={`${BASE_URL}/${aboutData.image}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
